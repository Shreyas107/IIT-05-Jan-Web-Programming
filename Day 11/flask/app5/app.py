from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
from users import users_bp  # Import the users blueprint

app = Flask(__name__)

# Apply CORS to the entire app (all routes)
CORS(app)

# Alternatively, you can apply CORS to just the users blueprint
# CORS(users_bp)

# Register the users blueprint with a URL prefix
app.register_blueprint(users_bp, url_prefix='/api')

# Define a /hello route
@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({
        "status-text": 'success',
        "status": 200,
        "message": "Hello, Flask!"
    })

if __name__ == '__main__':
    app.run(debug=True)
