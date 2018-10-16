#!/bin/sh
cd python_flask_ms
docker rm -f python_flask_ms_cont
docker rmi python_flask_ms
docker build -t python_flask_ms .
docker run -d --net="host" -p=4000 --name python_flask_ms_cont python_flask_ms
