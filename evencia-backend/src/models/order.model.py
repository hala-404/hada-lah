from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    stripe_id = db.Column(db.String(255), unique=True, nullable=False)
    total_amount = db.Column(db.String(50), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    event = db.relationship('Event', backref='orders')
    buyer = db.relationship('User', backref='orders')

    def __repr__(self):
        return f'<Order {self.stripe_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'created_at': self.created_at,
            'stripe_id': self.stripe_id,
            'total_amount': self.total_amount,
            'event': {
                'id': self.event.id,
                'title': self.event.title
            } if self.event else None,
            'buyer': {
                'id': self.buyer.id,
                'first_name': self.buyer.first_name,
                'last_name': self.buyer.last_name
            } if self.buyer else None
        }