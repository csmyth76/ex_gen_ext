from flask import Flask, request, jsonify
import openai
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/generate": {"origins": "*"}})

app.logger.setLevel("DEBUG")

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/')
def home():
    return 'Welcome to my updated Flask app using OpenAI!'

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    if not data:
        app.logger.error("No JSON body found in the request")
        return jsonify({"error": "No data provided"}), 400

    concept = data.get('concept')
    interest = data.get('interest')

    if not concept or not interest:
        app.logger.error("Missing 'concept' or 'interest' in the request")
        return jsonify({"error": "Missing 'concept' or 'interest' data"}), 400

    prompt = f"Generate a concise textbook example of {concept} that might appear in a textbook and would appeal to a student interested in {interest}"
    app.logger.debug(f"Generated prompt: {prompt}")
    
    try:
        client = openai.OpenAI(api_key=openai.api_key)
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )

        response_data = {
            "id": completion.id,
            "model": completion.model,
            "choices": [choice.message.content for choice in completion.choices]
        }
        return jsonify(response_data)
    except Exception as e:
        app.logger.error(f"Error generating completion: {str(e)}")
        return jsonify({"error": "Error generating completion"}), 500

if __name__ == '__main__':
    app.run(debug=True)
