#!/bin/sh

cd ../CompleteProject/PythonFlaskApplication/zeus/python_flask_ms
python3 -m pip install -r requirements.txt
cd app
python3 server.py