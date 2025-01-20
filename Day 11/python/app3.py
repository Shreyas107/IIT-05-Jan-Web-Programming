
# Define a decorator function
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()  # Call the original function
        print("Something is happening after the function is called.")
    return wrapper

# Define a function to be decorated
def say_hello():
    print("Hello!")


# Apply the decorator
@my_decorator
def say_hello():
    print("Hello!")

# Calling the function
say_hello()