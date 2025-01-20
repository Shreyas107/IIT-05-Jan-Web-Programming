from flask import Blueprint, jsonify

# Create a Blueprint for users
users_bp = Blueprint('users', __name__)

# Define a route for the /users API
@users_bp.route('/users', methods=['GET'])
def list_users():
    users = [
        {"id": 1, "name": "Alice"},
        {"id": 2, "name": "Bob"},
        {"id": 3, "name": "Charlie"}
    ]
    return jsonify({
        "status-text": 'success',
        "status": 200,
        "userList": users
    })
