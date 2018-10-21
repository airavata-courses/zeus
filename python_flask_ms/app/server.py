from flask import Flask
from flask import request, jsonify
from flaskext.mysql import MySQL
from flask_cors import CORS
import pika
import threading
import json
import pymysql.cursors


connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.queue_declare(queue='zeus.queue')

app = Flask(__name__)

def callback(ch, method, properties, body):
    print(body)
    s = json.loads(body)

    connection = pymysql.connect(host='localhost',
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
            cursor.execute(sql, (int(s["userId"]), s["category"]))
            result = cursor.fetchone()
            if(result is None):
                # Create a new record
                sql = "INSERT INTO `userpreferencestable` (`USERTBID`, `CATEGORY`,`COUNT`) VALUES (%s, %s, %s)"
                cursor.execute(sql, (int(s["userId"]), s["category"], 1))
            else:
                a = result["COUNT"] + 1
                # Create a new record
                sql = "UPDATE `userpreferencestable` SET `COUNT`=%s WHERE `USERTBID`=%s AND `CATEGORY`=%s"
                cursor.execute(sql, (a, int(s["userId"]), s["category"]))
        # connection is not autocommit by default. So you must commit to save
        # your changes.
        connection.commit()
    finally:
        connection.close()


    # print(str()+"-->"+s["category"])


def python_flask_ms():
    CORS(app)
    mysql = MySQL()
    app.config['MYSQL_DATABASE_USER']='root'
    app.config['MYSQL_DATABASE_PASSWORD']='root'
    app.config['MYSQL_DATABASE_DB']='zeus_flask'
    app.config['MYSQL_DATABASE_HOST']='localhost'

    channel.basic_consume(callback,
                          queue='zeus.queue',
                          no_ack=True)

    # Starting Rabbit Consumer listener in a thrad
    t1 = threading.Thread(target=channel.start_consuming)
    t1.start()
    t1.join(0)

    @app.route('/', methods = ['POST', 'GET'])
    def route():
        if request.method=='GET':
            return "hello world"
        else:
            return "post req"

    @app.route("/getPrefs", methods=['GET'])
    def getPrefs():
        cursor = mysql.connect().cursor()
        cursor.execute("SELECT * from videotable")
        data = cursor.fetchall()
        return jsonify(data)

    @app.route("/getVideos", methods = ['GET'])
    def getVideos():
        cursor = mysql.connect().cursor()
        cursor.execute("SELECT * from userpreferencestable")
        data = cursor.fetchall()
        return jsonify(data)

    mysql.init_app(app)

    return app


if __name__ == '__main__':
   app = python_flask_ms()
   app.run("0.0.0.0","4000")




