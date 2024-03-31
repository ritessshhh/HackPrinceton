# MindAid - Your AI therapist / Companion.
![Welcome brave](https://github.com/ritessshhh/MindAid/assets/81812754/18711c39-3a3a-46e0-8715-60fbab038979)


## Description

This web application is designed to provide music therapy and emotional support to users by analyzing their diary entries and generating custom songs based on their emotions. The application uses several APIs, including Eleven Labs for custom voice, Spotify for playlist generation, Suno AI for custom songs, and OpenAI's GPT-4 for emotion analysis and message generation. The backend is built with Flask and the data is stored in MongoDB.

## Requirements

- Python 3.7 or higher
- Flask
- flask_cors
- spotipy
- openai
- requests
- pymongo
- hashlib

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/music-therapy-app.git
```

2. Navigate to the project directory:
```bash
cd music-therapy-app
```

3. Install the required dependencies:
```bash
pip install -r requirements.txt
```

4. Set up your environment variables:
- Create a `.env` file in the project root directory.
- Add your API keys and MongoDB connection string to the `.env` file.

5. Run the Flask application:
```bash
python Server.py
```


## Usage

- The application provides endpoints for analyzing diary entries, generating custom songs, and retrieving stored songs.
- Use the `/heal` endpoint to submit a diary entry and receive a custom song based on the analyzed emotions.
- Use the `/songs` endpoint to retrieve a list of all stored songs.

## API Endpoints

- `POST /heal`: Analyzes the submitted diary entry and generates a custom song.
- `GET /songs`: Retrieves a list of all stored songs.

## License

This project is licensed under the MIT License.
