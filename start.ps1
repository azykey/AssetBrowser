#!/usr/bin/env pwsh

# Asset Browser - TANAWANT-THONGPING Startup Script

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Asset Browser Installer" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check Node.js
$nodeVersion = node --version 2>$null
if (-not $?) {
    Write-Host "[ERROR] Node.js nao foi encontrado!" -ForegroundColor Red
    Write-Host "Instale de: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "[OK] Node.js $nodeVersion encontrado`n" -ForegroundColor Green

# Install server dependencies
if (-not (Test-Path ".\node_modules")) {
    Write-Host "[INFO] Instalando dependencias do servidor..." -ForegroundColor Yellow
    npm install
    if (-not $?) {
        Write-Host "[ERROR] Falha na instalacao" -ForegroundColor Red
        Read-Host "Pressione Enter para sair"
        exit 1
    }
}

# Install client dependencies
if (-not (Test-Path ".\client\node_modules")) {
    Write-Host "[INFO] Instalando dependencias do cliente..." -ForegroundColor Yellow
    Push-Location "client"
    npm install
    Pop-Location
    if (-not $?) {
        Write-Host "[ERROR] Falha na instalacao" -ForegroundColor Red
        Read-Host "Pressione Enter para sair"
        exit 1
    }
}

Write-Host "[OK] Todas as dependencias estao instaladas`n" -ForegroundColor Green

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Iniciando Asset Browser..." -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Servidor: http://localhost:5000" -ForegroundColor Blue
Write-Host "Cliente:  http://localhost:3000" -ForegroundColor Blue
Write-Host "Pressione CTRL+C para parar`n" -ForegroundColor Yellow

# Start server in new PowerShell window
Write-Host "[INFO] Iniciando servidor..." -ForegroundColor Yellow
$serverJob = Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$PWD'; npm start`"" -PassThru

Start-Sleep -Seconds 2

# Start client in new PowerShell window
Write-Host "[INFO] Iniciando cliente..." -ForegroundColor Yellow
$clientJob = Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$PWD\client'; npm start`"" -PassThru

Write-Host "`n[OK] Servidores iniciados! Aguarde a abertura dos navegadores...`n" -ForegroundColor Green

# Keep main window open
Wait-Process -Id $serverJob.Id, $clientJob.Id
