import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("NEON_DATABASE_URL")

# Set up SQLAlchemy engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Example: Get events from the database
def get_events(query='', category='', limit=6, page=1):
    session = SessionLocal()
    try:
        sql = "SELECT * FROM events"
        result = session.execute(text(sql))
        events = [dict(row) for row in result]
        return {
            "data": events,
            "totalPages": 1  # You should implement real pagination
        }
    finally:
        session.close()

def get_event_by_id(event_id):
    session = SessionLocal()
    try:
        sql = "SELECT * FROM events WHERE id = :event_id"
        result = session.execute(text(sql), {"event_id": event_id}).fetchone()
        return dict(result) if result else None
    finally:
        session.close()

def create_event(data):
    session = SessionLocal()
    try:
        sql = text("""
            INSERT INTO events (title, description, category_id, organizer_first_name, organizer_last_name, image_url, price, is_free, url, created_at, updated_at)
            VALUES (:title, :description, :category_id, :organizer_first_name, :organizer_last_name, :image_url, :price, :is_free, :url, NOW(), NOW())
            RETURNING *
        """)
        result = session.execute(sql, data)
        session.commit()
        return dict(result.fetchone())
    finally:
        session.close()

def update_event(event_id, data):
    session = SessionLocal()
    try:
        sql = text("""
            UPDATE events
            SET title = :title, description = :description, category_id = :category_id, organizer_first_name = :organizer_first_name,
                organizer_last_name = :organizer_last_name, image_url = :image_url, price = :price, is_free = :is_free, url = :url, updated_at = NOW()
            WHERE id = :event_id
            RETURNING *
        """)
        data["event_id"] = event_id
        result = session.execute(sql, data)
        session.commit()
        return dict(result.fetchone())
    finally:
        session.close()

def delete_event(event_id):
    session = SessionLocal()
    try:
        sql = text("DELETE FROM events WHERE id = :event_id")
        session.execute(sql, {"event_id": event_id})
        session.commit()
        return True
    finally:
        session.close()

def get_users():
    session = SessionLocal()
    try:
        sql = "SELECT * FROM users"
        result = session.execute(text(sql))
        return [dict(row) for row in result]
    finally:
        session.close()

def get_user_by_id(user_id):
    session = SessionLocal()
    try:
        sql = "SELECT * FROM users WHERE id = :user_id"
        result = session.execute(text(sql), {"user_id": user_id}).fetchone()
        return dict(result) if result else None
    finally:
        session.close()

def get_user_by_clerk_id(clerk_id):
    session = SessionLocal()
    try:
        sql = "SELECT * FROM users WHERE clerk_id = :clerk_id"
        result = session.execute(text(sql), {"clerk_id": clerk_id}).fetchone()
        return dict(result) if result else None
    finally:
        session.close()

def create_user(data):
    session = SessionLocal()
    try:
        sql = text("""
            INSERT INTO users (clerk_id, email, username, first_name, last_name, photo, created_at)
            VALUES (:clerkId, :email, :username, :firstName, :lastName, :photo, NOW())
            RETURNING *
        """)
        result = session.execute(sql, data)
        session.commit()
        return dict(result.fetchone())
    finally:
        session.close()

def update_user(user_id, data):
    session = SessionLocal()
    try:
        sql = text("""
            UPDATE users
            SET email = :email, username = :username, first_name = :firstName, last_name = :lastName, photo = :photo
            WHERE id = :user_id
            RETURNING *
        """)
        data["user_id"] = user_id
        result = session.execute(sql, data)
        session.commit()
        return dict(result.fetchone())
    finally:
        session.close()

def delete_user(user_id):
    session = SessionLocal()
    try:
        sql = text("DELETE FROM users WHERE id = :user_id")
        session.execute(sql, {"user_id": user_id})
        session.commit()
        return True
    finally:
        session.close()

def get_categories():
    session = SessionLocal()
    try:
        sql = "SELECT * FROM categories"
        result = session.execute(text(sql))
        return [dict(row) for row in result]
    finally:
        session.close()

def create_category(data):
    session = SessionLocal()
    try:
        sql = text("""
            INSERT INTO categories (name, created_at)
            VALUES (:categoryName, NOW())
            RETURNING *
        """)
        result = session.execute(sql, data)
        session.commit()
        return dict(result.fetchone())
    finally:
        session.close()