@echo off
setlocal enabledelayedexpansion
title Sincronizador de GitHub - Lumiel Web
color 0b

REM ==============================================================================
REM Script inteligente para subir y sincronizar el proyecto lumiel-web a GitHub
REM Repositorio: https://github.com/Moradelii/lumiel-web.git
REM ==============================================================================

cls
echo ==============================================================================
echo                 SINCRONIZADOR A GITHUB - LUMIEL WEB
echo ==============================================================================
echo.

REM 1. Verificar instalacion de Git
where git >nul 2>nul
if %errorlevel% neq 0 (
    color 0c
    echo [ERROR CRITICO] Git no esta instalado o no se encuentra en el PATH de Windows.
    echo Por favor instala Git desde https://git-scm.com/ e intentalo de nuevo.
    echo ==============================================================================
    pause
    exit /b 1
)

REM 2. Verificar que se este ejecutando desde la raiz del proyecto
if not exist "package.json" (
    color 0e
    echo [ADVERTENCIA IMPORTANTE]
    echo No se encontro 'package.json' en la carpeta actual (%cd%).
    echo.
    echo Si solo ves las carpetas 'src' y 'public' en GitHub, la razon es que
    echo ejecutaste este script o hiciste git dentro de una subcarpeta, o no
    echo copiaste los archivos de la raiz (package.json, vite.config.ts, index.html).
    echo.
    echo Deseas continuar de todas formas? (S/N)
    set /p CONTINUAR="> "
    if /i not "!CONTINUAR!"=="S" (
        echo Operacion cancelada. Coloca este archivo .bat en la raiz del proyecto.
        pause
        exit /b 1
    )
    color 0b
)

echo.
echo [1/6] Inicializando Git en la carpeta local...
if not exist .git (
    git init
    echo -> Repositorio Git inicializado correctamente.
) else (
    echo -> El repositorio Git local ya estaba inicializado.
)

echo.
echo [2/6] Agregando todos los archivos del proyecto al area de preparacion...
git add -A
echo -> Archivos preparados para el commit.

echo.
echo [3/6] Creando el punto de control (Commit)...
set "COMMIT_MSG=Fifth commit: lumiel-web"
echo Mensaje de commit predeterminado: "%COMMIT_MSG%"
echo Presiona ENTER para usarlo o escribe uno nuevo:
set /p USER_MSG="Mensaje (opcional): "
if not "!USER_MSG!"=="" set "COMMIT_MSG=!USER_MSG!"

git commit -m "!COMMIT_MSG!"
if %errorlevel% neq 0 (
    echo -> No habia cambios nuevos para confirmar o el commit ya estaba al dia.
) else (
    echo -> Commit realizado con exito: "!COMMIT_MSG!"
)

echo.
echo [4/6] Configurando rama principal como 'main'...
git branch -M main

echo.
echo [5/6] Vinculando con el repositorio remoto de destino...
git remote remove origin 2>nul
git remote add origin https://github.com/Moradelii/lumiel-web.git
echo -> Remoto configurado a: https://github.com/Moradelii/lumiel-web.git

echo.
echo [6/6] Subiendo archivos a GitHub (origin main)...
git push -u origin main
if %errorlevel% equ 0 (
    color 0a
    echo.
    echo ==============================================================================
    echo [EXITO] El proyecto se ha subido y sincronizado correctamente con GitHub!
    echo ==============================================================================
) else (
    color 0e
    echo.
    echo ==============================================================================
    echo [AVISO DE CONFLICTO DETECTADO]
    echo 'git push' fue rechazado. Esto suele ocurrir cuando GitHub ya contiene
    echo commits previos o ramas con un historial distinto (non-fast-forward).
    echo.
    echo Deseas forzar la subida definitiva sobrescribiendo el repositorio remoto?
    echo (git push -u origin main --force) [S/N]
    echo ==============================================================================
    set /p FORZAR="> "
    if /i "!FORZAR!"=="S" (
        echo.
        echo Subiendo con --force...
        git push -u origin main --force
        if !errorlevel! equ 0 (
            color 0a
            echo.
            echo ==============================================================================
            echo [EXITO] Repositorio forzado y actualizado con exito en GitHub!
            echo ==============================================================================
        ) else (
            color 0c
            echo.
            echo [ERROR] No se pudo subir. Verifica tus credenciales de acceso a GitHub
            echo o tu Personal Access Token (PAT).
        )
    ) else (
        echo Operacion de subida forzada omitida.
    )
)

echo.
pause
