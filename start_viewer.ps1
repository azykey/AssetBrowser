#!/usr/bin/env powershell
# Quick Start - Visualizador 3D
# ============================

Write-Host "`n🎮 Asset Browser - Visualizador 3D" -ForegroundColor Cyan
Write-Host "=====================================`n" -ForegroundColor Cyan

# Check Node.js
Write-Host "📋 Verificando requisitos..." -ForegroundColor Yellow
$node = node --version
Write-Host "✓ Node.js: $node" -ForegroundColor Green

# Start backend
Write-Host "`n🚀 Iniciando Backend..." -ForegroundColor Yellow
Push-Location "AssetBrowser"
Write-Host "  Executando: node server.js" -ForegroundColor Gray
Write-Host "  URL: http://localhost:5000" -ForegroundColor Gray
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "server.js"
Write-Host "✓ Servidor iniciado em background" -ForegroundColor Green

# Wait a bit
Write-Host "`n⏳ Aguardando 2 segundos..." -ForegroundColor Gray
Start-Sleep -Seconds 2

# Start frontend
Write-Host "`n🎨 Iniciando Frontend..." -ForegroundColor Yellow
Push-Location "client"
Write-Host "  Executando: npm start" -ForegroundColor Gray
Write-Host "  URL: http://localhost:3000" -ForegroundColor Gray
Write-Host "  ⌚ Aguarde ~30 segundos para compilação..." -ForegroundColor Gray
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "start"
Write-Host "✓ React iniciado em background" -ForegroundColor Green

# Summary
Write-Host "`n" -ForegroundColor Gray
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         🎬 VISUALIZADOR 3D INICIADO COM SUCESSO           ║" -ForegroundColor Cyan
Write-Host "╠════════════════════════════════════════════════════════════╣" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "║  📍 Backend:  http://localhost:5000/api/...              ║" -ForegroundColor Cyan
Write-Host "║  📍 Frontend: http://localhost:3000                       ║" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "║  🎯 Como Usar:                                            ║" -ForegroundColor Cyan
Write-Host "║     1. Abra http://localhost:3000 no navegador            ║" -ForegroundColor Cyan
Write-Host "║     2. Navegue até 'ObjectsDepot' ou 'Animations'         ║" -ForegroundColor Cyan
Write-Host "║     3. Selecione um arquivo (.fbx, .obj, .gltf)           ║" -ForegroundColor Cyan
Write-Host "║     4. Clique no botão 👁️  'Ver em 3D'                    ║" -ForegroundColor Cyan
Write-Host "║     5. Use mouse para rotacionar, scroll para zoom         ║" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "║  ⚙️  Controles:                                            ║" -ForegroundColor Cyan
Write-Host "║     🔄 Auto-rotação  | ▶️ Play animação | 📏 Escala        ║" -ForegroundColor Cyan
Write-Host "║     🖥️ Fullscreen   | ✕ Fechar                           ║" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "║  📚 Formatos:                                              ║" -ForegroundColor Cyan
Write-Host "║     • FBX (.fbx) - Com animações esqueletais              ║" -ForegroundColor Cyan
Write-Host "║     • OBJ (.obj) - Modelos estáticos                      ║" -ForegroundColor Cyan
Write-Host "║     • GLTF/GLB (.gltf, .glb) - Modelos avançados          ║" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "║  💡 Dica: Navegue até c:\...\bin\Data\ObjectsDepot       ║" -ForegroundColor Cyan
Write-Host "║           para adicionar seus próprios modelos            ║" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Write-Host "`n✅ Tudo pronto! Abra seu navegador e acesse: http://localhost:3000" -ForegroundColor Green
Write-Host "📖 Documentação disponível em: VIEWER_3D_README.md`n" -ForegroundColor Cyan

# Keep terminal open
Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Gray
[Console]::ReadKey() > $null
