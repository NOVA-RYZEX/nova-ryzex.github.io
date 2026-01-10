# NOVA Portfolio Hub - Quick Start Script
# This script starts a simple HTTP server to view the website

Write-Host "🚀 Starting NOVA Portfolio Hub..." -ForegroundColor Cyan
Write-Host ""

# Check if Python is available
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "✓ Python found! Starting server..." -ForegroundColor Green
    Write-Host "📱 Open your browser to: http://localhost:8000" -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    python -m http.server 8000
}
elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    Write-Host "✓ Python3 found! Starting server..." -ForegroundColor Green
    Write-Host "📱 Open your browser to: http://localhost:8000" -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    python3 -m http.server 8000
}
elseif (Get-Command php -ErrorAction SilentlyContinue) {
    Write-Host "✓ PHP found! Starting server..." -ForegroundColor Green
    Write-Host "📱 Open your browser to: http://localhost:8000" -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    php -S localhost:8000
}
else {
    Write-Host "❌ No server available (Python or PHP required)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "  1. Install Python: https://www.python.org/downloads/" -ForegroundColor White
    Write-Host "  2. Use VS Code Live Server extension" -ForegroundColor White
    Write-Host "  3. Open index.html directly in your browser (some features may not work)" -ForegroundColor White
    Write-Host ""
    pause
}
