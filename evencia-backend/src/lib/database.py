import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Mock database functions for now - these would connect to your actual database
def get_events(query='', category='', limit=6, page=1):
    # Mock data - replace with actual database queries
    return {
        "data": [
            {
                "eventId": 1,
                "title": "Sample Event",
                "description": "This is a sample event",
                "categoryName": "Technology",
                "organizerFirstName": "John",
                "organizerLastName": "Doe",
                "imageUrl": "/assets/images/placeholder.png",
                "price": "0.00",
                "isFree": "true",
                "url": "https://example.com",
                "createdAt": "2024-01-01T00:00:00Z",
                "updatedAt": "2024-01-01T00:00:00Z"
            }
        ],
        "totalPages": 1
    }

def get_event_by_id(event_id):
    # Mock data - replace with actual database query
    return {
        "eventId": event_id,
        "title": "Sample Event",
        "description": "This is a sample event",
        "categoryName": "Technology",
        "organizerFirstName": "John",
        "organizerLastName": "Doe",
        "imageUrl": "/assets/images/placeholder.png",
        "price": "0.00",
        "isFree": "true",
        "url": "https://example.com",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
    }

def create_event(data):
    # Mock creation - replace with actual database insert
    return {
        "eventId": 1,
        "title": data.get("title", ""),
        "description": data.get("description", ""),
        "categoryName": "Technology",
        "organizerFirstName": "John",
        "organizerLastName": "Doe",
        "imageUrl": data.get("imageUrl", ""),
        "price": data.get("price", "0.00"),
        "isFree": data.get("isFree", "true"),
        "url": data.get("url", ""),
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
    }

def update_event(event_id, data):
    # Mock update - replace with actual database update
    return {
        "eventId": event_id,
        "title": data.get("title", ""),
        "description": data.get("description", ""),
        "categoryName": "Technology",
        "organizerFirstName": "John",
        "organizerLastName": "Doe",
        "imageUrl": data.get("imageUrl", ""),
        "price": data.get("price", "0.00"),
        "isFree": data.get("isFree", "true"),
        "url": data.get("url", ""),
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
    }

def delete_event(event_id):
    # Mock deletion - replace with actual database delete
    return True

def get_users():
    # Mock data - replace with actual database queries
    return [
        {
            "userId": 1,
            "clerkId": "user_123",
            "email": "john@example.com",
            "username": "johndoe",
            "firstName": "John",
            "lastName": "Doe",
            "photo": "/assets/images/placeholder.png",
            "createdAt": "2024-01-01T00:00:00Z"
        }
    ]

def get_user_by_id(user_id):
    # Mock data - replace with actual database query
    return {
        "userId": user_id,
        "clerkId": "user_123",
        "email": "john@example.com",
        "username": "johndoe",
        "firstName": "John",
        "lastName": "Doe",
        "photo": "/assets/images/placeholder.png",
        "createdAt": "2024-01-01T00:00:00Z"
    }

def get_user_by_clerk_id(clerk_id):
    # Mock data - replace with actual database query
    return {
        "userId": 1,
        "clerkId": clerk_id,
        "email": "john@example.com",
        "username": "johndoe",
        "firstName": "John",
        "lastName": "Doe",
        "photo": "/assets/images/placeholder.png",
        "createdAt": "2024-01-01T00:00:00Z"
    }

def create_user(data):
    # Mock creation - replace with actual database insert
    return {
        "userId": 1,
        "clerkId": data.get("clerkId", ""),
        "email": data.get("email", ""),
        "username": data.get("username", ""),
        "firstName": data.get("firstName", ""),
        "lastName": data.get("lastName", ""),
        "photo": data.get("photo", ""),
        "createdAt": "2024-01-01T00:00:00Z"
    }

def update_user(user_id, data):
    # Mock update - replace with actual database update
    return {
        "userId": user_id,
        "clerkId": "user_123",
        "email": data.get("email", ""),
        "username": data.get("username", ""),
        "firstName": data.get("firstName", ""),
        "lastName": data.get("lastName", ""),
        "photo": data.get("photo", ""),
        "createdAt": "2024-01-01T00:00:00Z"
    }

def delete_user(user_id):
    # Mock deletion - replace with actual database delete
    return True

def get_categories():
    # Mock data - replace with actual database queries
    return [
        {
            "categoryId": 1,
            "name": "Technology",
            "createdAt": "2024-01-01T00:00:00Z"
        },
        {
            "categoryId": 2,
            "name": "Business",
            "createdAt": "2024-01-01T00:00:00Z"
        }
    ]

def create_category(data):
    # Mock creation - replace with actual database insert
    return {
        "categoryId": 1,
        "name": data.get("categoryName", ""),
        "createdAt": "2024-01-01T00:00:00Z"
    }

