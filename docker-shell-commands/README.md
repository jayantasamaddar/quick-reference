# Docker Shell Commands

| Command | Function |
|---------|----------|
| `docker run ubuntu` | Run a container from the ubuntu image. If the image doesn't exist locally, it will be pulled from Docker Hub. |
| `docker run -i ubuntu` | Run a container from the ubuntu image on interactive mode without attaching to the container's terminal. `-i` stands for interactive mode. |
| `docker run -it ubuntu` | Run a container from the ubuntu image on interactive mode and attach to the container's terminal. `-i` stands for interactive mode. `-t` stands for pseudo terminal |
| `docker run ubuntu bash`  | Run a container from the ubuntu image and execute a bash shell |
| `docker pull ubuntu` | Pull an image from Docker Hub but does not run it. |
| `docker images`<br>`docker image ls` | List all images |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers, running or stopped |
| `docker stop <container-id>`<br>`docker stop <container-name>` | Stop a running container |
| `docker stop -t <timeout> <container-id>`<br>`docker stop -t <timeout> <container-name>` | Stop a running container after a given timeout |
| `docker stop $(docker ps -a -q)` | Stop all running containers |
| `docker start <container-id>`<br>`docker start <container-name>` | Start a stopped container |
| `docker rm <container-id>`<br>`docker rm <container-name>` | Remove a stopped container |
| `docker rm $(docker ps -a -q)` | Remove all stopped containers. The `-a` option lists all containers including stopped ones. The `-q` flag runs the quiet option, to provide only container numeric IDs, rather than a whole table of information about containers. |
| `docker rmi <image-id>`<br>`docker rmi <image-name>` | Remove an image<br>Ensure that there are no running containers of that image. |
| `docker rmi <image-id-1> <image-id-2> ...`<br>`docker rmi <image-name-1> <image-name-2> ...` | Remove multiple images |
| `docker rmi $(docker images -q)` | Remove all images. The `-q` flag returns the unique IDs |
| `docker exec <container-id> ls`<br>`docker exec <container-name> ls` | Execute the Linux `ls` command in a **running container** |
| `docker run -d remote/simple-webserver` | Run a container from the ubuntu image. Since it is a webserver, the prompt will not be available unless we exit the container pressing `Ctrl + C` (Similar to running an Express server). The `-d` flag ensures it runs in detached mode in the background so we can use the prompt immediately. |
| `docker attach <container-id>`<br>`docker attach <container-name>` | Attach to a running container and exit detached mode. |