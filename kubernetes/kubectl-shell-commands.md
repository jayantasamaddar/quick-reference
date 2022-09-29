# Administration

| Command                                       | Function                                         |
| --------------------------------------------- | ------------------------------------------------ |
| `kubectl get all`                             | View all Kubernetes objects.                     |
| `kubectl get [RESOURCE]`                      | Show detailed description related to a Resource. |
| `kubectl describe [RESOURCE] [NAME]`          | Show detailed description related to a Resource. |
| `kubectl delete [RESOURCE] [NAME] [...NAMES]` | Delete Resource(s) with `NAME`                   |

---

# Nodes

| Command                     | Function                                       |
| --------------------------- | ---------------------------------------------- |
| `kubectl get nodes`         | Get list of nodes.                             |
| `kubectl get nodes -o wide` | Get list of nodes with additional information. |

---

# Pods

| Command                                        | Function                                       |
| ---------------------------------------------- | ---------------------------------------------- |
| `kubectl get pods`                             | Get list of pods.                              |
| `kubectl get pods -o wide`                     | Get list of pods with additional information.  |
| `kubectl describe pod [NAME]`                  | Show detailed description related to a Pod.    |
| `kubectl run [POD]`                            | Runs a Pod                                     |
| `kubectl run [POD NAME] --image=[IMAGE]:[TAG]` | Run a container in a Pod from an image.        |
| `kubectl create -f [FILE NAME]`                | Create a Kubernetes object from a config file  |
| `kubectl apply -f [FILE NAME]`                 | Apply a config file to a new or existing Pod   |
| `kubectl delete pod [NAME]`                    | Delete Pod with name, `NAME`                   |
| `kubectl edit pod [POD NAME]`                  | Edit the configuration of a running Pod        |
| `kubectl exec [POD NAME] -- printenv`          | List the Pod's container environment variables |

---

# Replica Sets and Replication Controllers

| Command                                          | Function                                        |
| ------------------------------------------------ | ----------------------------------------------- |
| `kubectl create -f [FILE NAME]`                  | Create a RS or RC from a config file.           |
| `kubectl get replicationcontrollers`             | Get list of Replication Controllers.            |
| `kubectl get replicationcontrollers -o wide`     | Get list of RCs with additional information.    |
| `kubectl get replicasets`                        | Get list of Replica Sets.                       |
| `kubectl get replicasets -o wide`                | Get list of RS with additional information.     |
| `kubectl describe replicaset [NAME]`             | Show detailed description for a Replica Set.    |
| `kubectl edit replicaset [NAME]`                 | Opens the Replica Set running configuration.    |
| `kubectl delete replicationcontroller [NAME]`    | Delete Replication Controller with name, `NAME` |
| `kubectl delete replicaset [NAME]`               | Delete Replica Set with name, `NAME`            |
| `kubectl replace -f [FILENAME]`                  | Update the definition file for a Replica Set.   |
| `kubectl scale --replicas=[COUNT] -f [FILENAME]` | Scale a Replica Set to `COUNT` using a file.    |
| `kubectl scale --replicas=[COUNT] [TYPE] [NAME]` | Scale a Replica Set, `NAME` to `COUNT`.         |

---

# Deployments

<!--prettier-ignore-->
| Command                                     | Function                                             |
| ------------------------------------------- | ---------------------------------------------------- |
| `kubectl create -f [FILE NAME]`             | Create a Deployment from a config file.              |
| `kubectl create -f [FILE NAME] --record`    | Create a Deployment and record the Change-Cause.     |
| `kubectl get deployments`                   | Get list of Deployments.                             |
| `kubectl get deployments -o wide`           | Get list of Deployments with additional information. |
| `kubectl apply -f [FILE NAME]`              | Apply a config file to a new or existing Deployment. |
| `kubectl set image deployment/[NAME] [CONTAINER NAME]=[IMAGE:TAG]` | Change the image file of an existing deployment. |
| `kubectl describe deployment [NAME]`        | Show detailed description for a Deployment.          |
| `kubectl edit deployment [NAME]`            | Opens the Deployment running configuration.          |
| `kubectl delete deployment [NAME]`          | Delete Deployment with name, `NAME`                  |
| `kubectl rollout status deployment/[NAME]`  | View the status of a deployment rollout.             |
| `kubectl rollout history deployment/[NAME]` | View revisions and history of a deployment rollout.  |
| `kubectl rollout undo deployment/[NAME]`    | Rollback a deployment operation.                     |

---

# Services

| Command                                     | Function                                           |
| ------------------------------------------- | -------------------------------------------------- |
| `kubectl create -f [FILE NAME]`             | Create the Service from a Service Definition File. |
| `kubectl create -f [FILE NAME] --record`    | Create a Service and record the Change-Cause.      |
| `kubectl get services` or `kubectl get svc` | Get list of Services and check status.             |
| `kubectl describe svc [NAME]`               | Show detailed description for a Service.           |
