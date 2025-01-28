import jwt
from flask import request, jsonify
from functools import wraps
from config import Config

def authorize_role(allowed_roles):
    """
    Middleware for role authorization.
    :param allowed_roles: List of roles that are allowed to access the route.
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Get the token from the request header
            token = request.headers.get('token')

            if not token:
                return jsonify({"error": "Token is required"}), 403

            try:
                # Decode the JWT token to extract user information
                decoded = jwt.decode(token, Config.JWT_SECRET_KEY, algorithms=["HS256"])
                user_role = decoded.get('role')
                print("user_role: ", user_role)

                # Check if the user's role is included in the allowed roles
                if user_role not in allowed_roles:
                    return jsonify({"error": "Access forbidden: You are not allowed to make this request"}), 403

                # Attach the user information to the request object for use in the route handler
                request.user = decoded

            except jwt.ExpiredSignatureError:
                return jsonify({"error": "Token has expired"}), 401
            except jwt.InvalidTokenError:
                return jsonify({"error": "Invalid token"}), 401

            # Call the original route handler
            return f(*args, **kwargs)

        return decorated_function

    return decorator
