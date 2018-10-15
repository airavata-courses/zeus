#!/bin/sh
  

cd ../CompleteProject/NodeRestController/zeus/noderest_controller
sudo npm install
sudo npm install forever -g || true
sudo forever start node app.js &
