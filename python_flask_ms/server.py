from flask import Flask, request, jsonify

from flaskext.mysql import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
mysql = MySQL()

app.config['MYSQL_DATABASE_USER']='root'
app.config['MYSQL_DATABASE_PASSWORD']='root'
app.config['MYSQL_DATABASE_DB']='zeus_flask'
app.config['MYSQL_DATABASE_HOST']='localhost'


@app.route('/', methods = ['POST', 'GET'])
def route():
    if request.method=='GET':
        return jsonify({'myCollection':'hi'})
    else:
        return "post req"



@app.route("/getVideos")
def getVideos():
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from VideoTable")
    data = cursor.fetchall()
    return jsonify(data)


mysql.init_app(app)


if __name__ == '__main__':
    app.run("localhost","4000")


