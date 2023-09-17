# Administration

| Command                                                                    | Function                                                                          |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `kubectl explain [RESOURCE]`                                               | Get explanation about the Kubernetes resource                                     |
| `kubectl config view`                                                      | View Current KubeConfig                                                           |
| `kubectl config use-context [CONTEXT]`                                     | Change Current Context                                                            |
| `kubectl auth can-i [VERB] [RESOURCE] -n [NAMESPACE] --as [USER]`          | View if you can create, update, delete, update or patch a resource in a namespace |
| `kubectl proxy`                                                            | Start the Proxy server allowing to make requests to the `kube-apiserver`          |
| `kubectl api-resources --namespaced=[true false]`                          | View API resources, optionally select whether namespaced or not                   |
| `kubectl get all`                                                          | View all Kubernetes objects in the default namespace                              |
| `kubectl get [RESOURCE]`                                                   | Show basic details related to a Resource                                          |
| `kubectl get [RESOURCE] --selector [KEY]=[VALUE],...[KEY]=[VALUE]`         | Show basic details of a particular resource that is selected by ALL labels        |
| `kubectl get [RESOURCE] --selector [KEY]=[VALUE] --selector [KEY]=[VALUE]` | Show basic details of a particular resource that is selected by ANY one label     |
| `kubectl get [RESOURCE] -o wide`                                           | Get list of a particular resource with additional information.                    |
| `kubectl get [RESOURCE] [NAME] -o yaml`                                    | Show the detailed definition file of a specific resource in YAML                  |
| `kubectl get [RESOURCE] [NAME] -o json`                                    | Show the detailed definition file of a specific resource in JSON                  |
| `kubectl describe [RESOURCE] [NAME]`                                       | Show detailed description related to a Resource                                   |
| `kubectl delete [RESOURCE] [NAME] [...NAMES]`                              | Delete Resource(s) of a particular type                                           |

---

# Nodes

| Command                     | Function                                       |
| --------------------------- | ---------------------------------------------- |
| `kubectl get nodes`         | Get list of nodes.                             |
| `kubectl get nodes -o wide` | Get list of nodes with additional information. |

---

# Context

| Command                                                      | Function                        |
| ------------------------------------------------------------ | ------------------------------- |
| `kubectl config get-contexts`                                | Get the available kube contexts |
| `kubectl config set-context --current --namespace=NAMESPACE` | Set the current namespace.      |
| `kubectl config use-context [NAME]`                          | Change the current context      |

---

# Label

| Command                                                                | Function                                                                       |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `kubectl label pod -l KEY=VALUE NEW_KEY=NEW_VALUE`                     | Add a new Key and Value to all pods that match KEY=VALUE                       |
| `kubectl label pod -l "KEY in (VALUE1,VALUE2, ...)" NEW_KEY=NEW_VALUE` | Add a new Key and Value to all pods of the same key with the specified values. |

---

# Pods

| Command                                               | Function                                                                                |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `kubectl get pods`                                    | Get list of pods.                                                                       |
| `kubectl get pods -o wide`                            | Get list of pods with additional information.                                           |
| `kubectl get pods -l KEY=VALUE`                       | Get list of pods with certain labels.                                                   |
| `kubectl get pods --show-labels`                      | Get list of pods with their labels displayed.                                           |
| `kubectl describe pod [NAME]`                         | Show detailed description related to a Pod.                                             |
| `kubectl run [POD]`                                   | Runs a Pod                                                                              |
| `kubectl run [POD NAME] --image=[IMAGE]:[TAG]`        | Run a container in a Pod from an image.                                                 |
| `kubectl create -f [FILE NAME]`                       | Create a Kubernetes object from a config file                                           |
| `kubectl apply -f [FILE NAME]`                        | Apply a config file to a new or existing Pod                                            |
| `kubectl delete pod [NAME]`                           | Delete Pod with name, `NAME`                                                            |
| `kubectl edit pod [POD NAME]`                         | Edit the configuration of a running Pod                                                 |
| `kubectl exec [POD-NAME] --printenv`                  | List the Pod's container environment variables (single container Pod)                   |
| `kubectl exec [POD-NAME] [CONTAINER-NAME] --printenv` | List the Pod's container environment variables (multi-container Pod)                    |
| `kubectl log [POD-NAME]`                              | Displays the logs of the container of a single-container Pod                            |
| `kubectl log [POD-NAME] [CONTAINER-NAME]`             | Displays the logs of a particular container in a multi-container Pod on the stdout      |
| `kubectl log -f [POD-NAME] [CONTAINER-NAME]`          | Displays the live logs of a particular container in a multi-container Pod on the stdout |

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

| Command                                                                     | Function                                                                         |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `kubectl create deployment --image=[IMAGE:TAG] --replicas=[NUMBER]`         | Create a deployment using the imperative method.                                 |
| `kubectl create -f [FILE NAME]`                                             | Create a Deployment from a config file.                                          |
| `kubectl create -f [FILE NAME] --record`                                    | Create a Deployment and record the Change-Cause.                                 |
| `kubectl get deployments`                                                   | Get list of Deployments.                                                         |
| `kubectl get deployments -o wide`                                           | Get list of Deployments with additional information.                             |
| `kubectl apply -f [FILE NAME]`                                              | Apply a config file to a new or existing Deployment.                             |
| `kubectl set image deployment [NAME] [CONTAINER NAME]=[IMAGE:TAG]`          | Change the image file of an existing deployment.                                 |
| `kubectl set image deployment [NAME] [CONTAINER NAME]=[IMAGE:TAG] --record` | Save the command used to create/update a deployment against the revision number. |
| `kubectl describe deployment [NAME]`                                        | Show detailed description for a Deployment.                                      |
| `kubectl edit deployment [NAME]`                                            | Opens the Deployment running configuration.                                      |
| `kubectl delete deployment [NAME]`                                          | Delete Deployment with name, `NAME`                                              |
| `kubectl rollout status deployment [NAME]`                                  | View the status of a deployment rollout.                                         |
| `kubectl rollout history deployment [NAME]`                                 | View revisions and history of a deployment rollout.                              |
| `kubectl rollout history deployment [NAME] --revision=[VERSION]`            | Check the status of a specific revision of a deployment rollout.                 |
| `kubectl rollout undo deployment [NAME]`                                    | Rollback a deployment operation to its previous version.                         |
| `kubectl rollout undo deployment nginx --to-revision=[VERSION]`             | Rollback a deployment operation to a specific version                            |

---

# Services

| Command                                     | Function                                           |
| ------------------------------------------- | -------------------------------------------------- |
| `kubectl create -f [FILE NAME]`             | Create the Service from a Service Definition File. |
| `kubectl create -f [FILE NAME] --record`    | Create a Service and record the Change-Cause.      |
| `kubectl get services` or `kubectl get svc` | Get list of Services and check status.             |
| `kubectl describe svc [NAME]`               | Show detailed description for a Service.           |

# Namespaces

| Command                                                                       | Function                         |
| ----------------------------------------------------------------------------- | -------------------------------- |
| `kubectl create namespace [NAME]` or `kubectl create ns [NAME]`               | Create a namespace               |
| `kubectl config set-context $(kubectl config current-context) -n [NAMESPACE]` | Change default namespace.        |
| `kubectl get [RESOURCE] --all-namespaces` or `kubectl get [RESOURCE] -A`      | View Resources in all namespaces |

# Ingress

| Command                                                                       | Function                                           |
| ----------------------------------------------------------------------------- | -------------------------------------------------- |
| `kubectl create ingress [INGRESS_NAME] --rule=[HOST]/[PATH]=[SERVICE]:[PORT]` | Create the Service from a Service Definition File. |
| `kubectl create -f [FILE NAME] --record`                                      | Create a Service and record the Change-Cause.      |
| `kubectl get services` or `kubectl get svc`                                   | Get list of Services and check status.             |
| `kubectl describe svc [NAME]`                                                 | Show detailed description for a Service.           |

# Jobs

| Command                                                                                            | Function                                  |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `kubectl create job [NAME] --image=[IMAGE] --from=[cronjob/name] -- [COMMAND] [args...] [options]` | Create a Job (optionally from a Cron Job) |
| `kubectl delete job [NAME]`                                                                        | Delete a Job                              |

# Volumes

| Command                                             | Function                                         |
| --------------------------------------------------- | ------------------------------------------------ |
| `kubectl get persistentvolumes` or `kubectl get pv` | Get list of Persistent Volumes and check status. |
| `kubectl get storageclasses` or `kubectl get sc`    | Get list of Storage Classes and check status.    |

# Convert

<!--prettier-ignore-->
| Command                                                                                    | Function                                                                 |
| -------------------------------------------------------------------------------------------| ------------------------------------------------------------------------ |
| `kubectl convert -f nginx-deployment.yaml --output-version=apps/v1 | kubectl create -f -`  | Convert the version of a Kubernetes object definition file and create it |

# Helm

| Command                  | Function                                             |
| ------------------------ | ---------------------------------------------------- |
| `helm search hub [NAME]` | Search Helm default repository hub for a helm chart. |
