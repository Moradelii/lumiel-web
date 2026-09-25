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
echo [2/6] Agregando todos los archivos al area de preparacion...
git add .

echo.
echo [3/6] Creando el punto de control (Commit)...
git commit -m "Fifth commit: lumiel-web"

echo.
echo [4/6] Nombrando la rama principal como main...
git branch -m main

echo.
echo [5/6] Vinculando con el repositorio remoto de destino...
git remote remove origin 2>nul
git remote add origin https://github.com/Moradelii/lumiel-web.git

echo.
echo [6/6] Subiendo los archivos a GitHub de forma definitiva...
git push -u origin main

echo.
echo ==============================================================================
echo Proyecto subido exitosamente a GitHub en la rama main.
echo ==============================================================================
pause
