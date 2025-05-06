Write-Host "Compilando TypeScript..."
npx tsc

Write-Host "Construyendo imagen Docker..."
docker build -t gcr.io/stone-lodge-454213-k0/universilandia-backend .

Write-Host "Pusheando imagen..."
docker push gcr.io/stone-lodge-454213-k0/universilandia-backend

Write-Host "Desplegando en Google Cloud Run..."
gcloud run deploy universilandia-backend `
  --image gcr.io/stone-lodge-454213-k0/universilandia-backend:latest `
  --platform managed `
  --region southamerica-west1 `
  --allow-unauthenticated `
  --vpc-connector=universilandia-connector `
  --vpc-egress=all-traffic `
  --add-cloudsql-instances=stone-lodge-454213-k0:southamerica-west1:admin `
  --set-env-vars "DB_USER=sqlserver","DB_PASSWORD=(}7.}G3n$(i.b(|G","DB_NAME=Universilandia","DB_HOST=10.30.160.3"
write-host "Despliegue completado."
Write-Host "Accediendo a la URL del servicio..."
$serviceUrl = gcloud run services describe universilandia-backend `
  --platform managed `
  --region southamerica-west1 `
  --format "value(status.url)"
Start-Process $serviceUrl
Write-Host "Despliegue completado."
Write-Host "Accediendo a la URL del servicio..."                