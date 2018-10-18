#!/bin/sh
cd ../CompleteProject/NodeRestController/zeus/noderest_controller
docker rm -f node_rest_ms_cont
docker rmi node_rest_ms
docker build -t node_rest_ms .
docker run -d --net="host" -p=3001 --name node_rest_ms_cont node_rest_ms
