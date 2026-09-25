@echo off
REM ==============================================================================
REM Script para subir y sincronizar el proyecto lumiel-web a GitHub
REM Repositorio: https://github.com/Moradelii/lumiel-web.git
REM ==============================================================================

echo [1/6] Inicializando Git en la carpeta local...
if not exist .git (
    git init
) else (
    echo Git ya se encontraba inicializado.
)

echo.
echo [2/6] Agregando archivos al area de preparacion (Staging)...
git add .

echo.
echo [3/6] Creando el punto de control (Commit)...
git commit -m "Fifth commit: lumiel-web"

echo.
echo [4/6] Nombrando rama principal como main...
git branch -M main

echo.
echo [5/6] Vinculando el repositorio remoto de destino...
git remote remove origin 2>nul
git remote add origin https://github.com/Moradelii/lumiel-web.git

echo.
echo [6/6] Subiendo archivos a GitHub (origin/main)...
git push -u origin main

echo.
echo ==============================================================================
echo Proceso completado exitosamente con GitHub.
echo ==============================================================================
pause
