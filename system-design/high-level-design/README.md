# System Design

- Low Level Design
- High Level Design
- Design Schema (Database Design)
- Project Development

# Introduction to High Level Design

## Building Blocks of High-Level Design

**Client** - Sends the first request to a DNS
**DNS** - DNS Server is a kind of a Router, a Hash Table that contains the Domain ID and IP Address. It routes the DomainID.

---

# Stateful Services vs Stateless Services

<!--prettier-ignore-->
| Stateful | Stateless |
| -------- | --------- |
| When the response to a request is the same, irrespective of the machine the request is sent to. | When the response to a request is different, when the request is sent to different machines. |

# Scaling

We can scale using two methods:

**Vertical Scaling**
Increase the limits of the existing hardware.

Cons:

- Gets maxed out after a point.
- Downtime of the machine

**Horizontal Scaling**
Add another machine (more resources) and treat them as nodes in a cluster.

Pros:

- As the storage requirement changes, machines can be added or removed.
- Uses a Load Balancer to distribute load and route traffic to the right server.

---

# Load Balancer

A Load Balancer acts as a router that routes the traffic to the right server in a Horizontal Distributed System.

- A load balancer has to be fast so that it doesn't add to the latency.
- Due to the speed considerations, a load balancer cannot store data in a hard disk. We have to store it in RAM. Hence, it cannot store a lot of data.

### Routing Requests

The methods used for Routing are as follows:

#### Round Robin

Round Robin is a way the Load Balancer routes the request alternatively between the available machines.
It simply has to know how many machines are available and what was the last machine the request was sent to.

**Challenges**

1. Cannot detect if a machine is down

Every nth request that goes to that machine won't get a response.
Hence, a heartbeat test or ping test must be done before a request is sent.
It creates a hash table internally that looks like:

<!--prettier-ignore-->
| Machine | Status  |
| ------- | ------- |
| M1      | online  |
| M2      | offline |
| M3      | online  |
| M4      | online  |
| M5      | online  |

**What happens when load balancer goes down?**

Zoo Keeper ensures that load balancer has backups and props up a backup load balancer if one goes down.

2. Some responses can take more time

If one machine is overloaded, the response time maybe slow. What can we do?

- Least Response Time
- Weighted Round Robin

##### Least Response Time

This is calculated as the average of the last 10 response times.

Priority is given to the machine with the least response time.

##### Weighted Round Robin

Based on some metrics a weight is given to a machine. Then based on weight the load balancer chooses to send the request to the particular machine.

For e.g. a Weight maybe calculated

Round Robin will only work for Stateless services and not Stateful services.

#### HashMap

A hashmap approach may look like this:

| ID  | Machine |
| --- | ------- |
| id1 | M1      |
| id2 | M2      |
| id3 | M3      |
| id4 | M3      |
| id5 | M4      |

**Cons:** Takes too much memory

Thus, this is not a good approach.

#### Range of Data

Let's say there are `n` number of data.

We can divide it into machines on the basis of range.

**Cons:**

- It's very hard to guess the optimal value of `n`. Exponential growth of data.
- More traffic on older servers due to older users having more data. Uneven distribution of load.

Thus, this is not a good approach.

#### Normalization

Normalization method is a basic hash function using modulo. Let's say there are `n` number of servers.

Number of servers: 5

**Cons:**

- As new servers are added, the mapping has to be done again.

Thus, this is not a good approach.

---

#### Consistent Hashing

There is a Hash Function. We pass the UserID.

This hash function distributes this userID between [0, 10^21].

This hash function also distributes the serverID between [0, 10^21].

What consistent hashing says is, every user will be assigned to the first server in the clockwise direction.

**Disadvantages:**

- When a server goes down, say S2, the requests go to the next server. The load is doubled. There are high chances that S3 will also go down because it cannot handle S2's traffic. This is called **Cascading Failures**.
- When a new server is added, it only takes traffic from one machine (the last one).

To overcome these two advantages, **Modified Consistent Hashing** is used in Load Balancers for Stateful Services.

---

#### Modified Consistent Hashing - The State-of-the-Art Approach for Stateful Services

There is a Hash Function. We pass the UserID.

This hash function distributes this userID between [0, 10^21] just like Consistent Hashing.

However, in case of servers, there are multiple hash functions instead of just one.

H1, H2, H3,...Hn - There are multiple hash functions through which each server ID will go through.

All of these different hash functions (different logic) will distribute ServerID between [0. 10^21].

This eliminates Cascading Failures and the problem of adding new servers.

What happens to the data when server gets down?

Replicas

Active and Passive Replicas

---
