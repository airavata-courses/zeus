#!/bin/sh



rm -rf CompleteProject
		
mkdir CompleteProject

cd CompleteProject

mkdir NodeRestController
cd NodeRestController
git clone -b dev_node_controller https://github.com/airavata-courses/zeus.git
cd ..

mkdir NodeExpressMS
cd NodeExpressMS
git clone -b devbranch_node_express_ms https://github.com/airavata-courses/zeus.git
cd ..
		
mkdir PythonFlaskApplication
cd PythonFlaskApplication
git clone -b python_flask_ms https://github.com/airavata-courses/zeus.git
cd ..

mkdir SpringMSApplication
cd SpringMSApplication
git clone -b dev_aravind https://github.com/airavata-courses/zeus.git
cd ../..

echo "Please update with your local mysql root username and password in the following directory"
echo "{Current Directory}/CompleteProject/NodeRestController/zeus/noderest_controller/constants.js"
		
			
		
		
		
		
		
		
		
		
		