import os
import sys
from dotenv import load_dotenv
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, jsonify
from flask_cors import CORS
from src.routes.events import events_bp
from src.routes.users import users_bp
from src.routes.categories import categories_bp
from src.models.user import db # Import your db instance

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("NEON_DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db.init_app(app)

# Enable CORS for all routes
CORS(app, origins="*")

# Register blueprints
app.register_blueprint(events_bp, url_prefix='/api/events')
app.register_blueprint(users_bp, url_prefix='/api/users')
app.register_blueprint(categories_bp, url_prefix='/api/categories')

@app.route('/api/health')
def health_check():
    return jsonify({"status": "healthy", "message": "Evencia Backend API is running"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)