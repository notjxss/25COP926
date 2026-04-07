from flask import Flask, request, jsonify
import sqlite3
import bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# --- Database helper ---
# can query database using email

def get_db():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn

# --- REGISTER ---
# reads the form data from react, assigns to variables

# run register when data is received from registration form
@app.post("/register")
def register():
    data = request.json
    username = data.get("username")
    firstname = data.get("firstname")
    lastname = data.get("lastname")
    email = data.get("email")
    password = data.get("password")

    # hash the password
    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    # gensalt adds randomness so two same passwords have different hashes

    conn = get_db()
    try:
        cursor = conn.execute(
            """
            INSERT INTO users (username, firstname, lastname, email, password_hash)
            VALUES (?, ?, ?, ?, ?)
            """, # avoid SQL injection by using parameterised queries
            (username, firstname, lastname, email, password_hash)
        )
        conn.commit()
        user_id = cursor.lastrowid

        # return everything but the password hash to be used in the frontend
        return jsonify({
            "id": user_id,
            "username": username,
            "firstname": firstname,
            "lastname": lastname,
            "email": email
        })

    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 400

    finally:
        conn.close()

# --- LOGIN ---
# run login when login button is pressesd (sent)
@app.post("/login")
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    conn = get_db()
    user = conn.execute(
        "SELECT * FROM users WHERE username = ?",
        (username,)
    ).fetchone()
    conn.close()

    if not user:
        return jsonify({"error": "User not found"}), 400

    stored_hash = user["password_hash"]

    # check if the provided password matches the stored hash
    if not bcrypt.checkpw(password.encode("utf-8"), stored_hash):
        return jsonify({"error": "Wrong password"}), 401

    return jsonify({
        "id": user["id"],
        "username": user["username"],
        "firstname": user["firstname"],
        "lastname": user["lastname"],
        "email": user["email"]
    })


if __name__ == "__main__":
    app.run(port=3001, debug=True)
