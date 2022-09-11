# Docker Shell Commands

<!--prettier-ignore-->
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
| `docker stop [CONTAINER]` | Stop a running container |
| `docker stop -t <timeout> <container-id>`<br>`docker stop -t <timeout> <container-name>` | Stop a running container after a given timeout |
| `docker stop $(docker ps -a -q)` | Stop all running containers |
| `docker start [CONTAINER]` | Start a stopped container |
| `docker rm [CONTAINER]` | Remove a stopped container |
| `docker rm $(docker ps -a -q)` | Remove all stopped containers. The `-a` option lists all containers including stopped ones. The `-q` flag runs the quiet option, to provide only container numeric IDs, rather than a whole table of information about containers. |
| `docker rmi [IMAGE]` | Remove an image<br>Ensure that there are no running containers of that image. |
| `docker rmi [IMAGE] [...IMAGES]` | Remove multiple images |
| `docker rmi $(docker images -q)` | Remove all images. The `-q` flag returns the unique IDs |
| `docker run -d remote/simple-webserver` | Run a container from the ubuntu image. Since it is a webserver, the prompt will not be available unless we exit the container pressing `Ctrl + C` (Similar to running an Express server). The `-d` flag ensures it runs in detached mode in the background so we can use the prompt immediately. |
| `docker attach [CONTAINER]` | Attach to a running container and exit detached mode. |
| `docker exec -it [CONTAINER] [COMMAND] [ARGUMENT]` | Run a command on a Docker container |
| `docker cp [CONTAINER]:/usr/share/elasticsearch/path HOSTPATH` | Copy from a container to host |
| `docker cp HOSTPATH [CONTAINER]:/usr/share/elasticsearch/path` | Copy from a host to container |
