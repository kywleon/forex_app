# Forex App

Forex App is a foreign exchange rate application with a React.js frontend and an Express.js backend. Users can view currency exchange rates and enjoy lazy-loading functionality.

---

## Tech Stack

- **Backend**: Node.js + Express.js  
- **Frontend**: React.js  
- **Database**: MySQL (SQL files provided to initialize `currencies` and `rates` tables)  
- **Testing**: Jest unit tests (backend)  
- **Containerization**: Docker + Docker Compose  

---

## Data Information

- `currencies` table: Supports 48 countries’ currencies  
- `rates` table: Exchange rate data from **2025-09-01** to **2025-08-12**  
- SQL files are provided to initialize the database  

---

## Key Features

- **Lazy-loading**: Load 12 currencies per scroll when viewing all rates  
- **Unit tests**: Implemented in the backend using Jest  
- **Dockerized**: Easy installation and deployment  

---

## Installation & Running

1. Clone the repository  
```bash
git clone <your-repo-url>
cd forex_app

2. Copy the environment file
cp env.example .env

3. Start the project using Docker
docker-compose up --build

4. Backend unit tests
# Enter the backend container
docker exec -it forex_backend sh

# Navigate to the source code
cd src

# Run Jest unit tests
npm test


Access URLs
Backend API: http://localhost:5000/
Example endpoint: http://localhost:5000/api/rates/latest
Frontend App: http://localhost:5175/