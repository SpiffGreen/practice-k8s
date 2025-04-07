APP=$1

if [ -z "$APP" ]; then
  echo "Usage: $0 <app_name>"
  echo "Example: $0 lk-app-backend or $0 lk-app-frontend"
  exit 1
fi

# Check if the app name is valid
if [[ "$APP" != "lk-app-backend" && "$APP" != "lk-app-frontend" ]]; then
  echo "Invalid app name. Use 'lk-app-backend' or 'lk-app-frontend'."
  exit 1
fi

# Apply the Kubernetes configuration
echo "Deploying $APP..."
APP_DIR=$(pwd)
echo "Current directory: $APP_DIR"
# kubectl apply -f $APP_DIR/$APP/kubernetes/pod.yml
# kubectl apply -f $APP_DIR/$APP/kubernetes/replica-set.yml
kubectl apply -f $APP_DIR/$APP/kubernetes/deployment.yml