import logging
# from logging.handlers import RotatingFileHandler
from flask import Flask
from flask import request, jsonify
from flaskext.mysql import MySQL
from flask_cors import CORS
import pika
import threading
import json
import pymysql.cursors
import random
import requests
from kazoo import client as kz_client


connection = pika.BlockingConnection(pika.ConnectionParameters(host='149.165.170.230'))
channel = connection.channel()
channel.queue_declare(queue='zeus.queue')

app = Flask(__name__)
port="4000"

def callback(ch, method, properties, body):
    print(body)
    s = json.loads(body)

    connection = pymysql.connect(host='149.165.170.230',
                                 user='root',
                                 password='root',
                                 db='zeus_flask',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
            #Fetch records
            # sql = "SELECT `id`, `password` FROM `users` WHERE `email`=%s"
            sql = "SELECT * FROM `userpreferencestable` WHERE `USERTBID`=%s AND `CATEGORY`=%s"
            # cursor.execute(sql, (int(s["userId"]), s["category"]))
            cursor.execute(sql, (s["userId"], s["category"]))
            result = cursor.fetchone()
            if(result is None):
                # Create a new record
                sql = "INSERT INTO `userpreferencestable` (`USERTBID`, `CATEGORY`,`COUNT`) VALUES (%s, %s, %s)"
                cursor.execute(sql, (s["userId"], s["category"], 1))
            else:
                a = result["COUNT"] + 1
                # Create a new record
                sql = "UPDATE `userpreferencestable` SET `COUNT`=%s WHERE `USERTBID`=%s AND `CATEGORY`=%s"
                cursor.execute(sql, (a, s["userId"], s["category"]))
        # connection is not autocommit by default. So you must commit to save
        # your changes.
        print('rabbit consumer')
        connection.commit()
    finally:
        connection.close()


    # print(str()+"-->"+s["category"])


def python_flask_ms():
    CORS(app)
    count = {'value': 0}
    mysql = MySQL()
    app.config['MYSQL_DATABASE_USER']='root'
    app.config['MYSQL_DATABASE_PASSWORD']='root'
    app.config['MYSQL_DATABASE_DB']='zeus_flask'
    app.config['MYSQL_DATABASE_HOST']='149.165.170.230'

    channel.basic_consume(callback,
                          queue='zeus.queue',
                          no_ack=True)

    # Starting Rabbit Consumer listener in a thrad
    t1 = threading.Thread(target=channel.start_consuming)
    t1.start()
    t1.join(0)

    @app.route('/', methods = ['POST', 'GET'])
    def route():
        # app.logger.warning('A warning occurred (%d apples)', 42)
        # app.logger.error('An error occurred')
        # app.logger.info('Doing Something')

        if request.method=='GET':
            return "Tesing Python- HelloWorld2"
        else:
            return "post req"

    @app.route("/getVideos", methods=['GET'])
    def getVideos():
        count['value']+=1
        cursor = mysql.connect().cursor()
        cursor.execute("SELECT * from videotable")
        data = cursor.fetchall()
        return jsonify(data)

    @app.route("/getServerHitCount", methods=['GET'])
    def getServerHitCount():
        return "The number of times /getVideos is hit = " + str(count['value'])

    @app.route("/getPrefs", methods = ['GET'])
    def getPrefs():
        cursor = mysql.connect().cursor()
        cursor.execute("SELECT * from userpreferencestable")
        data = cursor.fetchall()
        app.logger.info('testing')
        # print("testing")
        app.logger.info(data)
        return jsonify(data)

    @app.route("/getRecommendations", methods=['GET'])
    def getRecommendations():
        cursor = mysql.connect().cursor()
        email = ''
        try:
            email = request.json['email']
        except:
            email = 'haritha.cbit2010@gmail.com'
        print(email)
        cursor.execute("SELECT * from userpreferencestable where USERTBID='"+email+"' ORDER BY COUNT DESC")
        data = cursor.fetchall()
        recos = []
        if(len(data)!=0):
            for i in data:
                cursor.execute(
                    "SELECT * from videotable where CATEGORY='" + str(i[2]) +"'")
                temp = cursor.fetchall()
                for video in temp:
                    recos.append(video)

        if(len(recos)==0):
            cursor.execute("SELECT * from videotable")
            temp = cursor.fetchall()
            for video in temp:
                recos.append(video)

        return jsonify(recos[0:5])

    mysql.init_app(app)

    return app


# my_client = kz_client.KazooClient(hosts='149.165.170.230:2181')
#
#
# def my_listener(state):
#     if state == kz_client.KazooState.CONNECTED:
#         app.logger.info('Client connected!')
#         # print("Client connected !")
#
#
# my_client.add_listener(my_listener)
# my_client.start(timeout=5)
#
#
# homepath="/zeus"
# if (my_client.exists(homepath) is None):
#     my_client.create(homepath)
#
# nodepath="/python"
# if (my_client.exists(homepath+nodepath) is None):
#     my_client.create(homepath+nodepath)
#
# ip= requests.get('https://ip.42.pl/raw').text
# buffer=ip+':'+port
# b=buffer.encode('utf-8')
# s="/python" + ip + port
#
# if (my_client.exists(homepath + nodepath + s) is None):
#     my_client.create(homepath + nodepath + s, b, ephemeral=True)
#
# # # Print the version of a node and its data
# data, stat = my_client.get(homepath + nodepath + s)
# app.logger.info("data: %s" % (data.decode("utf-8")))
# # print(" data: %s" % (data.decode("utf-8")))
# #
# # # List the children
# children = my_client.get_children(homepath + nodepath)
# length=len(children)
# app.logger.info("There are %s children with names %s" % (len(children), children))
# # print("There are %s children with names %s" % (len(children), children))
#
# ##LoadBalancer
# randomno=random.randint(0,length-1)
# print(children[randomno])
# data1, stat = my_client.get(homepath+nodepath+'/'+children[randomno])
# app.logger.info("random node for service discovery: %s" % (data1.decode("utf-8")))
# # print(" random node for service discovery: %s" % (data1.decode("utf-8")))
# Testing Build

if __name__ == '__main__':
    # handler = RotatingFileHandler('pythonFlask.log', maxBytes=10000, backupCount=1)
    # handler.setLevel(logging.DEBUG)
    # app.logger.addHandler(handler)
    logging.basicConfig(filename='ZeusPython.log', level=logging.INFO)
    logging.info('Started')
    app = python_flask_ms()
    app.run("0.0.0.0",port)
    logging.info('Finished')




