from flask import Blueprint, jsonify, request
from src.lib.database import get_events, create_event, get_event_by_id, update_event, delete_event

events_bp = Blueprint('events', __name__)

@events_bp.route('/', methods=['GET'])
def get_all_events():
    try:
        query = request.args.get('query', '')
        category = request.args.get('category', '')
        limit = int(request.args.get('limit', 6))
        page = int(request.args.get('page', 1))
        
        events = get_events(query=query, category=category, limit=limit, page=page)
        return jsonify(events)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@events_bp.route('/<int:event_id>', methods=['GET'])
def get_event(event_id):
    try:
        event = get_event_by_id(event_id)
        if not event:
            return jsonify({"error": "Event not found"}), 404
        return jsonify(event)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@events_bp.route('/', methods=['POST'])
def create_new_event():
    try:
        data = request.get_json()
        event = create_event(data)
        return jsonify(event), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@events_bp.route('/<int:event_id>', methods=['PUT'])
def update_existing_event(event_id):
    try:
        data = request.get_json()
        event = update_event(event_id, data)
        if not event:
            return jsonify({"error": "Event not found"}), 404
        return jsonify(event)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@events_bp.route('/<int:event_id>', methods=['DELETE'])
def delete_existing_event(event_id):
    try:
        success = delete_event(event_id)
        if not success:
            return jsonify({"error": "Event not found"}), 404
        return jsonify({"message": "Event deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

