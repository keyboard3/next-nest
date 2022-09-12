export PROJECT_NAME=next-daruk
cat deploy/deployment.yml | envsubst | kubectl apply -f -
cat deploy/service.yml | envsubst | kubectl apply -f -