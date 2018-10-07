#!/bin/sh
cd ../CompleteProject/SpringMSApplication/zeus/Java_Spring_Ms

sudo mvn clean install -DskipTests=false
java -jar target/Java_Spring_Ms-0.0.1-SNAPSHOT.jar &

