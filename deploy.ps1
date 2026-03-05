# Hero Kidz - Deployment Script
# This script helps you deploy to Vercel with proper environment variables

Write-Host "🚀 Hero Kidz Deployment Helper" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check if vercel is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not installed!" -ForegroundColor Red
    Write-Host "Install it with: npm install -g vercel`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Vercel CLI found`n" -ForegroundColor Green

# Check environment variables locally
Write-Host "🔍 Checking local environment variables..." -ForegroundColor Yellow
$envFile = ".env.local"
if (Test-Path $envFile) {
    Write-Host "✅ .env.local file found" -ForegroundColor Green
    $content = Get-Content $envFile -Raw
    if ($content -match "MONGODB_URI=") {
        Write-Host "✅ MONGODB_URI is set" -ForegroundColor Green
    } else {
        Write-Host "❌ MONGODB_URI not found in .env.local" -ForegroundColor Red
    }
    if ($content -match "DB_NAME=") {
        Write-Host "✅ DB_NAME is set" -ForegroundColor Green
    } else {
        Write-Host "❌ DB_NAME not found in .env.local" -ForegroundColor Red
    }
} else {
    Write-Host "❌ .env.local file not found!" -ForegroundColor Red
    Write-Host "Create it from .env.example`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n📋 IMPORTANT: Before deploying to production..." -ForegroundColor Yellow
Write-Host "============================================`n" -ForegroundColor Yellow

Write-Host "1. Go to Vercel Dashboard: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Select your project: hero-kidz" -ForegroundColor White
Write-Host "3. Go to Settings → Environment Variables" -ForegroundColor White
Write-Host "4. Add these variables (if not already added):`n" -ForegroundColor White

Write-Host "   Variable 1:" -ForegroundColor Cyan
Write-Host "   Name: MONGODB_URI" -ForegroundColor White
Write-Host "   Value: mongodb+srv://HeroKidzDB:Zmw75D11plBH1wpe@cluster0.bcz1ya4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" -ForegroundColor Gray
Write-Host "   Environments: ✅ Production ✅ Preview ✅ Development`n" -ForegroundColor Green

Write-Host "   Variable 2:" -ForegroundColor Cyan
Write-Host "   Name: DB_NAME" -ForegroundColor White
Write-Host "   Value: HeroKidzDB" -ForegroundColor Gray
Write-Host "   Environments: ✅ Production ✅ Preview ✅ Development`n" -ForegroundColor Green

Write-Host "5. Also check MongoDB Atlas Network Access:" -ForegroundColor White
Write-Host "   - Add IP: 0.0.0.0/0 (allows access from anywhere, including Vercel)`n" -ForegroundColor Gray

$response = Read-Host "Have you added the environment variables to Vercel? (y/n)"
if ($response -ne "y") {
    Write-Host "`n❌ Please add environment variables first, then run this script again." -ForegroundColor Red
    Write-Host "See VERCEL_DEPLOYMENT.md for detailed instructions.`n" -ForegroundColor Yellow
    exit 0
}

Write-Host "`n🔄 Testing MongoDB connection locally..." -ForegroundColor Yellow
node test-mongo.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ MongoDB connection test failed!" -ForegroundColor Red
    Write-Host "Fix the connection issues before deploying.`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n✅ MongoDB connection test passed!`n" -ForegroundColor Green

Write-Host "🚀 Ready to deploy to production!" -ForegroundColor Cyan
$deploy = Read-Host "Deploy now? (y/n)"
if ($deploy -eq "y") {
    Write-Host "`n📦 Building and deploying to Vercel...`n" -ForegroundColor Yellow
    vercel --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Deployment successful!" -ForegroundColor Green
        Write-Host "`n🌐 Your website:" -ForegroundColor Cyan
        Write-Host "   - Production: https://herokidz36.vercel.app" -ForegroundColor White
        Write-Host "   - Products API: https://herokidz36.vercel.app/api/products" -ForegroundColor White
        Write-Host "   - Products Page: https://herokidz36.vercel.app/routes/products`n" -ForegroundColor White
        
        Write-Host "🔍 Test your deployment:" -ForegroundColor Yellow
        Write-Host "   Visit: https://herokidz36.vercel.app" -ForegroundColor White
        Write-Host "   Products should now display correctly!`n" -ForegroundColor White
    } else {
        Write-Host "`n❌ Deployment failed!" -ForegroundColor Red
        Write-Host "Check the Vercel logs for errors.`n" -ForegroundColor Yellow
    }
} else {
    Write-Host "`nDeployment cancelled. Run 'vercel --prod' when ready.`n" -ForegroundColor Yellow
}
