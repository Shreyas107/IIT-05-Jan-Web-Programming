from flask import Blueprint, jsonify, request
import MySQLdb.cursors

# Initialize the Blueprint
users_bp = Blueprint('users', __name__)

# get all users
@users_bp.route("/users", methods=["GET"])
def getAllUsers():
    # Access mysql instance passed during blueprint registration
    mysql = users_bp.mysql

    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)  # Using cursor
    cur.execute("SELECT * FROM users") 
    users = cur.fetchall() 
    cur.close() 
    
    return jsonify(users)  

# get a user by id
@users_bp.route("/user/<int:id>", methods=["GET"])
def getUserById(id):
    mysql = users_bp.mysql
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT * FROM users where id = %s", [id])
    user = cur.fetchone()
    cur.close()

    return jsonify(user)

# add a new user
@users_bp.route("/user", methods=["POST"])
def addUser():
    mysql = users_bp.mysql
    data = request.get_json()
    print("data: ", data)

    id = data.get('id')
    name = data.get('name')
    username = data.get('username')
    email = data.get('email')
    phone = data.get('phone')

    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("INSERT INTO users (id, name, username, email, phone) VALUES (%s, %s, %s, %s, %s)", 
                (id, name, username, email, phone))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "User added successfully"})

# update a user by id
@users_bp.route("/user/<int:id>", methods=["PUT"])
def updateUser(id):
    mysql = users_bp.mysql
    data = request.get_json()

    name = data.get('name')
    username = data.get('username')
    email = data.get('email')
    phone = data.get('phone')

    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("UPDATE users SET name = %s, username = %s, email = %s, phone = %s WHERE id = %s", 
                (name, username, email, phone, id))
    
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "User updated successfully"})

# delete a user by id
@users_bp.route("/user/<int:id>", methods=["DELETE"])
def deleteUser(id):
    mysql = users_bp.mysql
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("DELETE FROM users WHERE id = %s", [id])
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "User deleted successfully"})
