# Practical 3: Run a Two-Service Application with Docker Compose

## Objective
Deploy a Node.js backend and PostgreSQL database using Docker Compose, with networking, environment variables, health checks, and persistent storage.

## Implementation
The project contains two services: `backend` and `db`. The backend uses Express.js to provide HTTP endpoints and the `pg` library to communicate with PostgreSQL.

## Networking
Both services communicate through a Docker Compose bridge network. The backend connects to PostgreSQL using the service name `db` instead of a hard-coded IP address.

## Configuration
Database settings are passed through environment variables defined in `.env`. Real credentials should not be committed to source control. The `.env` file is excluded using `.dockerignore` and should also be listed in `.gitignore`.

## Health Check and Service Readiness
PostgreSQL uses `pg_isready` as a health check to determine whether it is ready to accept connections. The backend uses `depends_on` with `condition: service_healthy` to wait for the database to become healthy before starting.

**Service startup** means a container has started running. **Service readiness** means the application inside it is prepared to accept requests. A running database container may not yet be ready to accept connections.

## Persistent Storage
A named volume, `postgres_data`, is mounted at `/var/lib/postgresql/data`. It preserves PostgreSQL data independently of the database container's lifecycle.

## Build and Verification
Start the application:

```bash
docker compose up --build -d
```

Check service status:

```bash
docker compose ps
```

Verify the database connection:

```bash
curl http://localhost:3000/db-check
```

Insert and retrieve a sample record:

```bash
curl -X POST http://localhost:3000/records \
  -H "Content-Type: application/json" \
  -d '{"message":"Test record"}'

curl http://localhost:3000/records
```

## Result
The Node.js backend and PostgreSQL database were configured to communicate through Docker Compose. Environment-based configuration, a database health check, and persistent named storage were implemented and tested.
