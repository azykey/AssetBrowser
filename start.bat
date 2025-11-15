@echo off
REM Script para instalar e iniciar o Asset Browser

title Asset Browser - TANAWANT-THONGPING

cd /d "%~dp0"

echo.
echo ========================================
echo   Asset Browser Installer
echo ========================================
echo.

REM Check if node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js nao foi encontrado!
    echo Por favor, instale Node.js de: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js encontrado
echo.

REM Check if npm modules are installed
if not exist "node_modules" (
    echo [INFO] Instalando dependencias do servidor...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Falha na instalacao das dependencias do servidor
        pause
        exit /b 1
    )
)

if not exist "client\node_modules" (
    echo [INFO] Instalando dependencias do cliente...
    cd client
    call npm install
    cd ..
    if errorlevel 1 (
        echo [ERROR] Falha na instalacao das dependencias do cliente
        pause
        exit /b 1
    )
)

echo [OK] Todas as dependencias estao instaladas
echo.
echo ========================================
echo Iniciando Asset Browser...
echo ========================================
echo.
echo Servidor: http://localhost:5000
echo Cliente:  http://localhost:3000
echo.
echo Pressione CTRL+C para parar os servidores
echo.

REM Start servers
echo [INFO] Iniciando servidor...
start "Asset Browser Server" cmd /k npm start

timeout /t 3 /nobreak

echo [INFO] Iniciando cliente...
start "Asset Browser Client" cmd /k "cd client && npm start"

echo.
echo [OK] Servidores iniciados! Aguarde a abertura dos navegadores...
echo.
pause
