#!/bin/sh
  

cd ../CompleteProject/NodeRestController/zeus/noderest_controller
sudo npm install
sudo forever start app.js &
