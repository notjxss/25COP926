import sqlite3

# reset user database during testing

conn = sqlite3.connect("users.db")
cursor = conn.cursor()

cursor.execute("DROP TABLE IF EXISTS users")

cursor.execute("""
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    firstname TEXT,
    lastname TEXT,
    email TEXT UNIQUE,
    password_hash BLOB
)
""")

conn.commit()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")

conn.close()
