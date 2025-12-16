# wfg
## Project Overview

This project consists of a **backend** built with Python and a **frontend** developed using React. The application is containerized using Docker for easy deployment and scalability.

### Backend: Python
The backend is responsible for handling API requests, processing data, and interacting with the database. It is implemented using Python and follows best practices for RESTful API design.

### Frontend: React
The frontend is a React-based single-page application (SPA) that provides a user-friendly interface for interacting with the backend services.

---

## Prerequisites

Ensure you have the following installed:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## How to Run the Application

1. **Clone the Repository**:
  ```bash
  git clone <repository-url>
  cd <repository-directory>
  ```

2. **Set Up Environment Variables**:

  - **Backend**:
    - **Backend**:
      Rename the `.env.example` file in the `/backend` directory to `.env` and update the respective values:

    - **Frontend**:
      Rename the `.env.example` file in the `/frontend` directory to `.env` and update the respective values:

    These `.env` files are essential for the application to function correctly.

3. **Database Migration**:

  The backend includes automatic database migration functionality. Once the service starts, it will automatically migrate the database tables into Supabase for both the frontend and backend. Ensure your Supabase credentials are correctly configured in the `.env` file.

4. **Build and Start the Docker Containers**:
  ```bash
  docker-compose up --build
  ```

5. **Access the Application**:
  - Frontend: Open your browser and navigate to `http://localhost:8000`.
  - Backend: API endpoints are available at `http://localhost:5173`.

6. **Stop the Application**:
  Press `Ctrl+C` in the terminal where the Docker containers are running, then execute:
  ```bash
  docker-compose down
  ```

---

## File Structure

```
/backend
  ├── app.py
  ├── requirements.txt
  └── Dockerfile
/frontend
  ├── src/
  ├── package.json
  └── Dockerfile
docker-compose.yml
```

---

## Notes

- Ensure all dependencies are listed in `requirements.txt` for the backend and `package.json` for the frontend.
- Modify the `docker-compose.yml` file if you need to change ports or environment variables.

--- 

## Troubleshooting

- If you encounter issues, check the logs:
  ```bash
  docker-compose logs
  ```
- Ensure Docker is running and no other services are using the same ports.
