# Exception example

"""
try: 
    result = 10/5
except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")
else:
    print("Result: ", result)
finally:
    print("This block runs no matter what.")
"""

# Custom exception example
def division(num1, num2):
    if num2 == 0:
        raise ValueError("Division by zero is not allowed")
    return num1 / num2

try: 
    result = division(10, 10)
    print("Result: ", result)
except ValueError as e:
    print("Error: ", e)
