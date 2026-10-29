# Practical 5: Debugging Challenge

## Objective
To introduce a configuration error, identify its cause using Docker logs and inspection commands, fix it, and verify that the application works again.

## 1. Error Introduced
The backend database hostname in `docker-compose.yml` was temporarily changed from `db` to `wrong-db-host`.

```yaml
DB_HOST: wrong-db-host
```

This prevented the backend from resolving the PostgreSQL service hostname.

## 2. Debugging Commands

Check container status:

```bash
docker compose ps
```

Inspect backend logs:

```bash
docker compose logs backend
```

Inspect container configuration:

```bash
docker inspect cloudagent-backend
docker inspect cloudagent-db
```

The logs showed a database connection failure caused by the incorrect hostname.

## 3. Fix and Recovery
The hostname was restored to `db`, matching the PostgreSQL service name in Docker Compose.

```yaml
DB_HOST: ${DB_HOST}
```

The `.env` file retained the correct setting:

```dotenv
DB_HOST=db
```

Restart the application:

```bash
docker compose up --build -d
```

Verify the database connection and stored records:

```bash
curl http://localhost:3000/db-check
curl http://localhost:3000/records
```

## Result
The backend successfully reconnected to PostgreSQL after the hostname was corrected. The database connection endpoint worked, and previously stored records remained available.

## Conclusion
Docker Compose uses service names for DNS-based communication between containers on the same network. An incorrect hostname can prevent a backend from connecting to its database. Container status, logs, and inspection commands help identify and resolve such configuration errors.

## Evidence
Include screenshots showing:
1. The introduced configuration error and its logs.
2. Container status or inspection output used for diagnosis.
3. The corrected hostname.
4. Successful database connectivity after the fix.
