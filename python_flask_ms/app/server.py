from flask import Flask
from flask import request, jsonify
from flaskext.mysql import MySQL
from flask_cors import CORS
import pika
import threading

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.queue_declare(queue='zeus.queue')

app = Flask(__name__)

def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)


def python_flask_ms():
    CORS(app)
    mysql = MySQL()
    app.config['MYSQL_DATABASE_USER']='aravind'
    app.config['MYSQL_DATABASE_PASSWORD']='aravind'
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



    @app.route("/getVideos", methods = ['GET'])
    def getVideos():
        cursor = mysql.connect().cursor()
        cursor.execute("SELECT * from videotable")
        data = cursor.fetchall()
        return jsonify(data)



    mysql.init_app(app)

    return app


if __name__ == '__main__':
   app = python_flask_ms()
   app.run("0.0.0.0","4000")




