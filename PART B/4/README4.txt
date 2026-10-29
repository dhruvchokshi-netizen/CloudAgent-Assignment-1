# Practical 4: Test Persistence and Recovery

## Objective
To verify that PostgreSQL data persists after its container is stopped, removed, and recreated.

## Procedure

### 1. Insert and Verify a Sample Record

Insert a record through the Node.js backend:

```bash
curl -X POST http://localhost:3000/records \
  -H "Content-Type: application/json" \
  -d '{"message":"Persistence test record"}'
```

Verify that the record exists:

```bash
curl http://localhost:3000/records
```

### 2. Remove and Recreate the Containers

Stop and remove the Compose containers:

```bash
docker compose down
```

Restart the application:

```bash
docker compose up --build -d
docker compose ps
```

Verify that the record still exists:

```bash
curl http://localhost:3000/records
```

## Result and Explanation

The sample record remained available after the containers were recreated because PostgreSQL stores its data in the named volume `postgres_data`, mounted at `/var/lib/postgresql/data`.

A container's writable layer is deleted when the container is removed. A named volume stores data independently of the container lifecycle, allowing a newly created PostgreSQL container to reuse the existing database data.

## What Happens If the Named Volume Is Deleted?

If the named volume is deleted, the database data stored in that volume is lost. When PostgreSQL starts with a new empty volume, it initializes a fresh database, and the previous sample record will no longer be available.

**Note:** `docker compose down` preserves named volumes by default. Avoid `docker compose down -v` during the persistence test because the `-v` option removes the Compose project's named volumes.

## Evidence

Include screenshots showing:
1. Successful sample record insertion and retrieval.
2. Container removal using `docker compose down`.
3. Containers running again after recreation.
4. The same record retrieved after recreation.
5. The named volume listed using `docker volume ls`.

## Conclusion

The persistence test demonstrated that named volumes preserve PostgreSQL data independently of container removal and recreation. Deleting the named volume removes that persistence and can result in permanent data loss without a backup.
