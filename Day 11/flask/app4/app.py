from flask import Flask, jsonify
from users import users_bp  # Import the users blueprint

# Create the Flask app
app = Flask(__name__)

# Register the users blueprint
app.register_blueprint(users_bp)

# Define the /hello route
@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({
        "status-text": 'success',
        "status": 200,
        "message": "Hello, Flask!"
    })

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
