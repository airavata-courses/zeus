#!/bin/sh

cd ../CompleteProject/PythonFlaskApplication/zeus/python_flask_ms
sudo python3 -m pip install -r requirements.txt
cd app
sudo python3 server.py &