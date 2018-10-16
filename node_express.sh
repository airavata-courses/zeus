#!/bin/sh
cd node_express_ms
docker rm -f node_express_ms_cont
docker rmi node_express_ms
docker build -t node_express_ms .
docker run -d --net="host" -p=3050 --name node_express_ms_cont node_express_ms
