# Local configuration

Copy backend/.env.example to backend/.env and supply new credentials locally.
Install Python dependencies: python -m pip install -r backend/scripts/requirements.txt
Generate a new Laravel application key: php artisan key:generate (from backend).
Configure OPENAI_API_KEY, SERPER_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and DB_*.
Python loads backend/.env without overriding inherited environment variables. Laravel passes configuration to child processes, including when configuration is cached. Rebuild configuration cache and restart queue workers after credential changes.
All exposed credentials must be revoked/rotated, including Google OAuth, OpenAI, Serper, DB passwords and Laravel APP_KEY. Changing APP_KEY invalidates previously encrypted data and sessions; plan migration where needed.
Historical SQL dumps are sanitized, and their former tokens/passwords must not be reused.
