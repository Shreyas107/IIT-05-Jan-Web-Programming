# Import the Flask class 
from flask import Flask

# Creates an instance of the Flask 
# This instance represents your web application.
# __name__ is a special Python variable that represents the name of the current module or script.
app = Flask(__name__)

# Define a route for the URL path '/'
# The `@app.route('/')` decorator is used to tell Flask that the function `hello()` 
# will handle requests to the root URL of the application (e.g., http://127.0.0.1:5000/hello).
@app.route('/test')
def hello():
    # The `hello()` function returns a simple text response "Hello, Flask!" when the root URL is accessed.
    return "<h1><center>Hello, Flask!</center></h1>"

@app.route('/test1')
def test1():
    # The `hello()` function returns a simple text response "Hello, Flask!" when the root URL is accessed.
    return "<h1><center>Test1</center></h1>"

# This block checks if the script is being run directly (as opposed to being imported).
# If this script is executed directly, the following code block will run, starting the Flask development server.
if __name__ == '__main__':
    # The `app.run(debug=True)` command runs the Flask web server.
    # Setting `debug=True` enables the debug mode, which provides detailed error messages and 
    # automatically restarts the server whenever changes are made to the code.
    app.run(debug=True)
