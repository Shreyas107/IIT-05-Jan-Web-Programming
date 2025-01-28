from flask import Blueprint, jsonify, request
import MySQLdb.cursors
import hashlib
import jwt
from config import Config
from auth_middleware import authorize_role 

users_bp = Blueprint('users', __name__)

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# Register a user
@users_bp.route("/user/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    hashed_password = hash_password(password)

    cur = users_bp.mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    
    try:
        cur.execute("INSERT INTO user (name, email, password) VALUES (%s, %s, %s)", (name, email, hashed_password))
        users_bp.mysql.connection.commit()
    except MySQLdb.IntegrityError:
        return jsonify({"message": "Email already exists"}), 400
    finally:
        cur.close()

    return jsonify({"message": "User registered successfully"}), 201


# Login a user
@users_bp.route("/user/login", methods=["POST"])
def login():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    hashed_password = hash_password(password)

    cur = users_bp.mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT id, name, role FROM user WHERE email = %s AND password = %s", (email, hashed_password))
    user = cur.fetchone()
    cur.close()

    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    # Generate JWT token
    payload = {
        "id": user['id'],
        "name": user['name'],
        "email": email,
        "role": user['role']  
    }

    token = jwt.encode(payload, Config.JWT_SECRET_KEY, algorithm='HS256')

    return jsonify({
        "message": "Login successful",
        "token": token
    }), 200

# get all users
@users_bp.route("/users", methods=["GET"])
def getAllUsers():
    # Access mysql instance passed during blueprint registration
    mysql = users_bp.mysql

    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)  # Using cursor
    cur.execute("SELECT * FROM users") 
    users = cur.fetchall() 
    cur.close() 

    # print("request.user: ", request.user)
    
    return jsonify(users) 

# get a user by id
@users_bp.route("/user/<int:id>", methods=["GET"])
@authorize_role(allowed_roles=["admin"])
def getUserById(id):
    mysql = users_bp.mysql
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT * FROM users where id = %s", [id])
    user = cur.fetchone()
    cur.close()

    return jsonify(user)