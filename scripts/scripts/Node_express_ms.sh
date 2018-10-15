#!/bin/sh
cd ../CompleteProject/NodeExpressMS/zeus/node_express_ms
sudo npm install
sudo forever start node app.js &
