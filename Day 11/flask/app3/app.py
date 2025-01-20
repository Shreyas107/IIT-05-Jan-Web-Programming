"""
import my_module

# module_name.method_name
print("ADD: ", my_module.addition(10, 20))
"""

from my_module import addition, subtract, multiply, divide

print("ADD: ", addition(10, 20))
print("SUB: ", subtract(10, 20))
print("MUL: ", multiply(10, 20))
print("DIV: ", divide(10, 20))