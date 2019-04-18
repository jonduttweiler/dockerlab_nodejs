#!/bin/bash
echo "Building docker image"
image_name=jduttweiler/node_app:1.0
container_name=node_app

docker build -t ${image_name} .

echo "Pushing docker image"
docker push jduttweiler/node_app


echo "Restarting container"
docker stop  ${container_name} || true
docker rm ${container_name} || true

docker run -d \
 	   -p 8080:8080 \
	   --name ${container_name} \
       -e DB_NAME="node_template" \
       -e DB_URI="mongodb://localhost/node_template" \
	   --network="host" \
	   ${image_name}


#the option --network="host" makes 127.0.0.1 in your docker container will point to your docker host. Only works on Docker for Linux
