from flask import Blueprint, jsonify, request
from src.lib.database import get_users, create_user, get_user_by_id, update_user, delete_user

users_bp = Blueprint('users', __name__)

@users_bp.route('/', methods=['GET'])
def get_all_users():
    try:
        users = get_users()
        return jsonify(users)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@users_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = get_user_by_id(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        return jsonify(user)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@users_bp.route('/clerk/<clerk_id>', methods=['GET'])
def get_user_by_clerk_id(clerk_id):
    try:
        from src.lib.database import get_user_by_clerk_id as get_user_clerk
        user = get_user_clerk(clerk_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        return jsonify(user)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@users_bp.route('/', methods=['POST'])
def create_new_user():
    try:
        data = request.get_json()
        user = create_user(data)
        return jsonify(user), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@users_bp.route('/<int:user_id>', methods=['PUT'])
def update_existing_user(user_id):
    try:
        data = request.get_json()
        user = update_user(user_id, data)
        if not user:
            return jsonify({"error": "User not found"}), 404
        return jsonify(user)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@users_bp.route('/<int:user_id>', methods=['DELETE'])
def delete_existing_user(user_id):
    try:
        success = delete_user(user_id)
        if not success:
            return jsonify({"error": "User not found"}), 404
        return jsonify({"message": "User deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

