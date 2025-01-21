from flask import Flask
from flask_mysqldb import MySQL
from routes.users import users_bp  

# Initialize the Flask app
app = Flask(__name__)

# Configure MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'shreyas'
app.config['MYSQL_DB'] = 'userdata'

# Initialize MySQL
mysql = MySQL(app)

# Attach mysql to the blueprint as a custom attribute
users_bp.mysql = mysql

# Register the Blueprint
app.register_blueprint(users_bp)

if __name__ == '__main__':
    app.run(debug=True)
