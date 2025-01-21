from flask import Blueprint, jsonify
import MySQLdb.cursors

# Initialize the Blueprint
users_bp = Blueprint('users', __name__)


@users_bp.route("/users", methods=["GET"])
def getAllUsers():
    # Access mysql instance passed during blueprint registration
    mysql = users_bp.mysql

    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)  # Using cursor
    cur.execute("SELECT * FROM users") 
    users = cur.fetchall() 
    cur.close() 
    
    return jsonify(users)  
