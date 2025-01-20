from flask import Flask, request

app = Flask(__name__)

@app.route('/hello', methods=['GET'])
def hello_world():
    return '<center><h1>Hello, World!</h1></center>'

@app.route('/demo', methods=['GET', 'POST', 'PUT', 'DELETE'])
def all_methods():
    # print("request: ", request)
    if request.method == 'POST':
        return 'POST method is called'
    elif request.method == 'PUT':
        return 'PUT method is called'
    elif request.method == 'DELETE':
        return 'DELETE method is called'
    else:
        return 'GET method is called'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)