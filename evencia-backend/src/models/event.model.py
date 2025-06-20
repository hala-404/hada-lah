from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    image_url = db.Column(db.String(255), nullable=False)
    start_date_time = db.Column(db.DateTime, nullable=False)
    end_date_time = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.String(50))
    is_free = db.Column(db.Boolean, default=False)
    url = db.Column(db.String(255))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    category = db.relationship('Category', backref='events')
    organizer = db.relationship('User', backref='events')

    def __repr__(self):
        return f'<Event {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'location': self.location,
            'created_at': self.created_at,
            'image_url': self.image_url,
            'start_date_time': self.start_date_time,
            'end_date_time': self.end_date_time,
            'price': self.price,
            'is_free': self.is_free,
            'url': self.url,
            'category': self.category.to_dict() if self.category else None,
            'organizer': self.organizer.to_dict() if self.organizer else None
        }