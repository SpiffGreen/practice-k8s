## Learn K8s

This repository is a sample and reference for my knowledge of kubernetes.


## Run applications
To run both applications, run the following commands;

## Common commands
- `kubectl get <k8_object>` 
    - `nodes` - Get the nodes in a cluster
    - `pods` - Get the list of pods
    - `replicaset` - Get list of replicasets
    - `deployments` - Get list of deployments
    - `all` - Simply list all resources
- `kubectl replace -f <path_to_definition_file.yml>`: When you want to scale or adjust replica size [Recommended]
- `kubectl scale --replicas=6 -f <path_to_definition_file.yml` [Does same as the above. Not Recommended]
- `kubectl delete <k8_object> <name_of_object>`: E.g `kubectl delete pods lk-app-frontend`, `kubectl delete replicaset lk-app-backend`, `kubectl delete deployments lk-app-*`

## Local testing
You could use a local registry as this app images created from this are unimportant and not necessary to push to docker hub.
```sh
# Use the restart flag if you want to allow pushing to your local registry
docker run -d -p 5000:5000 --restart --name registry registry:3 # Setups up local registry

# Build and push docker image of frontend app to local registry
docker build --build-arg VITE_PUBLIC_SERVER_URL=http://localhost:8080 -t lk-app-frontend .
docker tag lk-app-frontend localhost:5000/lk-app-frontend

# Build and push docker image of backend app to local registry
docker build . -t lk-app-backend:latest
docker tag lk-app-backend localhost:5000/lk-app-backend
```

## Motivation
I was assigned a task to deploy with kubernetes, opened up about my knowledge of it, and my team lead said `You have a long way to go`.