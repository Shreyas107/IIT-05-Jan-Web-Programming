from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'shreyas'
app.config['MYSQL_DB'] = 'userdata'

mysql = MySQL(app)

@app.route("/users", methods=["GET"])
def getAllUsers():
    # Create a cursor object to interact with the database
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)  # DictCursor returns results as dictionaries
    
    # Execute the SQL query to get all records from the 'users' table
    cur.execute("SELECT * FROM users")
    
    # Fetch all results from the executed query (returns a list of dictionaries)
    users = cur.fetchall()
    
    # Close the cursor to free up resources
    cur.close()
    
    # Return the results as a JSON response
    return jsonify(users)


@app.route("/user/<int:id>", methods=["GET"])
def getUserById(id):
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT * FROM users where id = %s", [id])
    user = cur.fetchone()
    cur.close()

    return jsonify(user)

if __name__ == '__main__':
    app.run(debug=True)