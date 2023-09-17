# Certification Exams

1. Certified Kubernetes Application Developer (CKAD): **`19`** Questions, **`120`** minutes. (Approx 6 minutes per question.)

## CKAD: Curriculum

1. **Application Design and Build - `20%`**

   - [x] Define build and modify container images
   - [x] Understand Jobs and Cron Jobs
   - [x] Understand multi-container pod design pattern (e.g. Sidecar, init and others)
   - [x] Utilize Persistent and Ephemeral volumes

2. **Application Development - `20%`**

   - [x] Use Kubernetes Primitves to implement common deployment strategies (e.g. Blue/Green or Canary)
   - [x] Understand Deployments and how to perform rolling updates
   - [ ] Use the Helm package manager to deploy existing packages

3. **Application Observability and Maintenance - `15%`**

   - [x] Understand API deprecations
   - [x] Implement Probes and Health Checks
   - [x] Use provided tools to monitor Kubernetes applications
   - [x] Utilize container logs
   - [x] Debugging in Kubernetes

4. **Application Environment, Configuration and Security - `25%`**

   - [x] Discover and use resources that extend Kubernetes (CRD)
   - [x] Understand authentication, authorization and admission control
   - [x] Understanding and defining resource requirements, limits and quotas
   - [x] Understand ConfigMaps
   - [x] Create and consume Secrets
   - [x] Understand ServiceAccounts
   - [x] Understand SecurityContexts

5. **Services and Networking - `20%`**

   - [x] Demonstrate basic understanding of Network Policies
   - [x] Provide and troubleshoot access to applications via services
   - [x] Use ingress rules to expose applications

---

## CKAD: Kubernetes Resources to Master

- [x] `Pods`
  - [x] `Volumes`
  - [x] `initContainers`
  - [x] `Taints and Tolerations`
  - [x] `NodeSelector`
  - [x] `NodeAffinity`
  - [x] `Readiness Probe`: Indicates when a pod is ready to start receiving network traffic.
  - [x] `Liveness Probe`: Checks whether a pod is still alive and operational. If the liveness probe fails, Kubernetes will attempt to restart the container.
  - [x] `Startup Probe`: Similar to the readiness probe, specifically designed to determine when a container has finished its startup process and has become ready.
  - [x] `securityContext`
- [x] `Replication Controllers`
- [x] `ReplicaSets`
- [x] `Deployments`
- [x] `Services`
- [x] `ConfigMaps`
- [x] `Secrets`
- [x] `ResourceQuotas`: Set maximum limits on the overall resource consumption, at the namespace level
- [x] `LimitRanges`: Constraints resource requests and limits for individual resources, at the namespace level
- [x] `NetworkPolicies`
- [x] `IngressController`
- [x] `Ingress`
- [x] `Jobs`: Run an application/Pod only once for a certain amount of completions after which it will automatically take the pod down.
- [x] `CronJobs`: Run an application/Pod only once for a certain amount of completions after which it will automatically take the pod down, ON A SCHEDULE.
- [x] `PersistentVolumes`: Global resource that lets you centrally manage storage by creating a pool of storage which can then be assigned to individual pods
- [x] `PersistentVolumeClaims`
- [x] `StorageClasses`: Define, a provisioner such as Google Storage, that can automatically provision storage on Google Cloud and attach that to pods, when a claim is made.
- [x] `Namespaces`
- [x] `ServiceAccounts`
- [x] `Roles`
- [x] `RoleBindings`
- [x] `ClusterRoles`
- [x] `ClusterRoleBindings`
- [x] `CustomResourceDefinition`

--

## [CKAD: Environment](https://docs.linuxfoundation.org/tc-docs/certification/tips-cka-and-ckad#cka-and-ckad-environment)

- Each task on this exam must be completed on a designated cluster/configuration context.
- An infobox at the start of each task provides you with the cluster name/context information.
- Nodes making up each cluster can be reached via ssh, using a command such as the following: ssh <nodename>
- NOTE: You must return to the base node (hostname node-1) after completing each task.
- Nested-ssh is not supported.
- You can assume elevated privileges on any node by issuing the following command: `sudo -i`
- You can also use sudo to execute commands with elevated privileges at any time
- You can use kubectl and the appropriate context to work on any cluster from the base node. When connected to a cluster member via ssh, you will only be able to work on - that particular cluster via kubectl.
- For your convenience, all environments, in other words, the base system and the cluster nodes, have the following additional command-line tools pre-installed and - pre-configured:
- `kubectl` with `k` alias and Bash autocompletion
- `jq` for YAML/JSON processing
- `tmux` for terminal multiplexing
- `curl` and `wget` for testing web services
- `man` and man pages for further documentation
- Further instructions for connecting to cluster nodes will be provided in the appropriate tasks
- Where no explicit namespace is specified, the default namespace should be acted upon.
- If you need to destroy/recreate a resource to perform a certain task, it is your responsibility to back up the resource definition appropriately prior to destroying the - resource.
- The CKA & CKAD environments are currently running etcd v3.5.
- The CKA environment is currently running Kubernetes v1.27.
- The CKAD environment is currently running Kubernetes v1.27.
- The CKA, CKS and CKAD exam environment will be aligned with the most recent K8s minor version within approximately 4 to 8 weeks of the K8s release date.

---

## CKAD: Exam Instructions

- The exams are delivered online and consist of performance-based tasks (problems) to be solved on the command line running Linux.
- The exams consist of 15-20 performance-based tasks.
- Candidates have 2 hours to complete the CKA and CKAD exam.
- The exams are proctored remotely via streaming audio, video, and screen sharing feeds.
- Results will be emailed 24 hours from the time that the exam is completed.

Apart from this there are some other Instructions

Exam Technical Instructions

- Root privileges can be obtained by running 'sudo −i'.
- You must NOT reboot the base node (hostname node-1). Rebooting the base node will NOT restart your exam environment.
- Do not stop or tamper with the certerminal process as this will END YOUR EXAM SESSION.
- Do not block incoming ports 8080/tcp, 4505/tcp and 4506/tcp. This includes firewall rules that are found within the distribution's default firewall configuration files - as well as interactive firewall commands.
- Use Ctrl+Alt+W instead of Ctrl+W.
- 5.1 Ctrl+W is a keyboard shortcut that will close the current tab in Google Chrome.
- The Terminal (Terminal Emulator Application) is a Linux Terminal; to copy & paste within the Linux Terminal you need to use LINUX shortcuts:
- Copy = Ctrl+SHIFT+C (inside the terminal)
- Paste = Ctrl+SHIFT+V (inside the terminal)
- OR Use the Right Click Context Menu and select Copy or Paste
- For security reasons, the INSERT key is prohibited within the Remote Desktop.
- Candidates can Type i to switch into insert mode so that you can start editing the file.
- Once you're done, press the escape key Esc to get out of insert mode and back to command mode.
- Installation of services and applications included in this exam may require modification of system security policies to successfully complete.

---

## CKAD: Resources Allowed

The following tools and resources are allowed during the exam as long as they are used by candidates to work independently on exam tasks (i.e. not used for 3rd party assistance or research) and are accessed from within the Linux server terminal on which the Exam is delivered.
During the exam, candidates may:

- review the Exam content instructions that are presented in the command line terminal.
- review Documents installed by the distribution (i.e. /usr/share and its subdirectories)
- use Packages that are part of the distribution (may also be installed by Candidate if not available by default)
- use the browser within the VM to access the following documentation: https://kubernetes.io/docs/, https://kubernetes.io/blog/ and their subdomains. This includes all available language translations of these pages (e.g. https://kubernetes.- io/zh/docs/)
- CKAD ONLY: candidates can use the browser within the VM to access https://helm.sh/docs
- use the search function provided on https://kubernetes.io/docs/ however, they may only open search results that have a domain matching the sites listed above

---

## CKAD: Tips

1. Questions are a mix of easy, medium and hard difficulty.
2. Attempt all questions. You don't have to get all right to pass the exam.
3. You can attempt questions in any order.
4. Not get stuck on any question, even if it is a simple one. If stuck, skip the question and come back to it later. Save the troubleshooting for the end after all questions have been attempted. If the question is hard and needs additional reading to solve, mark it down for solving later and go over to the next. The next one looks a bit difficult, but you think you can figure it out, so give it a try. The first attempt, it fails. You know what the issue is, so you try to fix it. The second attempt, it fails again and you don't know what the issue is. Don't spend any more time on it, as there are many easy questions waiting ahead. Mark it down for review later, and go over to the next.
5. Be very good with YAML. If for each question, you're having to go through each line of your YAML file and fix the indentation errors, you're not going to be able to make it through all questions. You shouldn't have to do that.
6. Use shortcuts and aliases. (`kubectl api-resources` to check aliases). `alias k=kubectl` allows using `k` instead of `kubectl`.

---

# CKAD: Giving the Exam

## Pre-Setup

```yaml
alias nano="nano -cmilET2"                                     # nano file, will open a new file in the nano editor with indentation, line numbers, etc.
export KUBE_EDITOR="nano -cmilET2"                             # Ensure kubectl edit will open the nano editor with indentation, line numbers, etc.
alias k=kubectl                                                # will already be pre-configured
alias ka="kubectl apply -f"                                    # ka pod.yaml
alias kn="kubectl config set-context --current --namespace"    # kc namespace
alias kd="kubectl describe"                                    # kd pod pod1
alias ke="kubectl explain"                                     # ke pods.spec.containers.readinessProbe
export do="--dry-run=client -o yaml"                           # k create deploy nginx --image=nginx $do > nginx.yaml
export now="--force --grace-period 0"                          # k delete pod x $now
```

---

# References

- [Curriculum](https://github.com/cncf/curriculum/tree/master)
- [https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/)
