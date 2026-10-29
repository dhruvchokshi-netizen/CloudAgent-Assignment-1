# Practical 2: Build a Node.js Docker Image

## Objective
Create a minimal Node.js application, build and run a Docker image, and improve the Dockerfile using a working directory and a non-root user.

## 1. Application
The `app.js` file prints `Hello CloudAgent!` and exits successfully.

## 2. Dockerfile
The Dockerfile uses `node:22-alpine` as the base image, sets `/app` as the working directory, copies `app.js`, and runs it using `CMD ["node", "app.js"]`.

## 3. Dockerignore
The `.dockerignore` file contains:

```text
node_modules/
.git/
.env
npm-debug.log*
```

- `node_modules/` excludes local dependencies that are unnecessary for this minimal application.
- `.git/` excludes repository metadata.
- `.env` prevents local environment files containing secrets from entering the build context.
- `npm-debug.log*` excludes unnecessary debug logs.

## 4. Build and Run

```bash
docker build -t cloudagent-hello .
docker images
docker run --name cloudagent-hello-container cloudagent-hello
docker ps -a
```

Expected output:

```text
Hello CloudAgent!
```

After updating the Dockerfile, rebuild and run:

```bash
docker build -t cloudagent-hello .
docker run --rm cloudagent-hello
```

## 5. Security Improvement
The improved Dockerfile uses `WORKDIR /app`, `COPY --chown=node:node app.js .`, and `USER node`. These instructions establish a working directory, assign appropriate file ownership, and run the application as a non-root user to reduce security risks.

## Result
The Docker image `cloudagent-hello` was built and executed successfully. The application printed the expected message, and the improved Dockerfile demonstrated non-root execution.
