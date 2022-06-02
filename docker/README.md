# What is Docker?

**Docker** is a platform for building, running and shipping applications in a consistent manner the same way it does in development.

---

# Why Docker?

### Solving the "But it runs on my machine" problem

Sometimes a situation may arise where the application runs on the local development machine but doesn't run on another machine or the production machine. There are three reasons why this may happen:

- One or more files are not included as part of deployment, i.e. the app is not completely/correctly deployed.
- Software version mismatch on current and target machine. Let's say your application requires Node v16, but target machine is running Node v9.
- Different configuration settings, for e.g. different environment variables.

This is where Docker comes to the rescue. With Docker, we can easily package our application with everything it needs to run it anywhere, on any machine with Docker. So if it runs on the development machine, it will also run on the test and production machines.

### Plug and play for a new Team Member

If someone joins your team, they don't have to spend half-a-day setting up a new machine to run the application. With Docker they don't have to run and configure all the dependencies.

They simply tell Docker to compose up the application using **`docker-compose up`**, and Docker automatically downloads and run these depedencies inside an isolated environment called a **`container`**. This is the beauty of Docker that it allows isolated containers containing Docker applications, running different versions of the software side-by-side on the same machine without messing with each other.

### Removing applications and their dependencies from local machines without breaking other applications

When we don't want to work with an application anymore and want to remove it and all it's dependencies in one go. 

**Without Docker**, as we work on different projects, our development machine gets cluttered with many libraries and tools, used by different applications. After a while, we don't know if we can remove one or more of these tools because we are afraid it would break some other application. This is also true for updating, for e.g. updating Nodejs, might break older versions running a lower version of Nodejs which would lose support in the new update. Since Nodejs is installed globally, this might cause some apps to not run anymore.

**With Docker**, we won't have to worry about this because each application runs with its dependencies in its own isolated container. We can simply remove an application and all its dependencies with a simple command - **`docker-compose down --rmi all`**

---

# Virtual Machines vs Containers

A **Virtual Machine** is an abstraction of a machine (physical hardware). We can run several virtual machines on a real, physical machine. For e.g. we can have one Mac machine and run two virtual machines - one running Windows, one running Linux. We do this by using a tool called Hypervisor. 

A **Hypervisor** is a software we used to create and manage virtual machines. There are many Hypervisor's out there like VirtualBox or VMWare (cross-platform) and Hyper-v (Windows only).

A **Container** is an isolated environment for running an application.

The difference between Virtual Machines and Containers are as follows: 

| Virtual Machine | Container |
| --------------- | --------- |
| Allow running multiple applications in isolation. | Allow running multiple applications in isolation. |
| Each Virtual Machine needs a full-blown OS that needs to be licensed, patched and monitored. | Containers share the OS of the host, thus only one OS needs to be licensed, patched and monitored. Technically it shares the kernel of the host |
| Virtual Machines run only on a physical machine. | Container can run on a machine or a virtual machine. |
| Virtual Machines are slow to start as the entire OS has to be loaded just like any computer. | Containers are faster to start as they only load the application, usually in second(s) |
| Virtual Machines are resource intensive because each Virtual Machine takes up actual CPU resources like CPU, memory and disk space. Since each virtual machine requires CPU resources allocated specifically to it, we can only run a finite number of Virtual Machine on a single machine. | Containers are lightweight and less resource intensive as they do not require a full-blown OS. A single host can run tens or hundreds of containers. |

---

# Architecture of Docker

Docker uses a Client-Server architecture, where the client component takes to the server component using a RESTful API. The server also called the **Docker Engine** sits on the background and takes care of building and running Docker containers.

![Docker Architecture](images/DockerArchitecture.png)

Technically a Container is just a process that runs on your computer just like other processes but it's a special type of a process, that will be discussed below.

![Docker Container Process](images/DockerContainerProcess.png)

As discussed earlier, 
Containers share the OS of the host, more technically it shares the kernel of the host.

A **Kernel** is the core of an OS. A kernel is the code that runs on the CPU responsible for managing applications and hardware resources. These kernels have different APIs, that's why a Windows application on a Linux or a Mac because under the hood, the application is to talk to the kernel of the OS.
> On a Linux machine we can only run Linux containers.
> On a Windows machine, Windows 10 and above, we can run both Windows and Linux containers, because Windows 10 ships with a custom built Linux kernel in addition to the Windows kernel.
> MacOS has it's own kernel which is different from Windows and Linux kernels. This kernel doesn't have native support for containerized applications. So Docker on Mac, uses a lightweight Virtual Machine to run Linux containers.

---

# Installing Docker

Docker has two products. The main core product - **[Docker Engine](https://docs.docker.com/engine/)** and **[Docker Desktop](https://docs.docker.com/desktop/)**. The Docker Desktop is a Graphical User Interface for Docker Engine and requires setting up a virtual machine to run it which is a bit of a pain. The only  thing we need to do is to install the Docker Engine and have access to all the features via the terminal.

Once we have installed Docker, we can check the version of the Docker Engine by running the following command:

```
sudo docker version
```

---

# Development Workflow

The main idea is to take an application and "Dockerize" it, i.e. allow it to be run by Docker. We do this by adding a Docker file.

A **Docker File** is a plaintext file that tells Docker how to package the application into an image. This image contains everything needed to run the application.

![Docker File](images/DockerWorkflow_DockerFile.png)

A Docker image typically contains:- 

- A stripped down version of the OS.
- A runtime environment (e.g. Node).
- Application files
- Third-party libraries
- Environment variables, and so on.

Once we have an image, we ask Docker to start a container using that image. A container as discussed earlier, is a process, but it is a special kind of process because it has its own File System that is provided by the image. So, our application gets loaded inside a container or process.

This is how we run our application locally on our development machine: Instead of running the application directly and running it inside a typical process, we tell Docker to run it inside a container - an isolated environment.

```
docker run ...
```

The beauty of Docker is that once we have the image we can push it to a Docker registry like Docker Hub. 

**Docker Hub** to Docker is like Github to Git - it's a storage for Docker images that anyone can use.

Once our application is on Docker Hub, we can run it on any machine that has Docker installed. This way, the same version at development can also be used at production.

Thus, with Docker, we no longer need to maintain long, complex release documents, that need to be precisely followed. 

To **summarize** the development workflow, we have the following steps:

- All the instructions for building an image of an application is written in a Docker File.
- With the Docker file we can package our application into an Image.
- This Image is pushed to a Docker registry like Docker Hunb and can be downloaded and ran virtually anywhere.

---

# Docker in Action

