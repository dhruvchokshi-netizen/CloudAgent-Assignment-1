# Practical 1: Container Lifecycle and Inspection

## Objective

To understand Docker container lifecycle management by pulling an Nginx image, running a container with port mapping, verifying its functionality, inspecting its configuration and logs, and performing stop, start, removal, and recreation operations.

## Prerequisites

- Docker Desktop installed and running.
- A terminal with access to Docker commands.
- A web browser or `curl` for testing the application.

## Procedure

### 1. Pull the Nginx Image

Download the official Nginx image from Docker Hub.

```bash
docker pull nginx
```

This downloads the image required to create an Nginx container. If the image is already available locally, Docker may reuse the existing image.

### 2. Run the Container

Create and start a container named `nginx-assignment`, mapping host port 8080 to container port 80.

```bash
docker run -d --name nginx-assignment -p 8080:80 nginx
```

Explanation:

- `-d`: Runs the container in detached mode.
- `--name nginx-assignment`: Assigns a name to the container.
- `-p 8080:80`: Maps host port 8080 to container port 80.
- `nginx`: Specifies the image used to create the container.

### 3. Verify the Application

Open the following URL in a browser:

http://localhost:8080

Alternatively, execute:

```bash
curl http://localhost:8080
```

The expected result is the default Nginx welcome page or its HTML response.

This verifies that the container is running and that the port mapping allows access to the web server.

### 4. Inspect the Container

Check running containers:

```bash
docker ps
```

This displays running containers, including their IDs, images, status, and port mappings.

Inspect the container's configuration:

```bash
docker inspect nginx-assignment
```

This displays detailed information about the container, including its state, network configuration, mounts, and port bindings.

View the container logs:

```bash
docker logs nginx-assignment
```

This displays the logs produced by the container's processes. Nginx access logs may show requests made through the browser or `curl`.

### 5. Stop and Restart the Same Container

Stop the container:

```bash
docker stop nginx-assignment
```

Check its status:

```bash
docker ps -a
```

The container should appear with an exited status because it has stopped but has not been removed.

Restart the same container:

```bash
docker start nginx-assignment
```

Verify that it is running:

```bash
docker ps
```

Test the application again at http://localhost:8080 or run:

```bash
curl http://localhost:8080
```

Restarting reuses the same container rather than creating a new one.

### 6. Remove and Recreate the Container

Stop and remove the existing container:

```bash
docker stop nginx-assignment
docker rm nginx-assignment
```

Create a new container using the existing Nginx image:

```bash
docker run -d --name nginx-assignment -p 8080:80 nginx
```

Verify the recreated container:

```bash
docker ps
```

Test the application again at http://localhost:8080.

The new container has a fresh writable layer, even though it uses the same Nginx image as the previous container.

## Observations

- The Nginx image was downloaded from Docker Hub and used to create a container.
- Port mapping made the Nginx web server accessible through host port 8080.
- `docker ps` displayed running containers, while `docker inspect` provided detailed configuration and state information.
- `docker logs` displayed the available container logs.
- Stopping a container changed its state without deleting it.
- Starting the stopped container reused the same container and its existing writable layer.
- Removing the container deleted the container object and its writable layer.
- Recreating the container produced a new container with a fresh writable layer, using the existing Nginx image.

## Data Retention: What Is Retained and What Is Lost?

### When a container is stopped and restarted

The container itself is retained. Its configuration, writable-layer changes, and container-associated logs remain available. When restarted, the container resumes execution using the same writable layer.

### When a container is removed and recreated

The original container and its writable layer are deleted. Any changes stored only in that writable layer are lost. Container-associated logs are also no longer available through the removed container.

However, the downloaded Nginx image remains available locally and can be reused to create a new container without downloading it again.

Data stored in a separate named volume can survive container removal, provided the volume is not deleted. In this exercise, no persistent volume was configured, so the container's writable layer was not protected by a separate persistent storage mechanism.

## Result

The Nginx image was successfully pulled, and the container was created, accessed, inspected, stopped, restarted, removed, and recreated. The exercise demonstrated port mapping, container inspection, log retrieval, and the difference between stopping a container and removing it.

## Evidence

Include screenshots demonstrating:

1. Successful Nginx access through the browser or `curl`.
2. Running container details using `docker ps`.
3. Container configuration using `docker inspect`.
4. Available logs using `docker logs`.
5. Stopping and restarting the same container.
6. Removing and successfully recreating the container.

