from flask import Flask
from flask import request, jsonify
from flaskext.mysql import MySQL
from flask_cors import CORS

app = Flask(__name__)


def python_flask_ms():
    CORS(app)
    mysql = MySQL()
    app.config['MYSQL_DATABASE_USER']='root'
    app.config['MYSQL_DATABASE_PASSWORD']='root'
    app.config['MYSQL_DATABASE_DB']='zeus_flask'
    app.config['MYSQL_DATABASE_HOST']='localhost'


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




