Write-Host "📦 Compilando TypeScript..."
npx tsc

Write-Host "🐳 Construyendo imagen Docker..."
docker build -t gcr.io/stone-lodge-454213-k0/universilandia-backend .

Write-Host "⬆️ Pusheando imagen al Container Registry..."
docker push gcr.io/stone-lodge-454213-k0/universilandia-backend

Write-Host "🚀 Desplegando en Google Cloud Run..."
gcloud run deploy universilandia-backend `
  --image gcr.io/stone-lodge-454213-k0/universilandia-backend:latest `
  --platform managed `
  --region southamerica-west1 `
  --allow-unauthenticated `
  --vpc-connector=universilandia-connector `
  --vpc-egress=all-traffic `
  --add-cloudsql-instances=stone-lodge-454213-k0:southamerica-west1:admin 

Write-Host "✅ Despliegue completado correctamente."

Write-Host "🌐 Abriendo URL del servicio..."
$serviceUrl = gcloud run services describe universilandia-backend `
  --platform managed `
  --region southamerica-west1 `
  --format "value(status.url)"
Start-Process $serviceUrl
