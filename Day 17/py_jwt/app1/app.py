from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from routes.users import users_bp
from config import Config
import jwt
import functools

app = Flask(__name__)

# Load the config
app.config.from_object(Config)

app.config['MYSQL_HOST'] = Config.MYSQL_HOST
app.config['MYSQL_USER'] = Config.MYSQL_USER
app.config['MYSQL_PASSWORD'] = Config.MYSQL_PASSWORD
app.config['MYSQL_DB'] = Config.MYSQL_DB

mysql = MySQL(app)

users_bp.mysql = mysql

app.register_blueprint(users_bp)

# Middleware for token validation
@app.before_request
def before_request():
    skip_paths = ["/user/register", "/user/login"]

    if request.path in skip_paths:
        return None  

    token = request.headers.get('token')
    if not token:
        return jsonify({"message": "Token is required"}), 403

    try:
        payload = jwt.decode(token, Config.JWT_SECRET_KEY, algorithms=["HS256"])
        # Attach the decoded token payload to the request object
        request.user = payload
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
