from flask import Blueprint, jsonify, request
from src.lib.database import get_categories, create_category

categories_bp = Blueprint('categories', __name__)

@categories_bp.route('/', methods=['GET'])
def get_all_categories():
    try:
        categories = get_categories()
        return jsonify(categories)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@categories_bp.route('/', methods=['POST'])
def create_new_category():
    try:
        data = request.get_json()
        category = create_category(data)
        return jsonify(category), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

