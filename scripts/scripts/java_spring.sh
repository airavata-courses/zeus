#!/bin/sh
cd ../CompleteProject/SpringMSApplication/zeus/Java_Spring_Ms
docker rm -f java_ms_cont
docker rmi java_ms
mvn clean install
docker build -t java_ms .
docker run -d --net="host" -p=8090 --name java_ms_cont java_ms

