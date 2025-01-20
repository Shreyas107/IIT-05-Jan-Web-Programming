from flask import Flask, jsonify

app = Flask(__name__)

users = [
    {"id": 1, "name": "Alice", "email": "alice@example.com"},
    {"id": 2, "name": "Bob", "email": "bob@example.com"},
    {"id": 3, "name": "Charlie", "email": "charlie@example.com"}
]

@app.route('/demo')
def hello_world():
    return '<center><h1>Hello, World!</h1></center>'

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify({
        "status-text": 'success',
        "status-code": 200,
        "message": "Get users successfully",
        "name": "sj",
        "data": users
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)