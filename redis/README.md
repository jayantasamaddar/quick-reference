# Table of Contents

- [Table of Contents](#table-of-contents)
- [What is Redis?](#what-is-redis)
- [Advantages](#advantages)
- [Multi-Model Database](#multi-model-database)
- [Core Architecture](#core-architecture)
- [Setup and Installation](#setup-and-installation)
  - [Setup using Docker](#setup-using-docker)
  - [Setup in Linux](#setup-in-linux)
- [Security & Configuration](#security--configuration)
  - [Add a Password without an Username](#add-a-password-without-an-username)
  - [Access Control List (`ACL`)](#access-control-list-acl)
    - [ACL Commands](#acl-commands)
  - [`AUTH` - Access Password protected Redis](#auth---access-password-protected-redis)
- [Data Types](#data-types)
  - [Strings](#strings)
    - [Overview](#overview)
    - [String Commands](#string-commands)
  - [Lists](#lists)
    - [List Commands](#list-commands)
  - [Sets](#sets)
  - [Sorted Sets](#sorted-sets)
  - [HyperLogLog](#hyperloglog)
  - [Hashes](#hashes)
  - [Streams](#streams)
- [Transactions](#transactions)
- [Pub-Sub](#pub-sub)
- [Commands](#commands)
  - [String Commands](#string-commands-1)
    - [`SET`](#set)
    - [`GET`](#get)
    - [`GETRANGE`](#getrange)
    - [`MSET`](#mset)
    - [`MGET`](#mget)
    - [`STRLEN`](#strlen)
    - [`INCR`](#incr)
    - [`INCRBY`](#incrby)
    - [`INCRBYFLOAT`](#incrbyfloat)
    - [`DECR`](#decr)
    - [`DECRBY`](#decrby)
  - [List Commands](#list-commands-1)
    - [`LPUSH`](#lpush)
    - [`LPUSHX`](#lpushx)
    - [`RPUSH`](#rpush)
    - [`RPUSHX`](#rpushx)
    - [`LRANGE`](#lrange)
    - [`LLEN`](#llen)
    - [`LPOP`](#lpop)
    - [`RPOP`](#rpop)
    - [`LSET`](#lset)
    - [`LINSERT`](#linsert)
    - [`LINDEX`](#lindex)
    - [`LTRIM`](#ltrim)
    - [`LREM`](#lrem)
    - [`BLPOP`](#blpop)
      - [Overview](#overview-1)
      - [Non-Blocking Behaviour](#non-blocking-behaviour)
      - [Blocking Behaviour](#blocking-behaviour)
      - [Examples](#examples)
  - [Set Commands](#set-commands)
    - [`SADD`](#sadd)
    - [SMEMBERS](#smembers)
    - [`SCARD`](#scard)
    - [`SISMEMBER`](#sismember)
    - [`SDIFF`](#sdiff)
    - [`SDIFFSTORE`](#sdiffstore)
    - [`SINTER`](#sinter)
    - [`SINTERSTORE`](#sinterstore)
    - [`SUNION`](#sunion)
    - [`SUNIONSTORE`](#sunionstore)
  - [Sorted Set Commands](#sorted-set-commands)
    - [`ZADD`](#zadd)
    - [`ZRANGE`](#zrange)
      - [Index Ranges](#index-ranges)
      - [Score Ranges](#score-ranges)
    - [`ZCARD`](#zcard)
    - [`ZCOUNT`](#zcount)
    - [`ZREM`](#zrem)
    - [`ZRANK`](#zrank)
    - [`ZREVRANK`](#zrevrank)
    - [`ZSCORE`](#zscore)
    - [`ZINCRBY`](#zincrby)
    - [`ZREMRANGEBYSCORE`](#zremrangebyscore)
    - [`ZREMRANGEBYRANK`](#zremrangebyrank)
  - [HyperLogLog Commands](#hyperloglog-commands)
    - [`PFADD`](#pfadd)
    - [`PFCOUNT`](#pfcount)
    - [`PFMERGE`](#pfmerge)
  - [Hash Commands](#hash-commands)
    - [`HSET`](#hset)
    - [`HSETNX`](#hsetnx)
    - [`HKEYS`](#hkeys)
    - [`HVALS`](#hvals)
    - [`HGET`](#hget)
    - [`HGETALL`](#hgetall)
    - [`HEXISTS`](#hexists)
    - [`HLEN`](#hlen)
    - [`HSTRLEN`](#hstrlen)
    - [`HINCRBY`](#hincrby)
    - [`HINCRBYFLOAT`](#hincrbyfloat)
    - [`HDEL`](#hdel)
  - [Transaction Commands](#transaction-commands)
    - [`MULTI`](#multi)
    - [`EXEC`](#exec)
    - [`DISCARD`](#discard)
    - [`WATCH`](#watch)
    - [`UNWATCH`](#unwatch)
  - [PUB/SUB Commands](#pubsub-commands)
    - [`PUBLISH`](#publish)
    - [`SUBSCRIBE`](#subscribe)
    - [`PSUBSCRIBE`](#psubscribe)
    - [`PUBSUB CHANNELS`](#pubsub-channels)
    - [`PUBSUB NUMSUB`](#pubsub-numsub)
    - [`PUBSUB NUMPAT`](#pubsub-numpat)
    - [`UNSUBSCRIBE`](#unsubscribe)
  - [Universal Commands](#universal-commands)
    - [`KEYS`](#keys)
    - [`DEL`](#del)
    - [`EXPIRE` / `PEXPIRE`](#expire--pexpire)
    - [`EXPIREAT` / `PEXPIREAT`](#expireat--pexpireat)
    - [`EXPIRETIME`](#expiretime)
    - [`PERSIST`](#persist)
    - [`TTL` and `PTTL`](#ttl-and-pttl)
    - [SORT](#sort)
  - [Server Management Commands](#server-management-commands)
    - [`FLUSHDB`](#flushdb)
    - [`FLUSHALL`](#flushall)
- [Data Persistence and Recovery](#data-persistence-and-recovery)
  - [RDB](#rdb)
    - [Advantages of RDB](#advantages-of-rdb)
    - [Disadvantages of RDB](#disadvantages-of-rdb)
  - [AOF](#aof)
    - [Advantages of AOF](#advantages-of-aof)
    - [Disadvantages of AOF](#disadvantages-of-aof)
  - [Durability and Recovery](#durability-and-recovery)
- [Optimizing Memory Costs with Redis on Flash](#optimizing-memory-costs-with-redis-on-flash)
- [Scaling Redis](#scaling-redis)
  - [Clustering](#clustering)
  - [Sharding](#sharding)
- [High Availability across Geo-locations](#high-availability-across-geo-locations)
  - [Problem](#problem)
  - [Solution](#solution)
  - [Data Integrity and Consistency](#data-integrity-and-consistency)
- [Running Redis on Kubernetes](#running-redis-on-kubernetes)

# What is Redis?

Redis which stands for Remote Dictionary Server, is an open source (BSD licensed), in-memory **data structure store** used as a NoSQL database, cache, message broker, and streaming engine.

Following the footsteps of other NoSQL Databases like Cassandra, CouchDB and MongoDB, Redis allows the user to store vast amounts of data without the limits of relational databases.

---

# Advantages

The advantages of Redis are:

1. **Extremely Fast** - Redis stores the whole dataset in primary memory, hence is very fast and can perform 110000 SETs per second, about 81000 GETs per second. It supports pipelining of commands and getting and setting multiple values in a single command to speed up communications with the client libraries.

2. **Persistence** - While all the data lives in memory, changes are asynchronously saved on disk using flexible policies based on **_elapsed time_** and **_number of updates since last save_**.

3. **Rich Support of Data Types** - Redis supports most of the data types that developers already know such as:

- [String](https://redis.io/docs/data-types/strings/)
- [Hashes](https://redis.io/docs/data-types/hashes/)
- [Lists](https://redis.io/docs/data-types/lists/)
- [Sets](https://redis.io/docs/data-types/lists/)
- [Sorted Sets](https://redis.io/docs/data-types/sorted-sets/)
- [Bitmaps](https://redis.io/docs/data-types/bitmaps/)
- [HyperLogLogs](https://redis.io/docs/data-types/hyperloglogs/)
- [Geospatial Indexes](https://redis.io/docs/data-types/geospatial/)
- [Streams](https://redis.io/docs/data-types/streams/)

4. **Atomicity** - All Redis operations are atomic, which ensures that if two clients concurrently access, Redis server will receive the updated value.

5. **Multi-utility Tool** - The competitive advantage of Redis is that it provides multi-utility tools that can be used in a number of use cases such as caching, messaging queues, any short-lived data in your application such as web application sessions, web-page hit counts etc.

---

# Multi-Model Database

First of all, how does Redis support multiple data formats in a single database. The way it works is, we have Redis Core, which is a key-value store that supports storing multiple data types:

- Strings
- Lists
- Sets
- Sorted Sets
- Hashes
- HyperLogLog
- Bitmaps
- Bit Field
- Geospatial

The Redis Core can be extended with Redis Modules for different data structures that your application needs for different purposes. For example, Redis Search for Full Text Search functionality like Elasticsearch, or RedisGraph for Graph Data storage, Redis TimeSeries for relational data and RedisJSON for storing documents.

The great thing about this is, that Redis Modules are well, modular, i.e. they are not tightly integrated into one database. You can pick and choose which data service functionality you need for your application.

When using Redis as a primary database, Redis being an in-memory data store provides out-of-the-box cache. This reduces complexity in eliminating the need to implement a caching layer separately.

An in-memory database means Redis is super fast making applications blazing fast. This also means running application tests are way faster because Redis doesn't need a schema like other databases. So time to run tests is fast and simple.

---

# Core Architecture

There are two main processes in Redis Core architecture:

1. Redis Console Client
2. Redis Server

This client and server can be on the same computer or on two different computers. Redis can also be configured as a Master-Slave configuration for distributed systems.

---

# Setup and Installation

## [Setup using Docker](https://redis.io/docs/stack/get-started/install/docker/)

- [Download Redis Image from Docker Hub](https://hub.docker.com/_/redis)
- Start a Redis Instance - `docker run --name some-redis -p [containerPort:6379] -d redis`
- Connecting via redis-cli - `docker exec -it some-redis redis-cli`
- For other options, check the Docker Hub page above.

## [Setup in Linux](https://redis.io/docs/stack/get-started/install/linux/)

- Update the package manager - `sudo apt update`
- Install Redis Server - `sudo apt install redis-server`
- Start Redis Server as a background process - `redis-server &`
- Enter Redis CLI to use Redis - `redis-cli`

---

# Security & Configuration

## Add a Password without an Username

By default, Redis loads an user `default` with all access, hence, it is possible to set a password without an initial Username. By doing so, it sets the password for the `default` user.

**Using Docker:**

```s
docker run --name redis01 -d -p 6379:6379 redis redis-server --requirepass [password]
```

---

## Access Control List (`ACL`)

The Redis **`ACL`**, short for **Access Control List**, is the feature that allows certain connections to be limited in terms of the commands that can be executed and the keys that can be accessed. The way it works is that, after connecting, a client is required to provide a username and a valid password to authenticate. If authentication succeeded, the connection is associated with a given user and the limits the user has. Redis can be configured so that new connections are already authenticated with a "default" user (this is the default configuration). Configuring the default user has, as a side effect, the ability to provide only a specific subset of functionalities to connections that are not explicitly authenticated.

### ACL Commands

- ACL WHOAMI
- ACL CAT
- ACL SETUSER
- ACL GETUSER
- ACL DELUSER
- ACL LIST

---

## `AUTH` - Access Password protected Redis

Once a password is set, it will not be possible to use Redis commands unless authenticated.

```s
# (error) NOAUTH Authentication required.
```

We can use the AUTH command to authenticate user and access a password protected Redis node.

```s
AUTH [username] password
```

> **Note:** When username is `default`, one can skip the `username` argument.

---

# Data Types

## Strings

### Overview

Redis strings store sequences of bytes, including text, serialized objects, and binary arrays. As such, strings are the most basic Redis data type. They're often used for caching, but they support additional functionality that lets you implement counters and perform bitwise operations, too.

**Limits**
By default, a single Redis string can be a maximum of 512 MB.

### [String Commands](https://redis.io/commands/?group=string)

- [SET](#set)
- [MSET](#mset)
- [GET](#get)
- [MGET](#mget)
- SETRANGE
- [GETRANGE](#getrange)
- [STRLEN](#strlen)
- [INCR](#incr)
- [INCRBY](#incrby)
- [INCRBYFLOAT](#incrbyfloat)
- [DECR](#decr)
- [DECRBY](#decrby)
- APPEND
- [DEL](#del)
- GETDEL

---

## Lists

Redis lists are linked lists of string values. Redis lists are frequently used to:

- Implement stacks and queues.
- Build queue management for background worker systems.

Consider [Redis Streams](#streams) as an alternative to Lists when you need to store and process an indeterminate series of events.

**Limits**
The max length of a Redis list is 2^32 - 1 (4,294,967,295) elements.

### [List Commands](https://redis.io/commands/?group=list)

- [LPUSH](#lpush)
- [LPUSHX](#lpushx)
- [RPUSH](#rpush)
- [RPUSHX](#rpushx)
- [LRANGE](#lrange)
- [LLEN](#llen)
- [LPOP](#lpop)
- [RPOP](#rpop)
- [LSET](#lset)
- [LINSERT](#linsert)
- [LINDEX](#lindex)
- [LTRIM](#ltrim)
- [BLPOP](#blpop)

---

## Sets

---

## Sorted Sets

---

## HyperLogLog

**`HyperLogLog`** is a data structure that answers a simple question: What is the approximate cardinality of a set. As a probabilistic data structure, HyperLogLog trades perfect accuracy for efficient space utilization.

The Redis HyperLogLog implementation uses up to 12 KB and provides a standard error of 0.81%.

> **Note:** If one needs more Set like functionality or perfect count accuracy one can use either a Redis Set or a Sorted Set. But remember, when counting large sets, a Redis Set will require a lot more memory than a HyperLogLog.

HyperLogLogs naturally help to preserve privacy. Once we put a value into a HyperLogLog, we can't get it out. A HyperLogLog stores as little information as possible to estimate its counts. This ,means, HyperLogLogs are a great way to count unique members without explicitly storing personal data.

The HyperLogLog unique values (since it only stores unique values) can be anything such as IP addresses, visitors of a website, search terms, e-mail addresses, unique count of locations.

**References:**

- [Using HyperLogLog to build a Traffic Heat Map](https://www.youtube.com/watch?v=MunL8nnwscQ)

**Limits:**
The HyperLogLog can estimate the cardinality of sets with up to 18,446,744,073,709,551,616 (2^64) members.

**[List of HyperLogLog Commands](#hyperloglog-commands)**

---

## Hashes

Redis hashes are record types structured as collections of field-value pairs. You can use hashes to represent basic objects and to store groupings of counters, among other things.

---

## Streams

---

# Transactions

Redis Transactions allow the execution of a group of commands in a single step, they are centered around the commands **`MULTI`**, **`EXEC`**, **`DISCARD`** and **`WATCH`**. Redis Transactions are what make Redis Atomic and make two important guarantees:

All the commands in a transaction are serialized and executed sequentially. A request sent by another client will never be served in the middle of the execution of a Redis Transaction. This guarantees that the commands are executed as a single isolated operation.

The EXEC command triggers the execution of all the commands in the transaction, so if a client loses the connection to the server in the context of a transaction before calling the EXEC command none of the operations are performed, instead if the EXEC command is called, all the operations are performed. When using the append-only file Redis makes sure to use a single write(2) syscall to write the transaction on disk. However if the Redis server crashes or is killed by the system administrator in some hard way it is possible that only a partial number of operations are registered. Redis will detect this condition at restart, and will exit with an error. Using the redis-check-aof tool it is possible to fix the append only file that will remove the partial transaction so that the server can start again.

Starting with version 2.2, Redis allows for an extra guarantee to the above two, in the form of optimistic locking in a way very similar to a check-and-set (CAS) operation. This is documented later on this page.

---

# Pub-Sub

**`SUBSCRIBE`**, **`UNSUBSCRIBE`** and **`PUBLISH`** implement the [Wiki: Publish/Subscribe messaging paradigm](http://en.wikipedia.org/wiki/Publish/subscribe) where senders (publishers) are not programmed to send their messages to specific receivers (subscribers). Rather, published messages are characterized into channels, without knowledge of what (if any) subscribers there may be. Subscribers express interest in one or more channels, and only receive messages that are of interest, without knowledge of what (if any) publishers there are. This decoupling of publishers and subscribers can allow for greater scalability and a more dynamic network topology.

For instance in order to subscribe to channels foo and bar the client issues a SUBSCRIBE providing the names of the channels:

---

# Commands

Redis commands and command-options are NOT case-sensitive. A `GET` command is the same as `get` or `gEt`.

## String Commands

### `SET`

Set key to hold the string value. If key already holds a value, it is overwritten, regardless of its type. Any previous time to live associated with the key is discarded on successful SET operation.

**Time Complexity:** O(1)

**Syntax:**

```sh
SET key value [NX | XX] [GET] [EX seconds | PX milliseconds |  EXAT unix-time-seconds | PXAT unix-time-milliseconds | KEEPTTL]
```

**Options:**

The **`SET`** command supports a set of options that modify its behavior:

- **`EX`** seconds -- Set the specified expire time, in seconds.
- **`PX`** milliseconds -- Set the specified expire time, in milliseconds.
- **`EXAT`** timestamp-seconds -- Set the specified Unix time at which the key will expire, in seconds.
- **`PXAT`** timestamp-milliseconds -- Set the specified Unix time at which the key will expire, in milliseconds.
- **`NX`** -- Only set the key if it does not already exist.
- **`XX`** -- Only set the key if it already exist.
- **`KEEPTTL`** -- Retain the time to live associated with the key.
- **`GET`** -- Return the old string stored at key, or nil if key did not exist. An error is returned and **`SET`** aborted if the value stored at key is not a string.

> **Note:** Since the **`SET`** command options can replace **`SETNX`**, **`SETEX`**, **`PSETEX`**, **GETSET**, it is possible that in future versions of Redis these commands will be deprecated and finally removed.

**Returns:**

- Simple string reply: **`OK`** if **`SET`** was executed correctly.
- Null reply: **`(nil)`** if the SET operation was not performed because the user specified the **`NX`** or **`XX`** option but the condition was not met.

- If the command is issued with the **`GET`** option, the above does not apply. It will instead reply as follows, regardless if the SET was actually performed:

  - Bulk string reply: the old string value stored at key.
  - Null reply: **`(nil)`** if the key did not exist.

---

**Examples:**

```sh
SET name Jayanta
## OK

SET age 30
## OK

SET max_balance 5.0e3
# OK

GET name
## "Jayanta"

GET age
## "30"

GET max_balance
## "5.0e3"

# Store a serialized JSON string and set it to expire 100 seconds from now
SET ticket:27 "\"{'username': 'priya', 'ticket_id': 321}\"" EX 60
## OK

```

---

### `GET`

Get the value of **`key`**. If the key does not exist the special value **`nil`** is returned. An error is returned if the value stored at **`key`** is not a string, because **`GET`** only handles string values.

**Time Complexity:** O(1)

**Syntax:**

```sh
GET key
```

**Returns:**

Bulk string reply: The value of **`key`**, or **`nil`** when **`key`** does not exist.

**Examples:**

```sh
GET nonexisting
# (nil)

SET name Jayanta
# OK

GET name
# "Jayanta"
```

---

### `GETRANGE`

Returns the substring of the string value stored at **`key`**, determined by the offsets **`start`** and **`end`** (both are inclusive). Negative offsets can be used in order to provide an offset starting from the end of the string. So -1 means the last character, -2 the penultimate and so forth.

The function handles out of range requests by limiting the resulting range to the actual length of the string.

**Time Complexity:** O(N) where N is the length of the returned string. The complexity is ultimately determined by the returned length, but because creating a substring from an existing string is very cheap, it can be considered O(1) for small strings.

**Syntax:**

```sh
GETRANGE key start end
```

**Returns:**

- Bulk string reply: The value of **`key`** starting at index **`start`** and ending at index **`end`**, or an empty string **`""`** when **`key`** does not exist.

**Examples:**

```sh
GETRANGE nonexisting 0 2
# ""

SET email jayanta@zenius.one

GETRANGE email 0 6
# "jayanta"
```

---

### `MSET`

Sets the given keys to their respective values. **`MSET`** replaces existing values with new values, just as regular **`SET`**. See **`MSETNX`** if you don't want to overwrite existing values.

**`MSET`** is atomic, so all given keys are set at once. It is not possible for clients to see that some of the keys were updated while others are unchanged.

**Time Complexity:** O(N) where N is the number of keys to set.

**Syntax:**

```sh
MSET key value [key value ...]
```

**Returns:**

- Simple string reply: Always **`OK`** since **`MSET`** can't fail.

**Example:**

```sh
MSET age 30 dob 15-08-1990
# "OK"

GET age
# "30"

GET dob
# "15-08-1990"
```

---

### `MGET`

Returns the values of all specified keys. For every key that does not hold a string value or does not exist, the special value **`nil`** is returned. Because of this, the operation never fails.

**Time Complexity:** O(N) where N is the number of keys to retrieve.

**Syntax:**

```sh
MGET key [key ...]
```

**Returns:**
Array reply: List of values at the specified keys.

**Example:**

```sh
MSET age 30 dob 15-08-1990
# "OK"

MGET age dob nonexisting
# 1) "30"
# 2) "15-08-1990"
# 3) (nil)
```

---

### `STRLEN`

Returns the length of the string value stored at key. An error is returned when key holds a non-string value.

**Time Complexity:** O(1)

**Syntax:**

```sh
STRLEN key
```

**Returns:**

Integer reply: The length of the string at **`key`**, or **`0`** when **`key`** does not exist.

**Examples:**

```sh
SET name "Jayanta"

STRLEN name
# (integer) 7

STRLEN nonexisting
# (integer) 0
```

---

### `INCR`

Increments the number stored at **`key`** by one. If the key does not exist, it is set to **`0`** before performing the operation. An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer. This operation is limited to 64 bit signed integers.

> **Note:** this is a string operation because Redis does not have a dedicated integer type. The string stored at the key is interpreted as a base-10 **`64 bit signed integer`** to execute the operation.

Redis stores integers in their integer representation, so for string values that actually hold an integer, there is no overhead for storing the string representation of the integer.

**Time Complexity:** O(1)

**Syntax:**

```sh
INCR key
```

**Returns:**

- Integer reply: The value of the **`key`** after increment.
- Error: If the key contains a value of the wrong type or contains a string that can not be represented as integer.

**Examples:**

```sh
SET name "Jayanta"
SET age 30

INCR name
# (error) ERR value is not an integer or out of range

INCR age
# (integer) 31

INCR nonexisting
# (integer) 1

GET nonexisting
# "1"
```

---

### `INCRBY`

Increments the number stored at **`key`** by **`increment`**. If the key does not exist, it is set to **`0`** before performing the operation. An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer. This operation is limited to **`64 bit signed integers`**.

See **[`INCR`](#incr)** for extra information on increment/decrement operations.

**Time Complexity:** O(1)

**Syntax:**

```sh
INCRBY key increment
```

**Returns:**

- Integer reply: The value of the **`key`** after increment.
- Error: If the key contains a value of the wrong type or contains a string that can not be represented as integer.

**Examples:**

```sh
SET name "Jayanta"
SET age 25

INCRBY name 5
# (error) ERR value is not an integer or out of range

INCRBY age 5
# (integer) 30

INCRBY nonexisting 5
# (integer) 5

GET nonexisting
# "5"
```

---

### `INCRBYFLOAT`

Increment the string representing a floating point number stored at **`key`** by the specified **`increment`**. By using a negative increment value, the result is that the value stored at the key is decremented (by the obvious properties of addition). If the key does not exist, it is set to **`0`** before performing the operation.

An error is returned if one of the following conditions occur:

- The **`key`** contains a value of the wrong type (not a string).
- The current **`key`** content or the specified increment are not parsable as a **`double precision floating point number`**.
- If the command is successful the new incremented value is stored as the new value of the key (replacing the old one), and returned to the caller as a **`string`**.

Both the value already contained in the string key and the increment argument can be optionally provided in **`exponential notation`**, however the value computed after the increment is stored consistently in the same format, that is, an integer number followed (if needed) by a dot, and a variable number of digits representing the decimal part of the number. Trailing zeroes are always removed.

The precision of the output is fixed at `17` digits after the decimal point regardless of the actual internal precision of the computation.

Providing a **`negative`** double precision floating point number as the increment value, i.e. **< `0`**, will effectively do a decrement operation. Since the **`INCRBYFLOAT`** doesn't have a corollary in DECRBYFLOAT, we can use this to effectively decrement the string representing a floating point number stored at **`key`** by the specified **`negative increment`**

**Time Complexity:** O(1)

**Syntax:**

```sh
INCRBYFLOAT key increment
```

**Returns:**

- Bulk string reply: The value of **`key`** after the increment.
- Error: If the **`key`** contains a value of the wrong type or contains a string that can not be represented as a **`double precision floating point number`**.

**Examples:**

```sh
SET name "Jayanta"
SET wallet 51.25

INCRBYFLOAT name 2.75
# (error) ERR value is not an integer or out of range

INCRBYFLOAT age 2.75
# "54"

INCRBYFLOAT age 1.25
# "55.25"

INCRBYFLOAT wallet 2.0e2
# "255.25"

INCRBYFLOAT wallet -5.25
# "250"

SET max_balance 5.0e3
# OK

GET max_balance
# "5.0e3"

INCRBYFLOAT max_balance 2.0e2
# 5200

GET max_balance
# "5200"

INCRBYFLOAT nonexisting 1.25
# "1.25"

GET nonexisting
# "1.25"
```

---

### `DECR`

Decrements the number stored at **`key`** by one. If the key does not exist, it is set to **`0`** before performing the operation. An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer. This operation is limited to **`64 bit signed integers`**.

See **[`INCR`](#incr)** for extra information on increment/decrement operations.

**Time Complexity:** O(1)

**Syntax:**

```sh
DECR key
```

**Returns:**

- Integer reply: The value of the **`key`** after decrement.
- Error: If the key contains a value of the wrong type or contains a string that can not be represented as integer.

**Examples:**

```sh
SET name "Jayanta"
SET age 30

DECR name
# (error) ERR value is not an integer or out of range

DECR age
# (integer) 31

DECR nonexisting
# (integer) 1

GET nonexisting
# "-1"
```

---

### `DECRBY`

Decrements the number stored at **`key`** by **`decrement`**. If the key does not exist, it is set to **`0`** before performing the operation. An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer. This operation is limited to **`64 bit signed integers`**.

See **[`INCR`](#incr)** for extra information on increment/decrement operations.

**Time Complexity:** O(1)

**Syntax:**

```sh
DECRBY key decrement
```

**Returns:**

- Integer reply: The value of the **`key`** after increment.
- Error: If the key contains a value of the wrong type or contains a string that can not be represented as integer.

**Examples:**

```sh
SET name "Jayanta"
SET age 35

DECRBY name 5
# (error) ERR value is not an integer or out of range

DECRBY age 5
# (integer) 30

DECRBY nonexisting 5
# (integer) -5

GET nonexisting
# "5"
```

---

## List Commands

### `LPUSH`

Insert all the specified values at the **`head`** of the list stored at **`key`**. If **`key`** does not exist, it is created as empty list before performing the push operations. When **`key`** holds a value that is not a list, an error is returned.

It is possible to push multiple elements using a single command call just specifying multiple arguments at the end of the command. Elements are inserted one after the other to the **`head`** of the list, from the leftmost element to the rightmost element. So for instance the command **`LPUSH mylist a b c`** will result into a list containing **`c`** as first element, **`b`** as second element and **`a`** as third element.

After a List is created, the contents can be viewed using the [**`LRANGE`**](#lrange) command followed by the list name.

**Time Complexity:** O(1) for each element added, so O(N) to add N elements when the command is called with multiple arguments.

**Consistency with enqueue functions in various programming languages**

- Similar to JavaScript's **`Array.prototype.unshift()`**.

**Syntax:**

```sh
LPUSH key element [element ...]
```

**Returns:**

- Integer reply: The length of the list after the push operations.
- Error: If key holds a value that is not a list.

**Examples:**

```sh
SET name "Jayanta"

LPUSH names "Jayanta" "Rohit" "Adraha"
## (integer) 3

LRANGE names 0 -1
## 1) "Adraha"
## 2) "Rohit"
## 3) "Jayanta"

LPUSH name "a" "b" "c"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `LPUSHX`

The **`LPUSHX`** command, inserts specified values at the **`head`** of the list stored at key, only if key already exists and holds a list. In contrary to **`LPUSH`**, no operation will be performed when key does not yet exist.

**Time Complexity:** O(1) for each element added, so O(N) to add N elements when the command is called with multiple arguments.

**Syntax:**

```sh
LPUSHX key element [element ...]
```

**Returns:**

- Integer reply: The length of the list after the push operations. Returns **`0`** if key doesn't exist as **`LPUSHX`** doesn't create a new list.
- Error: If key holds a value that is not a list.

**Examples:**

```sh
SET name "Jayanta"

LPUSH names "Jayanta" "Rohit" "Adraha"
## (integer) 3

LPUSHX names "Ravi"
## (integer) 4

LRANGE names 0 -1
## 1) "Ravi"
## 2) "Adraha"
## 3) "Rohit"
## 4) "Jayanta"

LPUSHX fruits "Oranges" "Apples"
## (integer) 0

LPUSHX name "a" "b" "c"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `RPUSH`

Insert all the specified values at the **`tail`** of the list stored at **`key`**. If **`key`** does not exist, it is created as empty list before performing the push operations. When **`key`** holds a value that is not a list, an error is returned.

It is possible to push multiple elements using a single command call just specifying multiple arguments at the end of the command. Elements are inserted one after the other to the **`tail`** of the list, from the leftmost element to the rightmost element. So for instance the command **`RPUSH mylist a b c`** will result into a list containing **`a`** as first element, **`b`** as second element and **`c`** as third element.

After a List is created, the contents can be viewed using the [**`LRANGE`**](#lrange) command followed by the list name.

**Time Complexity:** O(1) for each element added, so O(N) to add N elements when the command is called with multiple arguments.

**Consistency with push functions in various programming languages**

- Similar to JavaScript's **`Array.prototype.push()`**.

**Syntax:**

```sh
RPUSH key element [element ...]
```

**Returns:**

- Integer reply: The length of the list after the push operations.
- Error: If key holds a value that is not a list.

**Examples:**

```sh
SET name "Jayanta"

RPUSH names "Jayanta" "Rohit" "Adraha"
## (integer) 3

LRANGE names 0 -1
## 1) "Jayanta"
## 2) "Rohit"
## 3) "Adraha"

RPUSH name "a" "b" "c"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `RPUSHX`

The **`RPUSHX`** command, inserts specified values at the tail of the list stored at key, only if key already exists and holds a list. In contrary to **`RPUSH`**, no operation will be performed when key does not yet exist.

**Time Complexity:** O(1) for each element added, so O(N) to add N elements when the command is called with multiple arguments.

**Syntax:**

```sh
LPUSHX key element [element ...]
```

**Returns:**

- Integer reply: The length of the list after the push operations. Returns **`0`** if key doesn't exist as **`RPUSHX`** doesn't create a new list.
- Error: If key holds a value that is not a list.

**Examples:**

```sh
SET name "Jayanta"

RPUSH names "Jayanta" "Rohit" "Adraha"
## (integer) 3

RPUSHX names "Ravi"
## (integer) 4

LRANGE names 0 -1
## 1) "Jayanta"
## 2) "Rohit"
## 3) "Adraha"
## 4) "Ravi"

RPUSHX fruits "Oranges" "Apples"
## (integer) 0

RPUSHX name "a" "b" "c"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `LRANGE`

Returns the specified elements of the list stored at **`key`**. The offsets **`start`** and **`stop`** are zero-based indexes, with **`0`** being the first element of the list (the head of the list), **`1`** being the next element and so on.

These offsets can also be negative numbers indicating offsets starting at the end of the list.
For example: **`-1`** is the last element of the list, **`-2`** the penultimate, and so on.

**Time Complexity:** O(S+N) where S is the distance of start offset from HEAD for small lists, from nearest end (HEAD or TAIL) for large lists; and N is the number of elements in the specified range.

**Consistency with range functions in various programming languages**
Note that if you have a list of numbers from 0 to 100, **`LRANGE list 0 9`** will return 10 elements, that is, the rightmost item is included. This **may or may not** be consistent with behavior of range-related functions in your programming language of choice (think JavaScript's **`Array.prototype.slice(start, stop)`**, or Python's **`range()`** function).

**Out-of-range indexes**
Out of range indexes will not produce an error. If **`start`** is larger than the end of the list, an empty list is returned. If **`stop`** is larger than the actual end of the list, Redis will treat it like the last element of the list.

**Syntax:**

```sh
LRANGE key start stop
```

**Returns:**

- Integer reply: The length of the list after the push operations.
- Error: If key holds a value that is not a list.

**Examples:**

```sh
SET name "Jayanta"

LPUSH names "Jayanta" "Rohit" "Adraha"
## (integer) 3

RPUSH names2 "Jayanta" "Rohit" "Adraha"
## (integer) 3

LRANGE names 0 -1
## 1) "Adraha"
## 2) "Rohit"
## 3) "Jayanta"

LRANGE names2 0 -1
## 1) "Jayanta"
## 2) "Rohit"
## 3) "Adraha"

LRANGE names 0 50
## 1) "Adraha"
## 2) "Rohit"
## 3) "Jayanta"

LRANGE names 3 20
# (empty array)

LRANGE name 0 -1
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `LLEN`

Returns the length of the list stored at **`key`**. If **`key`** does not exist, it is interpreted as an empty list and **`0`** is returned. An error is returned when the value stored at **`key`** is not a list.

**Time Complexity:** O(1)

**Consistency with range functions in various programming languages**

- Similar to JavaScript's **`Array.prototype.length()`**.

**Syntax:**

```sh
LLEN key
```

**Returns:**

- Integer reply: The length of the list at **`key`**. This number is greater than equal to 0.
- Error: If **`key`** holds a value that is not a list.

**Examples:**

```sh
SET name "Jayanta"
# OK

RPUSH names "Jayanta" "Rohit" "Adraha"
## (integer) 3

LLEN names
## (integer) 3

LLEN nonexisting
## (integer) 0

LLEN name
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `LPOP`

Removes and returns the first elements of the list stored at **`key`**.

By default, the command pops a single element from the beginning of the list. When provided with the optional **`count`** argument, the reply will consist of up to **`count`** elements, depending on the list's length.

**Time complexity:** O(N) where N is the number of elements returned

**Consistency with dequeue functions in various programming languages**

- Similar to JavaScript's **`Array.prototype.shift()`**.

**Syntax:**

```sh
LPOP key [count]
```

**Returns:**

- Bulk string reply: If called without the **`count`** argument and **`key`** exists. Returns `nil` when **`key`** does not exist.
- Array reply: List of popped elements, or **`nil`** when **`key`** does not exist.
- Error: If **`key`** holds a value that is not of type list.

**Examples:**

```sh
SET name "Jayanta"
## OK

RPUSH names "Jayanta" "Rohit" "Adraha"
## (integer) 3

LPOP names
## "Jayanta"

LLEN names
## (integer) 2

LPOP names 2
## 1) "Rohit"
## 2) "Adraha"

LRANGE names 0 -1
## (empty array)

LPOP nonexisting
## (nil)

LPOP name
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `RPOP`

Removes and returns the last elements of the list stored at **`key`**.

By default, the command pops a single element from the beginning of the list. When provided with the optional **`count`** argument, the reply will consist of up to **`count`** elements, depending on the list's length.

**Time complexity:** O(N) where N is the number of elements returned

**Consistency with pop functions in various programming languages**

- Similar to JavaScript's **`Array.prototype.pop()`**.

**Syntax:**

```sh
LPOP key [count]
```

**Returns:**

- Bulk string reply: If called without the **`count`** argument and **`key`** exists. Returns `nil` when **`key`** does not exist.
- Array reply: List of popped elements, or **`nil`** when **`key`** does not exist.
- Error: If **`key`** holds a value that is not of type list.

**Examples:**

```sh
SET name "Jayanta"
## OK

RPUSH names "Jayanta" "Rohit" "Adraha"
## (integer) 3

RPOP names
## "Adraha"

LLEN names
## (integer) 2

RPOP names 2
## 1) "Rohit"
## 2) "Jayanta"

LRANGE names 0 -1
## (empty array)

RPOP nonexisting
## (nil)

RPOP name
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `LSET`

Sets the list element at index to element. For more information on the index argument, see **[`LINDEX`](#lindex)**.

An error is returned for out of range indexes.

**Time Complexity:** O(N) where N is the length of the list. Setting either the first or the last element of the list is O(1).

**Consistency with insert/assign functions in various programming languages**

- Similar to JavaScript's **`Array.prototype.splice(index, 1, element)`** without returning the old value or **`array[index] = element`**, where **`array`** corresponds to a Redis **`key`** that is of data-type **`list`**.

**Syntax:**

```sh
LSET key index element
```

**Returns:**

- Simple string reply
- Error: An error is returned when,
  - **`index`** is out of range,
  - **`key`** holds a value that is not of type list,
  - **`key`** doesn't exist.

**Examples:**

```sh
SET name "Jayanta"
## OK

RPUSH names "Jayanta" "Rohit"
## (integer) 2

LSET names 1 "Adraha"
## OK

LRANGE names 0 -1
## 1) "Jayanta"
## 2) "Adraha"

LSET nonexisting 0 "Jayanta"
## (error) ERR no such key

LSET names 2 "Ravi"
## (error) ERR index out of range

LSET name 0 "Soumojit"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `LINSERT`

Inserts **`element`** in the **`list`** stored at key either before or after the reference value of the first index of **`pivot`**.

When **`key`** does not exist, it is considered an empty list and no operation is performed.

An error is returned when **`key`** exists but does not hold a list value.

**Time Complexity:** O(N) where N is the number of elements to traverse before seeing the value pivot. This means that inserting somewhere on the left end on the list (head) can be considered O(1) and inserting somewhere on the right end (tail) is O(N).

**Consistency with insert/assign functions in various programming languages**

- Similar to JavaScript's **`Array.prototype.splice(index, 0, element)`** for **`LINSERT <BEFORE>`** and **`Array.prototype.splice(index + 1, 0, element)`** for **`LINSERT <AFTER>`**. The difference is that LINSERT doesn't use the index but uses the first index of the pivot. Thus more accurately, the JavaScript equivalent of LINSERT is **`array.splice(array.indexOf(pivot), 0, element)`** for **`LINSERT <BEFORE>`** and **`array.splice(array.indexOf(pivot) + 1, 0, element)`** for **`LINSERT <AFTER>`**

**Syntax:**

```sh
LINSERT key <BEFORE | AFTER> pivot element
```

**Returns:**

- Integer reply: the length of the list after the insert operation, **`-1`** when the value **`pivot`** was not found or **`0`** when the `key` doesn't exist.
- Error: An error is returned when **`key`** holds a value that is not of type list.

**Examples:**

```sh
SET name "Jayanta"
## OK

RPUSH names "Jayanta" "Adraha" "Ravi" "Adraha"
## (integer) 4

LINSERT names BEFORE "Adraha" "Rohit"
# (integer) 5

LINSERT names AFTER "Adraha" "Tathagata"
# (integer) 6

LRANGE names 0 -1
## 1) "Jayanta"
## 2) "Rohit"
## 3) "Adraha"
## 4) "Tathagata"
## 5) "Ravi"
## 5) "Adraha"

LINSERT names "Sambuddha" "Soumojit"
## (integer) -1

LINSERT nonexisting "Adraha" "Jayanta"
## (integer) 0

LINSERT name "Jayanta" "Soumojit"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `LINDEX`

Returns the element at index **`index`** in the list stored at **`key`**. The index is zero-based, so **`0`** means the first element, **`1`** the second element and so on. Negative indices can be used to designate elements starting at the tail of the list. Here, **`-1`** means the last element, **`-2`** means the penultimate and so forth.

When the value at **`key`** is not a list, an error is returned.

An error is returned for out of range indexes.

**Time Complexity:** O(N) where N is the number of elements to traverse to get to the element at index. This makes asking for the first or the last element of the list O(1).

**Consistency with accessing a list item by its index in various programming languages**

- Similar to JavaScript's **`array[index]`**, where **`array`** corresponds to a Redis **`key`** that is of data-type **`list`**.

**Syntax:**

```sh
LINDEX key index
```

**Returns:**

- Bulk string reply: The requested element, or **`nil`** when **`index`** is out of range or `key` is non-existing.
- Error: An error is returned when **`key`** holds a value that is not of type list.

**Examples:**

```sh
SET name "Jayanta"
## OK

RPUSH names "Jayanta" "Rohit"
## (integer) 2

LINDEX names 0
## "Jayanta"

LINDEX names 2
## (nil)

LINDEX nonexisting 0
## (nil)

LINDEX name 2
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `LTRIM`

Trim an existing list so that it will contain only the specified range of elements specified. Both **`start`** and **`stop`** are zero-based indexes, where **`0`** is the first element of the list (the head), **`1`** the next element and so on.

**Time Complexity:** O(N) where N is the number of elements to be removed by the operation.

**Syntax:**

```sh
LTRIM key start stop
```

**Returns:**

- Simple string reply

For example: **`LTRIM foobar 0 2`** will modify the list stored at foobar so that only the first three elements of the list will remain.

**`start`** and **`end`** can also be negative numbers indicating offsets from the end of the list, where **`-1`** is the last element of the list, **`-2`** the penultimate element and so on.

Out of range indexes will not produce an error: if **`start`** is larger than the **`end`** of the list, or **`start > end`**, the result will be an empty list (which causes **`key`** to be removed). If `end` is larger than the end of the list, Redis will treat it like the last element of the list.

A common use of .

**Example: `LTRIM` is together with `LPUSH` / `RPUSH`**

```sh
RPUSH nuts "Peanuts" "Cashews" "Almonds" "Walnuts"
## (integer) 4

LPUSH nuts "Apricots"
## (integer) 5

LTRIM nuts 0 4
# OK
```

This pair of commands will push a new element on the list, while making sure that the list will not grow larger than 5 elements. This is very useful when using Redis to store logs for example. It is important to note that when used in this way **`LTRIM`** is an O(1) operation because in the average case just one element is removed from the tail of the list.

**Other Examples:**

```sh
RPUSH nuts "Peanuts" "Cashews" "Almonds" "Walnuts" "Apricots"
## (integer) 4

LTRIM nuts 0 3
## OK

LRANGE nuts 0 -1
## 1) "Peanuts"
## 2) "Cashews"
## 3) "Almonds"
## 4) "Walnuts"

LTRIM nuts 1 0
# OK

LRANGE nuts 0 -1
# (empty array)
```

---

### `LREM`

Removes the first **`count`** occurrences of elements equal to **`element`** from the list stored at **`key`**. The **`count`** argument influences the operation in the following ways:

- **`count > 0`**: Remove elements equal to **`element`** moving from head to tail.
- **`count < 0`**: Remove elements equal to **`element`** moving from tail to head.
- **`count = 0`**: Remove all elements equal to **`element`**.

**Time Complexity:** O(N+M) where N is the length of the list and M is the number of elements removed.

**Syntax:**

```sh
LREM key count element
```

**Returns:**

- Integer reply: The number of removed elements. Non-existing keys are treated like empty lists, so when **`key`** does not exist, the command will always return **`0`**.
- Error: An error is returned when **`key`** holds a value that is not of type list.

For example: **`LREM list -2 "hello"`** will remove the last two occurrences of **`"hello"`** in the list stored at **`list`**.

**Examples:**

```sh
SET name "Jayanta"
## OK

RPUSH names "Adraha" "Bhargav" "Jayanta" "Pratik" "Ravi" "Adraha" "Rohit" "Adraha" "Adraha"
## (integer) 9

LREM names -1 "Adraha"
## (integer) 1

LRANGE names 0 -1
## 1) "Adraha"
## 2) "Bhargav"
## 3) "Jayanta"
## 4) "Pratik"
## 5) "Ravi"
## 6) "Adraha"
## 7) "Rohit"
## 8) "Adraha"

LREM names 2 "Adraha"
## (integer) 2

LRANGE names 0 -1
## 1) "Bhargav"
## 2) "Jayanta"
## 3) "Pratik"
## 4) "Ravi"
## 5) "Rohit"
## 6) "Adraha"


LREM names 1 "Soumojit"
# (integer) 0

LREM name 1 "Jayanta"
# (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `BLPOP`

#### Overview

**`BLPOP`** is a blocking list pop primitive. It is the blocking version of **`LPOP`** because it blocks the connection when there are no elements to pop from any of the given lists. An element is popped from the head of the first list that is non-empty, with the given keys being checked in the order that they are given.

**Time Complexity:** O(N) where N is the number of provided keys.

**Syntax:**

```sh
BLPOP key [key ...] timeout
```

**Returns:**

- Array reply: specifically:

  - A **`nil`** multi-bulk when no element could be popped and the timeout expired.
  - A two-element multi-bulk with the first element being the name of the key where an element was popped and the second element being the value of the popped element.

- Error: An error is returned when **`key`** holds a value that is not of type list.

---

#### Non-Blocking Behaviour

When **`BLPOP`** is called, if at least one of the specified keys contains a non-empty list, an element is popped from the head of the list and returned to the caller together with the key it was popped from.

Keys are checked in the order that they are given. Let's say that the key **`list1`** doesn't exist and **`list2`** and **`list3`** hold non-empty lists. Consider the following command:

```sh
BLPOP list1 list2 list3 0
```

**`BLPOP`** guarantees to return an element from the list stored at **`list2`** (since it is the first non empty list when checking **`list1`**, **`list2`** and **`list3`** in that order).

---

#### Blocking Behaviour

If none of the specified keys exist, **`BLPOP`** blocks the connection until another client performs an **`LPUSH`** or **`RPUSH`** operation against one of the keys.

Once new data is present on one of the lists, the client returns with the name of the key unblocking it and the popped value.

When **`BLPOP`** causes a client to block and a **`non-zero timeout`** is specified, the client will unblock returning a **`nil`** multi-bulk value when the specified timeout has expired without a push operation against at least one of the specified keys.

**The timeout argument is interpreted as a double value specifying the maximum number of seconds to block**. A timeout of zero can be used to block indefinitely.

---

#### Examples

```sh
SET name "Jayanta"
## OK

RPUSH names "Jayanta" "Rohit" "Adraha" "Ravi"
## (integer) 4

#-----------------------------------------------------------------------------------#
# Blocking Behaviour for List that is empty
#-----------------------------------------------------------------------------------#
RPUSH fruits "Mango"
## (integer) 1

RPUSH nuts "Peanuts" "Cashews" "Almonds" "Walnuts"
## (integer) 4

RPOP fruits
## "Mango"

LTRIM nuts 0 1
## OK

LRANGE fruits 0 -1
## (empty array)

BLPOP nuts fruits 30
## { nuts and fruits are both empty, therefore will listen for the specified timeout, 30 seconds for any Push to any of the lists, unblock it and return the first element pushed }

RPUSH fruits "Orange"
## (integer) 2

## { after x seconds, where x < timeout, the push is detected and popped }
## 1) "fruits"
## 2) "Orange"
## (11.63s)

#-----------------------------------------------------------------------------------#
# Non-Blocking Behaviour for List that is not empty
#-----------------------------------------------------------------------------------#
BLPOP names 10
## "names"
## "Jayanta"

RPUSH nuts "Peanuts" "Cashews" "Almonds" "Walnuts"
## (integer) 4

BLPOP fruits nuts names 10
## { fruits is empty but nuts and names are not empty, therefore it will return the first available element from the head of a non-empty list. In this case, it is the nuts list }
## 1) "nuts"
## 2) "PEANUTS"

#-----------------------------------------------------------------------------------#
# Non-Existing List and Errors
#-----------------------------------------------------------------------------------#
BLPOP nonexisting 15
## (nil)
## (15.05s)

BLPOP name 20
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

## Set Commands

### `SADD`

Add the specified members to the set stored at **`key`**. Specified members that are already a member of this set are ignored. If **`key`** does not exist, a new set is created before adding the specified members.

An error is returned when the value stored at **`key`** is not a set.

**Time Complexity:** O(1) for each element added, so O(N) to add N elements when the command is called with multiple arguments.

**Syntax:**

```sh
SADD key member [member ...]
```

**Returns:**

- Integer reply: The number of elements that were added to the set, not including all the elements already present in the set.
- Error: An error is returned when **`key`** holds a value that is not of type **`set`**.

**Examples:**

```sh
LPUSH names "Jayanta" "Rohit"
## (integer) 2

SADD nuts "Peanuts"
## (integer) 1

SADD nuts "Cashews" "Almonds" "Walnuts" "Apricots"
## (integer) 4

SADD nuts "Peanuts"
## (integer) 0

SADD names "Pistachios"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### SMEMBERS

Returns all the members of the set value stored at key.

This has the same effect as running **`SINTER`** with one argument **`key`**.

**Time Complexity:** O(N) where N is the set cardinality.

**Syntax:**

```sh
SMEMBERS key
```

**Returns:**

- Integer reply: The number of elements that were added to the set, not including all the elements already present in the set.
- Error: An error is returned when **`key`** holds a value that is not of type **`set`**.

**Examples:**

```sh
LPUSH names "Jayanta" "Rohit"
## (integer) 2

SADD nuts "Peanuts" "Cashews" "Almonds" "Walnuts" "Apricots"
## (integer) 5

SMEMBERS nuts
## 1) "Almonds"
## 2) "Peanuts"
## 3) "Walnuts"
## 4) "Cashews"
## 5) "Apricots"

SMEMBERS names
## (error) WRONGTYPE Operation against a key holding the wrong kind of value

SMEMBERS nonexisting
## (empty array)
```

---

### `SCARD`

Returns the set cardinality (number of elements) of the set stored at **`key`**.

**Time Complexity:** O(1)

**Syntax:**

```sh
SCARD key
```

**Returns:**

- Integer reply: The cardinality (number of elements) of the set, or **`0`** if key does not exist.
- Error: An error is returned when **`key`** holds a value that is not of type **`set`**.

**Examples:**

```sh
LPUSH names "Jayanta" "Rohit"
## (integer) 2

SADD nuts "Peanuts" "Cashews" "Almonds" "Walnuts" "Apricots"
## (integer) 5

SCARD nuts
## (integer) 5

SCARD nonexisting
## (integer) 0

SCARD names
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `SISMEMBER`

Returns if **`member`** is a member of the set stored at **`key`**.

**Time Complexity:** O(1)

**Syntax:**

```sh
SISMEMBER key member
```

**Returns:**

- Integer reply: Specifically if,

  - **`1`** if the element is a member of the set.
  - **`0`** if the element is not a member of the set, or if key does not exist.

- Error: An error is returned when **`key`** holds a value that is not of type **`set`**.

**Examples:**

```sh
LPUSH names "Jayanta" "Rohit"
## (integer) 2

SADD nuts "Peanuts" "Cashews" "Almonds" "Walnuts" "Apricots"
## (integer) 5

SISMEMBER nuts "Cashews"
## (integer) 1

SISMEMBER nuts "Raisins"
## (integer) 0

SCARD nonexisting "Imaginary"
## (integer) 0

SCARD names "Jayanta"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `SDIFF`

Returns the members of the set resulting from the difference between the first set and all the successive sets.

**Time Complexity:** O(N) where N is the total number of elements in all given sets.

**Syntax:**

```sh
SDIFF key [key ...]
```

**Returns:**

- Array reply: List with members of the resulting **`set`**. If no difference, then returns empty array.
- Error: An error is returned when **`key`** holds a value that is not of type **`set`**.

**Examples:**

```sh
LPUSH names "Jayanta" "Rohit"
## (integer) 2

SADD nuts "Peanuts" "Cashews" "Almonds" "Walnuts" "Apricots"
## (integer) 5

SADD dried_fruits "Peanuts" "Raisins" "Pistachios"

SDIFF nuts dried_fruits
## 1) "Almonds"
## 2) "Apricots"
## 3) "Walnuts"
## 4) "Cashews"

SDIFF dried_fruits nuts
## 1) "Raisins"
## 2) "Pistachios"

SDIFF nonexisting nonexisting2
## (empty array)

SDIFF names nuts
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `SDIFFSTORE`

This command is equal to **`SDIFF`**, but instead of returning the resulting set, it is stored in **`destination`**.

If **`destination`** already exists, it is overwritten.

**Time Complexity:** O(N) where N is the total number of elements in all given sets.

**Syntax:**

```sh
SDIFFSTORE destination key [key ...]
```

**Returns:**

- Integer reply: The number of elements in the resulting set.
- Error: An error is returned when **`key`** holds a value that is not of type **`set`**.

**Examples:**

```sh
LPUSH names "Jayanta" "Rohit"
## (integer) 2

SADD nuts "Peanuts" "Cashews" "Almonds" "Walnuts" "Apricots"
## (integer) 5

SADD dried_fruits "Peanuts" "Raisins" "Pistachios"

SDIFFSTORE difference_nuts nuts dried_fruits
## (integer) 4

SMEMBERS difference_nuts
## 1) "Almonds"
## 2) "Apricots"
## 3) "Walnuts"
## 4) "Cashews"

SDIFFSTORE difference_dried_fruits dried_fruits nuts
## (integer) 2

SMEMBERS difference_dried_fruits
## 1) "Raisins"
## 2) "Pistachios"

SDIFFSTORE container nonexisting nonexisting2
## (integer) 0

SDIFFSTORE names nuts
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `SINTER`

Returns the members of the set resulting from the intersection of all the given sets.

Keys that do not exist are considered to be empty sets. With one of the keys being an empty set, the resulting set is also empty (since set intersection with an empty set always results in an empty set).

**Time Complexity:** O(N\*M) worst case where N is the cardinality of the smallest set and M is the number of sets.

**Syntax:**

```sh
SINTER key [key ...]
```

**Returns:**

- Array reply: List with members of the resulting **`set`**. If no intersection, then returns empty array.
- Error: An error is returned when **`key`** holds a value that is not of type **`set`**.

**Examples:**

```sh
LPUSH names "Jayanta" "Rohit"
## (integer) 2

SADD nuts "Peanuts" "Cashews" "Almonds" "Walnuts" "Apricots"
## (integer) 5

SADD dried_fruits "Peanuts" "Raisins" "Pistachios"

SINTER nuts dried_fruits
## 1) "Peanuts"

SINTER nonexisting nuts
## (empty array)

SINTER names nuts
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `SINTERSTORE`

This command is equal to **`SINTER`**, but instead of returning the resulting set, it is stored in **`destination`**.

If **`destination`** already exists, it is overwritten.

**Time Complexity:** O(N\*M) worst case where N is the cardinality of the smallest set and M is the number of sets.

**Syntax:**

```sh
SINTERSTORE destination key [key ...]
```

**Returns:**

- Array reply: The number of elements in the resulting **`set`**.
- Error: An error is returned when **`key`** holds a value that is not of type **`set`**.

**Examples:**

```sh
LPUSH names "Jayanta" "Rohit"
## (integer) 2

SADD nuts "Peanuts" "Cashews" "Almonds" "Walnuts" "Apricots"
## (integer) 5

SADD dried_fruits "Peanuts" "Raisins" "Pistachios"

SINTERSTORE common_nuts nuts dried_fruits
## (integer) 1

SMEMBERS common_nuts
## 1) "Peanuts"

SINTERSTORE container nonexisting nuts
## (empty array)

SINTERSTORE container names nuts
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `SUNION`

Returns the members of the set resulting from the union of all the given sets.

Keys that do not exist are considered to be empty sets.

**Time Complexity:** O(N) where N is the total number of elements in all given sets.

**Syntax:**

```sh
SUNION key [key ...]
```

**Returns:**

- Array reply: List with members of the resulting **`set`**. If no intersection, then returns empty array.
- Error: An error is returned when **`key`** holds a value that is not of type **`set`**.

**Examples:**

```sh
LPUSH names "Jayanta" "Rohit"
## (integer) 2

SADD nuts "Peanuts" "Cashews" "Almonds" "Walnuts" "Apricots"
## (integer) 5

SADD dried_fruits "Peanuts" "Raisins" "Pistachios"

SUNION nuts dried_fruits
## 1) "Apricots"
## 2) "Pistachios"
## 3) "Almonds"
## 4) "Raisins"
## 5) "Peanuts"
## 6) "Cashews"
## 7) "Walnuts"

SUNION nonexisting nuts
## 1) "Almonds"
## 2) "Peanuts"
## 3) "Apricots"
## 4) "Cashews"
## 5) "Walnuts"

SUNION nonexisting nonexisting2
## (empty array)

SUNION names nuts
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `SUNIONSTORE`

This command is equal to **`SUNION`**, but instead of returning the resulting set, it is stored in **`destination`**.

If **`destination`** already exists, it is overwritten.

**Time Complexity:** O(N) where N is the total number of elements in all given sets.

**Syntax:**

```sh
SUNIONSTORE destination key [key ...]
```

**Returns:**

- Array reply: The number of elements in the resulting **`set`**.
- Error: An error is returned when **`key`** holds a value that is not of type **`set`**.

**Examples:**

```sh
LPUSH names "Jayanta" "Rohit"
## (integer) 2

SADD nuts "Peanuts" "Cashews" "Almonds" "Walnuts" "Apricots"
## (integer) 5

SADD dried_fruits "Peanuts" "Raisins" "Pistachios"

SUNIONSTORE union_nuts nuts dried_fruits
## (integer) 7

SMEMBERS union_nuts
## 1) "Apricots"
## 2) "Pistachios"
## 3) "Almonds"
## 4) "Raisins"
## 5) "Peanuts"
## 6) "Cashews"
## 7) "Walnuts"

SUNIONSTORE container nonexisting nuts
## (integer) 5

SMEMBERS container
## 1) "Almonds"
## 2) "Peanuts"
## 3) "Apricots"
## 4) "Cashews"
## 5) "Walnuts"

SUNIONSTORE container nonexisting nonexisting2
## (empty array)

SUNIONSTORE container names nuts
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

## Sorted Set Commands

### `ZADD`

Adds all the specified members with the specified scores to the sorted set stored at **`key`**. It is possible to specify multiple score / member pairs. If a specified member is already a member of the sorted set, the score is updated and the element reinserted at the right position to ensure the correct ordering.

If **`key`** does not exist, a new sorted set with the specified members as sole members is created, like if the sorted set was empty. If the key exists but does not hold a sorted set, an error is returned.

The score values should be the string representation of a double precision floating point number. **`+inf`** (Positive Infinity) and **`-inf`** (Negative Infinity) values are valid values as well.

**Time Complexity:** O(log(N)) for each item added, where N is the number of elements in the sorted set.

**Syntax:**

```sh
ZADD key [NX | XX] [GT | LT] [CH] [INCR] score member [score member ...]
```

**Options:**

**`ZADD`** supports a list of options, specified after the name of the key and before the first score argument. Options are:

- **`XX`**: Only update elements that already exist. Don't add new elements.
- **`NX`**: Only add new elements. Don't update already existing elements.
- **`LT`**: Only update existing elements if the new score is **less than** the current score. This flag doesn't prevent adding new elements.
- **`GT`**: Only update existing elements if the new score is **greater than** the current score. This flag doesn't prevent adding new elements.
- **`CH`**: Modify the return value from the number of new elements added, to the total number of elements changed (CH is an abbreviation of changed). Changed elements are **new elements added** and elements already existing for which **the score was updated**. So elements specified in the command line having the same score as they had in the past are not counted. Note: normally the return value of **`ZADD`** only counts the number of new elements added.
- **`INCR`**: When this option is specified **`ZADD`** acts like **`ZINCRBY`**. Only one score-element pair can be specified in this mode.

> **Note:** The GT, LT and NX options are mutually exclusive.

**Returns:**
Integer reply, specifically:

- When used without optional arguments, the number of elements added to the sorted set (excluding score updates).
- If the **`CH`** option is specified, the number of elements that were changed (added or updated).

If the **`INCR`** option is specified, the return value will be Bulk string reply:

- The new score of **`member`** (a double precision floating point number) represented as string, or **`nil`** if the operation was aborted (when called with either the **`XX`** or the **`NX`** option).

**Examples:**

```sh
SADD nuts "Peanuts" "Cashews" "Almonds"
## (integer) 3

ZADD sports 1 "Cricket"
## (integer) 1

ZADD sports 2 "Football" 3 "Tennis" 4 "Boxing" 5 "Wrestling"
## (integer) 4

ZRANGE sports 0 -1
## 1) "Cricket"
## 2) "Football"
## 3) "Tennis"
## 4) "Boxing"
## 5) "Wrestling"

ZADD sports 5 "Football"
## (integer) 0

ZRANGE sports 0 -1
## 1) "Cricket"
## 2) "Tennis"
## 3) "Boxing"
## 4) "Football"
## 5) "Wrestling"

ZADD nuts 4 "Apricots"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `ZRANGE`

Returns the specified range of elements in the sorted set stored at **`<key>`**.

**`ZRANGE`** can perform different types of range queries:

- By index (rank),
- By the score, or
- By lexicographical order.

**Time Complexity:** O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.

**Syntax:**

```sh
ZRANGE key start stop [BYSCORE | BYLEX] [REV] [LIMIT offset count] [WITHSCORES]
```

**Returns:**

- Array reply: List of elements in the specified range (optionally with their scores, in case the WITHSCORES option is given).

---

#### Index Ranges

By default, the command performs an index range query. The **`start`** and **`stop`** arguments represent zero-based indexes, where **`0`** is the first element, **`1`** is the next element, and so on. These arguments specify an **`inclusive range`**, so for example, **`ZRANGE myzset 0 1`** will return both the first and the second element of the sorted set.

The indexes can also be negative numbers indicating offsets from the end of the sorted set, with -1 being the last element of the sorted set, **`-2`** the penultimate element, and so on.

Out of range indexes do not produce an error.

- If **`start`** is greater than either the end index of the sorted set or **`stop`**, an empty list is returned.
- If **`stop`** is greater than the end index of the sorted set, Redis will use the last element of the sorted set.

**Examples:**

```sh
SADD nuts "Apricots" "Cashews" "Almonds"
## (integer) 3

ZADD sports 1 "Cricket" 2 "Football" 3 "Tennis" 4 "Boxing" 5 "Wrestling"
## (integer) 5

ZRANGE sports 0 -1
## 1) "Cricket"
## 2) "Football"
## 3) "Tennis"
## 4) "Boxing"
## 5) "Wrestling"

ZRANGE sports 5 -1
# (empty array)

ZRANGE sports 0 99
## 1) "Cricket"
## 2) "Tennis"
## 3) "Boxing"
## 4) "Football"
## 5) "Wrestling"

#----------------------------------------------------------------#
# Return all elements with scores
#----------------------------------------------------------------#
ZRANGE sports 0 -1 WITHSCORES
## 1) "Cricket"
## 2) "1"
## 3) "Tennis"
## 4) "3"
## 5) "Boxing"
## 6) "4"
## 7) "Football"
## 8) "5"
## 9) "Wrestling"
## 10) "5"

#----------------------------------------------------------------#
# Return all elements in the reverse order
#----------------------------------------------------------------#
ZRANGE sports 0 -1 REV
## 1) "Wrestling"
## 2) "Football"
## 3) "Boxing"
## 4) "Tennis"
## 5) "Cricket"

ZRANGE nonexisting 0 -1
## (empty array)

ZRANGE nuts 0 -1
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

#### Score Ranges

When the **`BYSCORE`** option is provided, the command behaves like **`ZRANGEBYSCORE`** and returns the range of elements from the sorted set having scores equal or between **`start`** and **`stop`**.

**`start`** and **`stop`** can be **`-inf`** and **`+inf`**, denoting the negative and positive infinities, respectively. This means that you are not required to know the highest or lowest score in the sorted set to get all elements from or up to a certain score.

By default, the score intervals specified by **`start`** and **`stop`** are closed (inclusive). It is possible to specify an open interval (exclusive) by prefixing the score with the character **`(`**.

**Examples:**

```sh
SADD nuts "Apricots" "Cashews" "Almonds"
## (integer) 3

ZADD cricketers -inf "Rohit Sharma" 1 "Virat Kohli" 2 "K.L. Rahul" 3 "Shreyas Iyer" +inf "Ravindra Jadeja"
## (integer) 5

ZRANGE cricketers -inf +inf BYSCORE
## 1) "Rohit Sharma"
## 2) "Virat Kohli"
## 3) "K.L. Rahul"
## 4) "Shreyas Iyer"
## 5) "Ravindra Jadeja"

ZRANGE cricketers 0 4 BYSCORE
## 1) "Virat Kohli"
## 2) "K.L. Rahul"
## 3) "Shreyas Iyer"

#----------------------------------------------------------------#
# Return all elements within -infinity < score <= infinity
#----------------------------------------------------------------#
ZRANGE cricketers (-inf +inf BYSCORE
## 1) "Virat Kohli"
## 2) "K.L. Rahul"
## 3) "Shreyas Iyer"
## 4) "Ravindra Jadeja"

#----------------------------------------------------------------#
# Return all elements within -infinity < score < infinity
#----------------------------------------------------------------#
ZRANGE cricketers (-inf (+inf BYSCORE
## 1) "Virat Kohli"
## 2) "K.L. Rahul"
## 3) "Shreyas Iyer"

#--------------------------------------------------------------------------------------#
# Return all elements within -infinity < score < infinity in reversed order with scores
#--------------------------------------------------------------------------------------#
ZRANGE cricketers +inf -inf BYSCORE REV WITHSCORES
## 1) "Ravindra Jadeja"
## 2) "inf"
## 3) "Shreyas Iyer"
## 4) "3"
## 5) "K.L. Rahul"
## 6) "2"
## 7) "Virat Kohli"
## 8) "1"
## 9) "Rohit Sharma"
## 10) "-inf"

ZRANGE cricketers 5 10 BYSCORE
## (empty array)

ZRANGE nonexisting -inf +inf BYSCORE
## (empty array)

ZRANGE nuts -inf +inf BYSCORE
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `ZCARD`

Returns the sorted set cardinality (number of elements) of the sorted set stored at **`key`**.

**Time Complexity:** O(1)

**Syntax:**

```sh
ZCARD key
```

**Returns:**

- Integer reply: The cardinality (number of elements) of the sorted set, or **`0`** if **`key`** does not exist.

**Examples:**

```sh
SADD nuts "Apricots" "Cashews" "Almonds"
## (integer) 3

ZADD sports 1 "Cricket" 2 "Football" 3 "Tennis" 4 "Boxing" 5 "Wrestling"
## (integer) 5

ZCARD sports
## (integer) 5

ZCARD nonexisting
## (integer) 0

ZCARD nuts
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `ZCOUNT`

Returns the number of elements in the sorted set at **`key`** with a score between **`min`** and **`max`**.

The **`min`** and **`max`** arguments have the same semantic as described for **`ZRANGEBYSCORE`**.

> **Note:** the command has a complexity of just O(log(N)) because it uses elements ranks (see **`ZRANK`**) to get an idea of the range. Because of this there is no need to do a work proportional to the size of the range.

**Time Complexity:** O(log(N)) with N being the number of elements in the sorted set.

**Syntax:**

```sh
ZCOUNT key min max
```

**Returns:**

- Integer reply: The number of elements in the specified score range.

**Examples:**

```sh
SADD nuts "Apricots" "Cashews" "Almonds"
## (integer) 3

ZADD cricketers -inf "Rohit Sharma" 1 "Virat Kohli" 2 "K.L. Rahul" 3 "Shreyas Iyer" +inf "Ravindra Jadeja"
## (integer) 5

#-----------------------------------------------------------------#
# Return count of all elements
#-----------------------------------------------------------------#
ZCOUNT cricketers -inf +inf
## (integer) 5

#-----------------------------------------------------------------#
# Return count of all elements within -infinity < score <= infinity
#-----------------------------------------------------------------#
ZCOUNT cricketers (-inf +inf
## (integer) 4

#-----------------------------------------------------------------#
# Return count of all elements within -infinity < score < infinity
#-----------------------------------------------------------------#
ZCOUNT cricketers (-inf (+inf
## (integer) 3

ZCOUNT nonexisting -inf +inf
## (integer) 0

ZCARD nuts -inf +inf
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `ZREM`

Removes the specified members from the sorted set stored at **1**. Non existing members are ignored.

**Time Complexity:** **`O(M*log(N))`** with **`N`** being the number of elements in the sorted set and **`M`** the number of elements to be removed.

**Syntax:**

```sh
ZCOUNT key min max
```

**Returns:**

- Integer reply: The number of members removed from the sorted set, not including non-existing members.
- Error: An error is returned when **`key`** exists and does not hold a sorted set.

**Examples:**

```sh
SADD nuts "Apricots" "Cashews" "Almonds"
## (integer) 3

ZADD cricketers -inf "Rohit Sharma" 1 "Virat Kohli" 2 "K.L. Rahul" 3 "Shreyas Iyer" +inf "Ravindra Jadeja"
## (integer) 5

ZREM cricketers "Shreyas Iyer" "K.L. Rahul"
## (integer) 2

ZRANGE cricketers 0 -1 WITHSCORES
## 1) "Rohit Sharma"
## 2) "-inf"
## 3) "Virat Kohli"
## 4) "1"
## 5) "Ravindra Jadeja"
## 6) "3"

ZCOUNT nonexisting "Cat" "Dog"
## (integer) 0

ZCOUNT nuts "Cashews" "Apricots"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `ZRANK`

Returns the rank of **`member`** in the sorted set stored at **`key`**, with the scores ordered from low to high. The rank (or index) is 0-based, which means that the **`member`** with the lowest score has rank **`0`**.

Use **[`ZREVRANK`](#zrevrank)** to get the rank of an element with the scores ordered from high to low.

**Time Complexity:** **`O(log(N))`**

**Syntax:**

```sh
ZRANK key member
```

**Returns:**

- If **`member`** exists in the sorted set, Integer reply: the rank of **`member`**.
- If **`member`** does not exist in the sorted set or **`key`** does not exist, Bulk string reply: **`nil`**.
- Error: An error is returned when **`key`** exists and does not hold a sorted set.

**Examples:**

```sh
SADD nuts "Apricots" "Cashews" "Almonds"
## (integer) 3

ZADD cricketers -inf "Rohit Sharma" 1 "Virat Kohli" 2 "K.L. Rahul" +inf "Ravindra Jadeja"
## (integer) 4

ZRANK cricketers "Rohit Sharma"
## (integer) 0

ZRANK cricketers "Sachin Tendulkar"
## (nil)

ZRANK nonexisting "Sachin Tendulkar"
## (nil)

ZRANK nuts "Cashews"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `ZREVRANK`

Returns the rank of **`member`** in the sorted set stored at **`key`**, with the scores ordered from high to low. The rank (or index) is 0-based, which means that the **`member`** with the highest score has rank **`0`**.

Use **[`ZRANK`](#zrank)** to get the rank of an element with the scores ordered from low to high.

**Time Complexity:** **`O(log(N))`**

**Syntax:**

```sh
ZRANK key member
```

**Returns:**

- If **`member`** exists in the sorted set, Integer reply: the rank of **`member`**.
- If **`member`** does not exist in the sorted set or **`key`** does not exist, Bulk string reply: **`nil`**.
- Error: An error is returned when **`key`** exists and does not hold a sorted set.

**Examples:**

```sh
SADD nuts "Apricots" "Cashews" "Almonds"
## (integer) 3

ZADD cricketers -inf "Rohit Sharma" 1 "Virat Kohli" 2 "K.L. Rahul" +inf "Ravindra Jadeja"
## (integer) 4

ZREVRANK cricketers "Rohit Sharma"
## (integer) 3

ZREVRANK cricketers "Sachin Tendulkar"
## (nil)

ZREVRANK nonexisting "Sachin Tendulkar"
## (nil)

ZREVRANK nuts "Cashews"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `ZSCORE`

Returns the score of **`member`** in the sorted set at **`key`**.

If member does not exist in the sorted set, or key does not exist, nil is returned.

**Time Complexity:** **`O(log(N))`**

**Syntax:**

```sh
ZRANK key member
```

**Returns:**

- Bulk string reply: The score of **`member`** (a double precision floating point number), represented as string. If **`member`** does not exist in the sorted set or **`key`** does not exist, Bulk string reply: **`nil`**.
- Error: An error is returned when **`key`** exists and does not hold a sorted set.

**Examples:**

```sh
SADD nuts "Apricots" "Cashews" "Almonds"
## (integer) 3

ZADD cricketers -inf "Rohit Sharma" 1 "Virat Kohli" 2 "K.L. Rahul" +inf "Ravindra Jadeja"
## (integer) 4

ZSCORE cricketers "Rohit Sharma"
## (integer) "-inf"

ZSCORE cricketers "Sachin Tendulkar"
## (nil)

ZSCORE nonexisting "Sachin Tendulkar"
## (nil)

ZSCORE nuts "Cashews"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `ZINCRBY`

Increments the score of **`member`** in the sorted set stored at **`key`** by **`increment`**. If **`member`** does not exist in the sorted set, it is added with **`increment`** as its score (as if its previous score was **`0.0`**). If **`key`** does not exist, a new sorted set with the specified **`member`** as its sole member is created.

An error is returned when **`key`** exists but does not hold a sorted set.

The **`score`** value should be the string representation of a numeric value, and accepts double precision floating point numbers. **It is possible to provide a negative value to decrement the score**.

**Time Complexity:** **`O(log(N))`** where **`N`** is the number of elements in the sorted set.

**Syntax:**

```sh
ZINCRBY key increment member
```

**Returns:**

- Bulk string reply: The new score of **`member`** (a double precision floating point number), represented as string.
- Error: An error is returned when **`key`** exists and does not hold a sorted set.

**Examples:**

```sh
SADD nuts "Apricots" "Cashews" "Almonds"
## (integer) 3

ZADD cricketers -inf "Rohit Sharma" 1 "Virat Kohli" 2 "K.L. Rahul" +inf "Ravindra Jadeja"
## (integer) 4

ZINCRBY cricketers 2 "Virat Kohli"
## "3"

ZINCRBY cricketers 1 "Sachin Tendulkar"
## "1"

ZRANGE cricketers 0 -1 WITHSCORES
## 1) "Rohit Sharma"
## 2) "-inf"
## 3) "Sachin Tendulkar"
## 4) "1"
## 5) "K.L. Rahul"
## 6) "2"
## 7) "Virat Kohli"
## 8) "3"
## 9) "Ravindra Jadeja"
## 10) "inf"

ZINCRBY nonexisting 1 "Sachin Tendulkar"
## "1"

ZRANGE nonexisting 0 -1 WITHSCORES
## 1) "Sachin Tendulkar"
## 2) "1"

ZINCRBY nuts 2 "Cashews"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `ZREMRANGEBYSCORE`

Removes all elements in the sorted set stored at **`key`** with a score between **`min`** and **`max`** (inclusive).

**Time Complexity:** **`O(log(N))`** where **`N`** is the number of elements in the sorted set.

**Syntax:**

```sh
ZREMRANGEBYSCORE key min max
```

**Returns:**

- Integer reply: The number of elements removed.
- Error: An error is returned when **`key`** exists and does not hold a sorted set.

**Examples:**

```sh
SADD nuts "Apricots" "Cashews" "Almonds"
## (integer) 3

ZADD cricketers -inf "Rohit Sharma" 1 "Virat Kohli" 2 "K.L. Rahul" 3 "Shreyas Iyer" +inf "Ravindra Jadeja"
## (integer) 5

ZREMRANGEBYSCORE cricketers 2 2
## (integer) 1

ZRANGE cricketers 0 -1 WITHSCORES
## 1) "Rohit Sharma"
## 2) "-inf"
## 3) "Virat Kohli"
## 4) "1"
## 5) "Shreyas Iyer"
## 6) "3"
## 7) "Ravindra Jadeja"
## 8) "inf"

ZREMRANGEBYSCORE cricketers 1 inf
## (integer) 3

ZRANGE cricketers 0 -1 WITHSCORES
## 1) "Rohit Sharma"
## 2) "-inf"

ZREMRANGEBYSCORE nonexisting -inf +inf
## (integer) 0

ZREMRANGEBYSCORE nuts -inf +inf
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `ZREMRANGEBYRANK`

Removes all elements in the sorted set stored at **`key`** with rank between **`start`** and **`stop`** (inclusive).

Both **`start`** and **`stop`** are 0-based indexes with **`0`** being the element with the lowest score. These indexes can be negative numbers, where they indicate offsets starting at the element with the highest score. For example: **`-1`** is the element with the highest score, **`-2`** the element with the second highest score and so forth.

**Time Complexity:** **`O(log(N)+M)`** with **`N`** being the number of elements in the sorted set and **`M`** the number of elements removed by the operation.

**Syntax:**

```sh
ZREMRANGEBYRANK key start stop
```

**Returns:**

- Integer reply: The number of elements removed.
- Error: An error is returned when **`key`** exists and does not hold a sorted set.

**Examples:**

```sh
SADD nuts "Apricots" "Cashews" "Almonds"
## (integer) 3

ZADD cricketers -inf "Rohit Sharma" 1 "Virat Kohli" 2 "K.L. Rahul" 3 "Shreyas Iyer" +inf "Ravindra Jadeja"
## (integer) 5

ZREMRANGEBYRANK cricketers 2 2
## (integer) 1

ZRANGE cricketers 0 -1
## 1) "Rohit Sharma"
## 2) "Virat Kohli"
## 3) "Shreyas Iyer"
## 4) "Ravindra Jadeja"

ZREMRANGEBYRANK cricketers 0 -1
## (integer) 4

ZRANGE cricketers 0 -1
## (empty array)

ZREMRANGEBYRANK nonexisting -inf +inf
## (integer) 0

ZREMRANGEBYSCORE nuts -inf +inf
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

## HyperLogLog Commands

### `PFADD`

Adds all the element arguments to the HyperLogLog data structure stored at the variable name specified as first argument.

As a side effect of this command the HyperLogLog internals may be updated to reflect a different estimation of the number of unique items added so far (the cardinality of the set).

If the approximated cardinality estimated by the HyperLogLog changed after executing the command, **`PFADD`** returns **`1`**, otherwise **`0`** is returned. The command automatically creates an empty HyperLogLog structure (that is, a Redis String of a specified length and with a given encoding) if the specified key does not exist.

To call the command without elements but just the variable name is valid, this will result into no operation performed if the variable already exists, or just the creation of the data structure if the key does not exist (in the latter case **`1`** is returned).

For an introduction to HyperLogLog data structure check the **[`PFCOUNT`](#pfcount)** command.

**Time Complexity:** **`O(1)`** to add every element.

**Syntax:**

```sh
PFADD key [element [element ...]]
```

**Returns:**

- Integer reply: **`1`** if at least 1 HyperLogLog internal register was altered. **`0`** otherwise.

**Examples:**

```sh
SADD nuts "Apricots" "Cashews" "Almonds"
## (integer) 3

PFADD hll a b c d e f g
## (integer) 1

PFADD hll a b c
## (integer) 0

PFADD nuts "Peanuts"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `PFCOUNT`

When called with a single key, returns the approximated cardinality computed by the HyperLogLog data structure stored at the specified variable, which is **`0`** if the variable does not exist.

When called with multiple keys, returns the approximated cardinality of the union of the HyperLogLogs passed, by internally merging the HyperLogLogs stored at the provided keys into a temporary HyperLogLog.

The HyperLogLog data structure can be used in order to count **unique** elements in a set using just a small constant amount of memory, specifically 12k bytes for every HyperLogLog (plus a few bytes for the key itself).

The returned cardinality of the observed set is not exact, but approximated with a standard error of **0.81%**.

For example in order to take the count of all the unique search queries performed in a day, a program needs to call PFADD every time a query is processed. The estimated number of unique queries can be retrieved with PFCOUNT at any time.

> **Note:** As a side effect of calling this function, it is possible that the HyperLogLog is modified, since the last 8 bytes encode the latest computed cardinality for caching purposes. So **`PFCOUNT`** is technically a write command.

**Time Complexity:** **`O(1)`** with a very small average constant time when called with a single key. **`O(N)`** with **`N`** being the number of keys, and much bigger constant times, when called with multiple keys.

**Syntax:**

```sh
PFCOUNT key [key ...]
```

**Returns:**

- Integer reply: The approximated number of unique elements observed via **`PFADD`**.

**Performances**

When **`PFCOUNT`** is called with a single key, performances are excellent even if in theory constant times to process a dense HyperLogLog are high. This is possible because the **`PFCOUNT`** uses caching in order to remember the cardinality previously computed, that rarely changes because most **`PFADD`** operations will not update any register. Hundreds of operations per second are possible.

When **`PFCOUNT`** is called with multiple keys, an on-the-fly merge of the HyperLogLogs is performed, which is slow, moreover the cardinality of the union can't be cached, so when used with multiple keys **`PFCOUNT`** may take a time in the order of magnitude of the millisecond, and should be not abused.

> **Note:** The user should take in mind that single-key and multiple-keys executions of this command are semantically different and have different performances.

**Examples:**

```sh
SADD nuts "Apricots" "Cashews" "Almonds"
## (integer) 3

PFADD hll a b c d e f g
## (integer) 1

PFADD hll2 1 2 3 4 5 6 7
## (integer) 1

PFCOUNT hll
## (integer) 7

PFCOUNT hll hll2
## (integer) 14

PFCOUNT nonexisting
## (integer) 0

PFCOUNT nuts
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `PFMERGE`

Merge multiple HyperLogLog values into a unique value that will approximate the cardinality of the union of the observed Sets of the source HyperLogLog structures.

The computed merged HyperLogLog is set to the destination variable, which is created if does not exist (defaulting to an empty HyperLogLog).

If the destination variable exists, it is treated as one of the source sets and its cardinality will be included in the cardinality of the computed HyperLogLog.

**Time Complexity:** **`O(N)`** to merge **`N`** HyperLogLogs, but with high constant times.

**Syntax:**

```sh
PFMERGE destkey sourcekey [sourcekey ...]
```

**Returns:**

- Simple string reply: The command just returns **OK**.
- Error: An error is returned when **`destkey`** or any of the **`sourcekeys`** exists and does not hold a HyperLogLog.

**Examples:**

```sh
SET name "Jayanta"
## OK

PFADD hll a b c d e f g
## (integer) 1

PFADD hll2 1 2 3 4 5 6 7
## (integer) 1

PFMERGE mergedHLL hll hll2
## OK

PFCOUNT mergedHLL
## (integer) 14

PFCOUNT mergedHLL hll hll2
## (integer) 14

PFCOUNT mergedHLL name hll hll2
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

## Hash Commands

### `HSET`

Sets **`field`** in the hash stored at **`key`** to **`value`**. If **`key`** does not exist, a new key holding a hash is created. If **`field`** already exists in the hash, it is overwritten.

**Time Complexity:** **`O(1)`** for each field/value pair added, so **`O(N)`** to add **`N`** field/value pairs when the command is called with multiple field/value pairs.

**Syntax:**

```sh
HSET key field value [field value ...]
```

**Returns:**

- Integer reply: The number of fields that were added.
- Error: An error is returned when **`key`** exists and does not hold a Hash.

**Examples:**

```sh
SADD nuts "Cashews" "Almonds" "Peanuts"
## (integer) 3

HSET tshirt01 name "Oversize Worldwide T-Shirt" sku KKXYZ123 quantity 1 price 1050.00 discount 0.00 tax 50.00 tax_inclusive true amount 1050.00
## (integer) 8

HSET nuts dry_fruits "Pistachios"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `HSETNX`

Sets **`field`** in the hash stored at **`key`** to **`value`**, only if **`field`** does not yet exist. If **`key`** does not exist, a new key holding a hash is created. If **`field`** already exists, this operation has no effect.

**Time Complexity:** **`O(1)`**

**Syntax:**

```sh
HSETNX key field value
```

**Returns:**

- Integer reply, specifically:
  - **`1`** if field is a new field in the hash and value was set.
  - **`0`** if field already exists in the hash and no operation was performed.
- Error: An error is returned when **`key`** exists and does not hold a Hash.

**Examples:**

```sh
SADD nuts "Cashews" "Almonds" "Peanuts"
## (integer) 3

HSET tshirt01 name "Oversize Worldwide T-Shirt" sku KKXYZ123 quantity 1 price 1050.00 discount 0.00 tax 50.00 tax_inclusive true amount 1050.00
## (integer) 8

HSETNX tshirt01 name "Bla bla bla"
## (integer) 0

HSETNX tshirt01 discount_code ""
## (integer) 1

HSETNX nuts dry_fruits "Pistachios"
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `HKEYS`

Returns all field names in the hash stored at **`key`**.

**Time Complexity:** **`O(N)`** where **`N`** is the size of the hash.

**Syntax:**

```sh
HKEYS key
```

**Returns:**

- Array reply: List of fields in the hash, or an empty list when **`key`** does not exist.
- Error: An error is returned when **`key`** exists and does not hold a Hash.

**Examples:**

```sh
SADD nuts "Cashews" "Almonds" "Peanuts"
## (integer) 3

HSET tshirt01 name "Oversize Worldwide T-Shirt" sku KKXYZ123 quantity 1 price 1050.00 discount 0.00 tax 50.00 tax_inclusive true amount 1050.00
## (integer) 8

HKEYS tshirt01
## 1) "name"
## 2) "sku"
## 3) "quantity"
## 4) "price"
## 5) "discount"
## 6) "tax"
## 7) "tax_inclusive"
## 8) "amount"

HKEYS nonexisting
## (empty array)

HKEYS nuts
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `HVALS`

Returns all values in the hash stored at **`key`**.

**Time Complexity:** **`O(N)`** where **`N`** is the size of the hash.

**Syntax:**

```sh
HVALS key
```

**Returns:**

- Array reply: List of values in the hash, or an empty list when **`key`** does not exist.
- Error: An error is returned when **`key`** exists and does not hold a Hash.

**Examples:**

```sh
SADD nuts "Cashews" "Almonds" "Peanuts"
## (integer) 3

HSET tshirt01 name "Oversize Worldwide T-Shirt" sku KKXYZ123 quantity 1 price 1050.00 discount 0.00 tax 50.00 tax_inclusive true amount 1050.00
## (integer) 8

HVALS tshirt01
## 1) "Oversize Worldwide T-Shirt"
## 2) "KKXYZ123"
## 3) "1"
## 4) "1050.00"
## 5) "0.00"
## 6) "50.00"
## 7) "true"
## 8) "1050.00"

HVALS nonexisting
## (empty array)

HVALS nuts
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `HGET`

Returns the **`value`** associated with **`field`** in the hash stored at **`key`**.

**Time Complexity:** **`O(1)`**

**Syntax:**

```sh
HGET key field
```

**Returns:**

- Bulk string reply: The **`value`** associated with **`field`**, or **`nil`** when **`field`** is not present in the hash or **`key`** does not exist.
- Error: An error is returned when **`key`** exists and does not hold a Hash.

**Examples:**

```sh
SADD nuts "Cashews" "Almonds" "Peanuts"
## (integer) 3

HSET tshirt01 name "Oversize Worldwide T-Shirt" sku KKXYZ123 quantity 1 price 1050.00 discount 0.00 tax 50.00 tax_inclusive true amount 1050.00
## (integer) 8

HGET tshirt01 sku
## "KKXYZ123"

HGET nonexisting sku
## (empty array)

HGET tshirt01 blah
## (empty array)

HGET nuts randomhash
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `HGETALL`

Returns all **`fields`** and **`values`** of the hash stored at **`key`**. In the returned value, every field name is followed by its value, so the length of the reply is twice the size of the hash.

**Time Complexity:** **`O(N)`** where **`N`** is the size of the hash.

**Syntax:**

```sh
HGETALL key
```

**Returns:**

- Array reply: List of fields and their values stored in the hash, or an empty list when **`key`** does not exist.
- Error: An error is returned when **`key`** exists and does not hold a Hash.

**Examples:**

```sh
SADD nuts "Cashews" "Almonds" "Peanuts"
## (integer) 3

HSET tshirt01 name "Oversize Worldwide T-Shirt" sku KKXYZ123 quantity 1 price 1050.00 discount 0.00 tax 50.00 tax_inclusive true amount 1050.00
## (integer) 8

HGETALL tshirt01
## 1) "name"
## 2) "Oversize Worldwide T-Shirt"
## 3) "sku"
## 4) "KKXYZ123"
## 5) "quantity"
## 6) "1"
## 7) "price"
## 8) "1050.00"
## 9) "discount"
## 10) "0.00"
## 11) "tax"
## 12) "50.00"
## 13) "tax_inclusive"
## 14) "true"
## 15) "amount"
## 16) "1050.00"

HGETALL nonexisting
## (empty array)

HGETALL nuts
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `HEXISTS`

Returns if **`field`** is an existing field in the hash stored at **`key`**.

**Time Complexity:** **`O(1)`**

**Syntax:**

```sh
HEXISTS key field
```

**Returns:**

- Integer reply, specifically:
  - **`1`** if the hash contains **`field`**.
  - **`0`** if the hash does not contain **`field`**, or **`key`** does not exist.
- Error: An error is returned when **`key`** exists and does not hold a Hash.

**Examples:**

```sh
SADD nuts "Cashews" "Almonds" "Peanuts"
## (integer) 3

HSET tshirt01 name "Oversize Worldwide T-Shirt" sku KKXYZ123 quantity 1 price 1050.00 discount 0.00 tax 50.00 tax_inclusive true amount 1050.00
## (integer) 8

HEXISTS tshirt01 sku
## (integer) 1

HEXISTS tshirt01 imaginaryField
## (integer) 0

HEXISTS nonexisting imaginaryField
## (integer) 0

HEXISTS nuts imaginaryField
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `HLEN`

Returns the number of fields contained in the hash stored at **`key`**.

**Time Complexity:** **`O(1)`**

**Syntax:**

```sh
HLEN key
```

**Returns:**

- Integer reply: number of fields in the hash, or **`0`** when **`key`** does not exist.
- Error: An error is returned when **`key`** exists and does not hold a Hash.

**Examples:**

```sh
SADD nuts "Cashews" "Almonds" "Peanuts"
## (integer) 3

HSET tshirt01 name "Oversize Worldwide T-Shirt" sku KKXYZ123 quantity 1 price 1050.00 discount 0.00 tax 50.00 tax_inclusive true amount 1050.00
## (integer) 8

HLEN tshirt01
## (integer) 8

HLEN nonexisting
## (integer) 0

HLEN nuts
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `HSTRLEN`

Returns the string length of the value associated with **`field`** in the hash stored at **`key`**. If the **`key`** or the **`field`** do not exist, **`0`** is returned.

**Time Complexity:** **`O(1)`**

**Syntax:**

```sh
HSTRLEN key field
```

**Returns:**

- Integer reply: The string length of the value associated with **`field`**, or **`0`** when **`field`** is not present in the hash or **`key`** does not exist at all.
- Error: An error is returned when **`key`** exists and does not hold a Hash.

**Examples:**

```sh
SADD nuts "Cashews" "Almonds" "Peanuts"
## (integer) 3

HSET tshirt01 name "Oversize Worldwide T-Shirt" sku KKXYZ123 quantity 1 price 1050.00 discount 0.00 tax 50.00 tax_inclusive true amount 1050.00
## (integer) 8

HSTRLEN tshirt01 sku
## (integer) 8

HSTRLEN tshirt01 imaginaryField
## (integer) 0

HSTRLEN nonexisting imaginaryField
## (integer) 0

HSTRLEN nuts imaginaryField
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `HINCRBY`

Increments the number stored at **`field`** in the hash stored at **`key`** by **`increment`**. If **`key`** does not exist, a new key holding a hash is created. If **`field`** does not exist the value is set to **`0`** before the operation is performed.

A negative integer provided as the **`increment`** will effectively do a decrement operation.

The range of values supported by **`HINCRBY`** is limited to 64 bit signed integers.

**Time Complexity:** **`O(1)`**

**Syntax:**

```sh
HINCRBY key field increment
```

**Returns:**

- Integer reply: The **`value`** at **`field`** after the increment operation.
- Error: An error is returned if one of the following conditions occur:
  - The **`field`** contains a **`value`** of the wrong **`type`** (not parseable as an integer).
  - The **`key`** exists and does not hold a Hash.

**Examples:**

```sh
SADD nuts "Cashews" "Almonds" "Peanuts"
## (integer) 3

HSET tshirt01 name "Oversize Worldwide T-Shirt" sku KKXYZ123 quantity 1 price 1050.00 discount 0.00 tax 50 tax_inclusive true amount 1050.00
## (integer) 8

HINCRBY tshirt01 tax 50
## (integer) 100

HINCRBY tshirt01 tax -50
## (integer) 50

HINCRBY tshirt01 compare_at_value 1200
## (integer) 1200

HKEYS tshirt01
## 1) "name"
## 2) "sku"
## 3) "quantity"
## 4) "price"
## 5) "discount"
## 6) "tax"
## 7) "tax_inclusive"
## 8) "amount"
## 9) "compare_at_value"

#-----------------------------------------------------------------------------------#
# Create a new hash if key doesn't exist and create a new hash key
#-----------------------------------------------------------------------------------#
HINCRBY nonexisting amount 1000
## (integer) 1000

HGETALL nonexisting
## 1) "amount"
## 2) "1000"

#-----------------------------------------------------------------------------------#
# Errors
#-----------------------------------------------------------------------------------#
HINCRBY tshirt01 name 50
## (error) ERR hash value is not an integer

HINCRBY nuts imaginaryField 200
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `HINCRBYFLOAT`

Increment the specified **`field`** of a hash stored at **`key`**, and representing a floating point number, by the specified **`increment`**. If the increment value is negative, the result is to have the hash field value **`decremented`** instead of incremented. If the field does not exist, it is set to **`0`** before performing the operation.

The exact behavior of this command is identical to the one of the **`INCRBYFLOAT`** command, please refer to the documentation of **[`INCRBYFLOAT`](#incrbyfloat)** for further information.

**Time Complexity:** **`O(1)`**

**Syntax:**

```sh
HINCRBYFLOAT key field increment
```

**Returns:**

- Bulk string reply: The **`value`** of **`field`** after the increment.
- Error: An error is returned if one of the following conditions occur:
  - The **`field`** contains a **`value`** of the wrong **`type`** (not a string).
  - The current **`field`** content or the specified **`increment`** are not parsable as a double precision floating point number.

**Examples:**

```sh
SADD nuts "Cashews" "Almonds" "Peanuts"
## (integer) 3

HSET tshirt01 name "Oversize Worldwide T-Shirt" sku KKXYZ123 quantity 1 price 1050.00 discount 0.00 tax 50.00 tax_inclusive true amount 1050.00
## (integer) 8

HINCRBYFLOAT tshirt01 tax 49.99
## "99.99"

HINCRBYFLOAT tshirt01 tax -49.99
## "50"

HINCRBYFLOAT tshirt01 compare_at_value 1499.99
## "1499.99"

HKEYS tshirt01
## 1) "name"
## 2) "sku"
## 3) "quantity"
## 4) "price"
## 5) "discount"
## 6) "tax"
## 7) "tax_inclusive"
## 8) "amount"
## 9) "compare_at_value"

#-----------------------------------------------------------------#
# Create a new hash if key doesn't exist and create a new hash key
#-----------------------------------------------------------------#
HINCRBYFLOAT nonexisting amount 1049.50
## "1049.50"

HGETALL nonexisting
## 1) "amount"
## 2) "1049.50"

#-----------------------------------------------------------------------------------#
# Errors
#-----------------------------------------------------------------------------------#
HINCRBYFLOAT tshirt01 name 51.25
## (error) ERR hash value is not a float

HINCRBYFLOAT nuts imaginaryField 231.50
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

### `HDEL`

Removes the specified fields from the hash stored at **`key`**. Specified fields that do not exist within this hash are ignored. If **`key`** does not exist, it is treated as an empty hash and this command returns **`0`**.

**Time Complexity:** **`O(N)`** where **`N`** is the number of fields to be removed.

**Syntax:**

```sh
HDEL key field [field ...]
```

**Returns:**

- Integer reply: the number of fields that were removed from the hash, not including specified but non existing fields.
- Error: An error is returned when **`key`** exists and does not hold a Hash.

**Examples:**

```sh
SADD nuts "Cashews" "Almonds" "Peanuts"
## (integer) 3

HSET tshirt01 name "Oversize Worldwide T-Shirt" sku KKXYZ123 quantity 1 price 1050.00 discount 0.00 tax 50.00 tax_inclusive true amount 1050.00
## (integer) 8

HDEL tshirt01 tax_inclusive quantity pokemon
## (integer) 2

HKEYS tshirt01
## 1) "name"
## 2) "sku"
## 3) "price"
## 4) "discount"
## 5) "tax"
## 6) "amount"

HDEL nonexisting imaginaryField
## (integer) 0

HDEL nuts imaginaryField
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

## Transaction Commands

### `MULTI`

Marks the start of a **[transaction](#transactions)** block. Subsequent commands will be queued for atomic execution using **`EXEC`**.

**Time Complexity:** **`O(1)`**

**Syntax:**

```sh
MULTI
```

**Returns:**

- Simple string reply: Always **`OK`**.

**Examples:**

```sh
MULTI
## OK

SADD stationery "Pens" "Pencil" "Ruler" "Sharpener" "Eraser"
## QUEUED

SMEMBERS stationery
## QUEUED

HSET employee name "Jayanta Samaddar" age 30 role "SDE-II" experience_in_years 5
## QUEUED

HGETALL employee
## QUEUED
```

---

### `EXEC`

Executes all previously queued commands in a transaction and restores the connection state to normal.

When using **`WATCH`**, **`EXEC`** will execute commands only if the watched keys were not modified, allowing for a **[check-and-set mechanism]**.

**Time Complexity:** Depends on commands in the transaction.

**Syntax:**

```sh
EXEC
```

**Returns:**

- Array reply: Each element being the reply to each of the commands in the atomic transaction.
- When using **`WATCH`**, **`EXEC`** can return a Null reply if the execution was aborted.

**Example:**

```sh
MULTI
## OK

SADD stationery "Pens" "Pencil" "Ruler" "Sharpener" "Eraser"
## QUEUED

SMEMBERS stationery
## QUEUED

HSET employee name "Jayanta Samaddar" age 30 role "SDE-II" experience_in_years 5
## QUEUED

HGETALL employee
## QUEUED

EXEC
## 1) (integer) 5
## 2) (integer) 4
## 3) 1) "Pens"
   ## 2) "Sharpener"
   ## 3) "Ruler"
   ## 4) "Pencil"
   ## 5) "Eraser"
## 4) 1) "name"
   ## 2) "Jayanta Samaddar"
   ## 3) "age"
   ## 4) "30"
   ## 5) "role"
   ## 6) "SDE-II"
   ## 7) "experience_in_years"
   ## 8) "5"
##
```

---

### `DISCARD`

Flushes all previously queued commands in a **[transaction](#transactions)** and restores the connection state to normal.

If **`WATCH`** was used, **`DISCARD`** unwatches all keys watched by the connection.

**Time Complexity:** **`O(1)`** for every key.

**Syntax:**

```sh
DISCARD
```

**Returns:**

- Simple string reply: always **`OK`**.

**Examples:**

```sh
MULTI
## OK

SADD stationery "Pens" "Pencil" "Ruler" "Sharpener" "Eraser"
## QUEUED

SMEMBERS stationery
## QUEUED

HSET employee name "Jayanta Samaddar" age 30 role "SDE-II" experience_in_years 5
## QUEUED

HGETALL employee
## QUEUED

DISCARD
## OK

EXEC
## (error) ERR EXEC without MULTI
```

---

### `WATCH`

Marks the given keys to be watched for conditional execution of a **[transaction](#transactions)**.

**Time Complexity:** **`O(1)`** for every key.

**Syntax:**

```sh
WATCH key [key ...]
```

**Returns:**

- Simple string reply: always **`OK`**.

**Examples:**

In **`Terminal 1`**

```sh
SADD stationery "Pens" "Pencil" "Ruler" "Sharpener" "Eraser"
## (integer) 5

HSET employee name "Jayanta Samaddar" age 30 role "SDE-II" experience_in_years 5
## (integer) 4
```

In **`Terminal 2`**,

```sh
MULTI
## OK

SADD stationery "Paper" "Ink"
## QUEUED

HGETALL employee
## QUEUED

SMEMBERS stationery
## QUEUED

EXEC
## 1) (integer) 2
## 2) 1) "name"
   ## 2) "Jayanta Samaddar"
   ## 3) "age"
   ## 4) "30"
   ## 5) "role"
   ## 6) "SDE-II"
   ## 7) "experience_in_years"
   ## 8) "5"
## 3) 1) "Ruler"
   ## 2) "Pencil"
   ## 3) "Sharpener"
   ## 4) "Paper"
   ## 5) "Pens"
   ## 6) "Eraser"
   ## 7) "Ink"

```

---

### `UNWATCH`

Flushes all the previously watched keys for a **[transaction](#transactions)**.

If you call **`EXEC`** or **`DISCARD`**, there's no need to manually call **`UNWATCH`**.

**Time Complexity:** **`O(1)`**

**Syntax:**

```sh
WATCH key [key ...]
```

**Returns:**

- Simple string reply: always **`OK`**.

**Examples:**

```sh
UNWATCH
```

---

## PUB/SUB Commands

### `PUBLISH`

---

### `SUBSCRIBE`

---

### `PSUBSCRIBE`

---

### `PUBSUB CHANNELS`

---

### `PUBSUB NUMSUB`

---

### `PUBSUB NUMPAT`

---

### `UNSUBSCRIBE`

---

## Universal Commands

### `KEYS`

Returns all keys matching pattern.

While the time complexity for this operation is O(N), the constant times are fairly low. For example, Redis running on an entry level laptop can scan a 1 million key database in 40 milliseconds.

> **Warning:** Consider **`KEYS`** as a command that should only be used in production environments with extreme care. It may ruin performance when it is executed against large databases. This command is intended for debugging and special operations, such as changing your keyspace layout. Don't use **`KEYS`** in your regular application code. If you're looking for a way to find keys in a subset of your keyspace, consider using **`SCAN`** or [sets](https://redis.io/topics/data-types#sets).

Supported glob-style patterns:

- **`h?llo`** matches **`hello`**, **`hallo`** and **`hxllo`**
- **`h*llo`** matches **`hllo`** and **`heeeello`**
- **`h[ae]llo`** matches **`hello`** and **`hallo`**, but not **`hillo`**
- **`h[^e]llo`** matches **`hallo`**, **`hbllo`**, ... but not **`hello`**
- **`h[a,c]llo`** matches **`hallo`** and **`hbllo`**
- **`h[a-c]llo`** matches **`hallo`**, **`hbllo`** and **`hcllo`**

Use **`\`** to escape special characters if you want to match them verbatim.

**Time Complexity**: O(N) with N being the number of keys in the database, under the assumption that the key names in the database and the given pattern have limited length.

**Syntax:**

```sh
KEYS pattern
```

**Returns:**

- Array reply: List of keys matching pattern.

**Examples:**

```sh
MSET name Jayanta email jayanta@zenius.one age 30 dob 15-08-1990 wallet 250 max_balance 4500
# OK

keys *
## Returns list of all keys
# 1) "age"
# 2) "dob"
# 3) "max_balance"
# 4) "name"
# 5) "wallet"
# 6) "email"

keys *e
## Returns list of keys ending with e
# 1) "age"
# 2) "max_balance"
# 3) "name"

keys *[^e]
## Returns list of keys NOT ending with e
# 1) "dob"
# 2) "wallet"
# 3) "email"

keys ?a*
## Returns list of keys whose second character is a
# 1) "max_balance"
# 2) "name"
# 3) "wallet"

keys *[b-d]*
## Returns list of keys which contain b, c or d
# 1) "dob"
# 2) "max_balance"
```

---

### `DEL`

Removes the specified keys. A key is ignored if it does not exist.

**Time Complexity:** O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).

**Syntax:**

```sh
DEL key [key ...]
```

**Returns:**

- Integer reply: The number of keys that were removed.

**Examples:**

```sh
# Setting some keys
SET name "Jayanta"
SET email "jayanta@zenius.one"
SET wallet 250

# Delete keys
DEL name email age
## (integer) 2

DEL wallet
## (integer) 1

DEL nonexisting
## (integer) 0

```

---

### `EXPIRE` / `PEXPIRE`

Set a timeout on **`key`**. After the timeout has expired, the key will automatically be deleted. A key with an associated timeout is often said to be **_volatile_** in Redis terminology.

The timeout will only be cleared by commands that delete or overwrite the contents of the key, including **`DEL`**, **`SET`**, **`GETSET`** and all the **`*STORE`** commands.

This means that all the operations that conceptually **_alter_** the value stored at the key without replacing it with a new one will leave the timeout untouched. For instance, incrementing the value of a key with **`INCR`**, pushing a new value into a list with **`LPUSH`**, or altering the field value of a hash with **`HSET`** are all operations that will leave the timeout untouched.

The timeout can also be cleared, turning the key back into a persistent key, using the **[`PERSIST`](#persist)** command.

If a key is renamed with **`RENAME`**, the associated time to live is transferred to the new key name.

If a key is overwritten by **`RENAME`**, like in the case of an existing key **`Key_A`** that is overwritten by a call like **`RENAME Key_B Key_A`**, it does not matter if the original **`Key_A`** had a timeout associated or not, the new key **`Key_A`** will inherit all the characteristics of **`Key_B`**.

> Note:
>
> - Calling **`EXPIRE`**/**`PEXPIRE`** with a non-positive timeout or **`EXPIREAT`**/**`PEXPIREAT`** with a time in the past will result in the key being deleted rather than expired (accordingly, the emitted key event will be **`del`**, not **`expired`**).
> - Use the **`PEXPIRE`** command that performs the same operation with milliseconds input.

**Time Complexity:** O(1)

**Syntax:**

```sh
EXPIRE key seconds [NX | XX | GT | LT]

PEXPIRE key miliseconds [NX | XX | GT | LT]
```

**Options:**

The **`EXPIRE`** command supports a set of options:

- `NX` -- Set expiry only when the key has no expiry
- `XX` -- Set expiry only when the key has an existing expiry
- `GT` -- Set expiry only when the new expiry is greater than current one
- `LT` -- Set expiry only when the new expiry is less than current one

A non-volatile key is treated as an infinite TTL for the purpose of **`GT`** and **`LT`**. The **`GT`**, **`LT`** and **`NX`** options are mutually exclusive.

**Returns:**

- Integer reply, specifically:

  - **`1`** if the timeout was set.
  - **`0`** if the timeout was not set. e.g. key doesn't exist, or operation skipped due to the provided arguments.

- Error: **`NX`** and **`XX`**, **`GT`** or **`LT`** options at the same time are not compatible

**Examples:**

```sh
SET coupon "BUY10"
## OK

EXPIRE coupon 60
## (integer) 1

EXPIRE nonexisting
## (integer) 0

#----------------------------------------------------------------#
# Set expiry only when the key has no expiry
#----------------------------------------------------------------#
EXPIRE coupon 100 NX
## (integer) 0
PERSIST coupon
## (integer) 1
EXPIRE coupon 100 NX
## (integer) 1

#----------------------------------------------------------------#
# Set expiry only when the key has existing expiry
#----------------------------------------------------------------#
EXPIRE coupon 100 XX
## (integer) 1
PERSIST coupon
## (integer) 1
EXPIRE coupon 100 XX
## (integer) 0

#----------------------------------------------------------------#
# Set expiry only when the new expiry is greater than current one
#----------------------------------------------------------------#
EXPIRE coupon 60
## (integer) 1
EXPIRE coupon 100 GT
## (integer) 1
EXPIRE coupon 10 GT
## (integer) 0

#----------------------------------------------------------------#
# Set expiry only when the new expiry is lesser than current one
#----------------------------------------------------------------#
EXPIRE coupon 60
## (integer) 1
EXPIRE coupon 30 LT
## (integer) 1
EXPIRE coupon 100 LT
## (integer) 0

#-----------------------------------------------------------------------------------#
# Set expiry on a Persistent key with options. (Expiry is Infinite)
#-----------------------------------------------------------------------------------#
PERSIST coupon
## (integer) 1

EXPIRE coupon 100 NX LT
## (error) ERR NX and XX, GT or LT options at the same time are not compatible

EXPIRE coupon 100 GT
## (integer) 0

EXPIRE coupon 100 LT
## (integer) 1
```

---

### `EXPIREAT` / `PEXPIREAT`

**`EXPIREAT`** has the same effect and semantic as **`EXPIRE`**, but instead of specifying the number of seconds representing the TTL (time to live), it takes an absolute [Unix timestamp](http://en.wikipedia.org/wiki/Unix_time) (seconds since January 1, 1970). A timestamp in the past will delete the key immediately.

Please for the specific semantics of the command refer to the documentation of **[`EXPIRE`](#expire)**.

> **Note:** Use the **`PEXPIREAT`** command that performs the same operation with milliseconds input.

**Time Complexity:** O(1)

**Syntax:**

```sh
EXPIREAT key unix-time-seconds [NX | XX | GT | LT]

PEXPIREAT key unix-time-miliseconds [NX | XX | GT | LT]
```

**Options:**

The **`EXPIRE`** command supports a set of options:

- `NX` -- Set expiry only when the key has no expiry
- `XX` -- Set expiry only when the key has an existing expiry
- `GT` -- Set expiry only when the new expiry is greater than current one
- `LT` -- Set expiry only when the new expiry is less than current one

A non-volatile key is treated as an infinite TTL for the purpose of **`GT`** and **`LT`**. The **`GT`**, **`LT`** and **`NX`** options are mutually exclusive.

**Returns:**

- Integer reply, specifically:

  - **`1`** if the timeout was set.
  - **`0`** if the timeout was not set. e.g. key doesn't exist, or operation skipped due to the provided arguments.

- Error: **`NX`** and **`XX`**, **`GT`** or **`LT`** options at the same time are not compatible

**Examples:**

```sh
SET coupon "BUY10"
## OK

EXPIREAT coupon 1663932862
## (integer) 1

EXPIREAT nonexisting 1663932862
## (integer) 0

#----------------------------------------------------------------#
# Set expiry only when the key has no expiry
#----------------------------------------------------------------#
EXPIREAT coupon 1665246830 NX
## (integer) 0
PERSIST coupon
## (integer) 1
EXPIREAT coupon 1665246830 NX
## (integer) 1

#----------------------------------------------------------------#
# Set expiry only when the key has existing expiry
#----------------------------------------------------------------#
EXPIREAT coupon 1665246830 XX
## (integer) 1
PERSIST coupon
## (integer) 1
EXPIREAT coupon 1665246830 XX
## (integer) 0

#----------------------------------------------------------------#
# Set expiry only when the new expiry is greater than current one
#----------------------------------------------------------------#
EXPIREAT coupon 1663932862
## (integer) 1
EXPIREAT coupon 1665246830 GT
## (integer) 1
EXPIREAT coupon 1663932862 GT
## (integer) 0

#----------------------------------------------------------------#
# Set expiry only when the new expiry is lesser than current one
#----------------------------------------------------------------#
EXPIREAT coupon 1665246830
## (integer) 1
EXPIREAT coupon 1663932862 LT
## (integer) 1
EXPIREAT coupon 1665246830 LT
## (integer) 0

#-----------------------------------------------------------------------------------#
# Set expiry on a Persistent key with options. (Expiry is Infinite)
#-----------------------------------------------------------------------------------#
PERSIST coupon
## (integer) 1

EXPIREAT coupon 1665246830 NX LT
## (error) ERR NX and XX, GT or LT options at the same time are not compatible

EXPIREAT coupon 1665246830 GT
## (integer) 0

EXPIREAT coupon 1665246830 LT
## (integer) 1
```

---

### `EXPIRETIME`

Returns the absolute Unix timestamp (since January 1, 1970) in seconds at which the given key will expire.

> **Note:** Use the **`PEXPIRETIME`** command which returns the same information with milliseconds resolution.

**Time Complexity:** O(1)

**Syntax:**

```sh
EXPIRETIME key

PEXPIRETIME key
```

**Returns:**

- Integer reply: Expiration Unix timestamp in seconds, or a negative value in order to signal an error (see the description below).

  - **`-1`** if the key exists but has no associated expiration time.
  - **`-2`** if the key does not exist.

**Examples:**

```sh
SET coupon "BUY10"
## OK

EXPIREAT coupon 1665246830
## (integer) 1

EXPIRETIME coupon
## (integer) 1665246830

PEXPIREAT coupon 1663934038304 XX
## (integer) 1

PEXPIRETIME coupon
## (integer) 1663934038304
```

---

### `PERSIST`

Remove the existing timeout on **`key`**, turning the key from **_volatile_** (a key with an expire set) to **_persistent_** (a key that will never expire as no timeout is associated).

**Time Complexity:** O(1)

**Syntax:**

```sh
TTL key
# or
PTTL key
```

**Returns:**

- Integer reply: Specifically,
  - **`1`** if the timeout was removed.
  - **`0`** if key does not exist or does not have an associated timeout.

**Examples:**

```sh
SET coupon "BUY10"
# OK

EXPIRE coupon 30
# (integer) 1

PERSIST coupon
# (integer) 1

PERSIST coupon
# (integer) 0

PERSIST nonexisting
# (integer) 0
```

---

### `TTL` and `PTTL`

Returns the remaining time to live of a key that has a timeout. This introspection capability allows a Redis client to check how many seconds a given key will continue to be part of the dataset.

Returns an error if the key does not exist or if the key exist but has no associated expire.

The return value in case of error:

- The command returns **`-2`** if the key does not exist.
- The command returns **`-1`** if the key exists but has no associated expire.

Use the **`PTTL`** command that returns the same information with milliseconds resolution.

**Time Complexity:** O(1)

**Syntax:**

```sh
TTL key
# or
PTTL key
```

**Returns:**

- Integer reply: TTL in seconds, or a negative value in order to signal an error (see the description above).

**Examples:**

```sh
SET name "Jayanta"
SET coupon "BUY10"
# OK

EXPIRE coupon 30
# (integer) 1

TTL coupon
# (integer) 30

PTTL coupon
# (integer) 30000

TTL nonexisting
# (integer) -2

TTL name
# (integer) -1
```

---

### SORT

Returns or stores the elements contained in the list, set or sorted set at key.

There is also the **`SORT_RO`** read-only variant of this command which is the `SORT` command without the **`[STORE destination]`** option.

**Time Complexity**: O(N+M\*log(M)) where N is the number of elements in the list or set to sort, and M the number of returned elements. When the elements are not sorted, complexity is O(N).

**Syntax:**

```sh
SORT key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern
  ...]] [ASC | DESC] [ALPHA] [STORE destination]
```

By default, sorting is numeric and elements are compared by their value interpreted as **`double precision floating point number`**.

This is **`SORT`** in its simplest form:

```
sort myList
```

**Returns:**

**Examples:**

```sh
SET name "Jayanta"
## OK

RPUSH names "Prince" "Jayanta" "Rohit" "Adraha"
## (integer) 3

RPUSH numbers 25 68 19 9 7 120
## (integer) 6

#-----------------------------------------------------------------------------------#
# Default SORT function
#-----------------------------------------------------------------------------------#
SORT numbers
## 1) "7"
## 2) "9"
## 3) "19"
## 4) "25"
## 5) "68"
## 6) "120"

#-----------------------------------------------------------------------------------#
# SORT Double Precision Floating-Point Numbers, Integers, Floats
#-----------------------------------------------------------------------------------#
SORT numbers DESC
## 1) "120"
## 2) "68"
## 3) "25"
## 4) "19"
## 5) "9"
## 6) "7"

#-----------------------------------------------------------------------------------#
# SORT List Elements as Strings
#-----------------------------------------------------------------------------------#
SORT numbers ALPHA
## 1) "120"
## 2) "19"
## 3) "25"
## 4) "68"
## 5) "7"
## 6) "9"

SORT names ALPHA
## 1) "Adraha"
## 2) "Jayanta"
## 3) "Prince"
## 4) "Rohit"

SORT names ALPHA DESC
## 1) "Rohit"
## 2) "Prince"
## 3) "Jayanta"
## 4) "Adraha"

#-----------------------------------------------------------------------------------#
# SORT List Elements and Store the Sorted List
#-----------------------------------------------------------------------------------#
SORT numbers STORE numbers
## (integer) 6

LRANGE numbers 0 -1
## 1) "120"
## 2) "68"
## 3) "25"
## 4) "19"
## 5) "9"
## 6) "7"

SORT numbers DESC sorted_numbers
## (integer) 6

LRANGE sorted_numbers 0 -1
## 1) "120"
## 2) "68"
## 3) "25"
## 4) "19"
## 5) "9"
## 6) "7"

#-----------------------------------------------------------------------------------#
# SORT and return the first 2 elements, lexicographically sorted in descending order:
#-----------------------------------------------------------------------------------#
SORT names ALPHA DESC LIMIT 0 2
## 1) "Rohit"
## 2) "Prince"

#-----------------------------------------------------------------------------------#
# Non-Existing List and Errors
#-----------------------------------------------------------------------------------#
SORT nonexisting ALPHA
## (empty array)

SORT names DESC
## (error) ERR One or more scores can't be converted into double

SORT name ALPHA
## (error) WRONGTYPE Operation against a key holding the wrong kind of value
```

---

## Server Management Commands

### `FLUSHDB`

Delete all the keys of the currently selected DB. This command never fails.

By default, **`FLUSHDB`** will synchronously flush all the databases. Starting with Redis 6.2, setting the **`lazyfree-lazy-user-flush`** configuration directive to "yes" changes the default flush mode to asynchronous.

It is possible to use one of the following modifiers to dictate the flushing mode explicitly:

- **`ASYNC`**: flushes the databases asynchronously
- **`SYNC`**: flushes the databases synchronously

> **Note:** An asynchronous **`FLUSHDB`** command only deletes keys that were present at the time the command was invoked. Keys created during an asynchronous flush will be unaffected.

**Time Complexity:** O(N) where N is the total number of keys in all databases

**Syntax:**

```sh
FLUSHDB [ASYNC | SYNC]
```

**Returns:**

- Simple string reply

**Example:**

```sh
MSET name "Jayanta" age 30 email jayanta@zenius.one
# OK

KEYS *
# 1) "age"
# 2) "email"
# 3) "name"

FLUSHDB
# (empty array)
```

---

### `FLUSHALL`

Delete all the keys of all the existing databases, not just the currently selected one. This command never fails.

By default, **`FLUSHALL`** will synchronously flush all the databases. Starting with Redis 6.2, setting the **`lazyfree-lazy-user-flush`** configuration directive to "yes" changes the default flush mode to asynchronous.

It is possible to use one of the following modifiers to dictate the flushing mode explicitly:

- **`ASYNC`**: flushes the databases asynchronously
- **`SYNC`**: flushes the databases synchronously

> **Note:** An asynchronous **`FLUSHALL`** command only deletes keys that were present at the time the command was invoked. Keys created during an asynchronous flush will be unaffected.

**Time Complexity:** O(N) where N is the total number of keys in all databases

**Syntax:**

```sh
FLUSHALL [ASYNC | SYNC]
```

**Returns:**

- Simple string reply

**Example:**

```sh
MSET name "Jayanta" age 30 email jayanta@zenius.one
# OK

KEYS *
# 1) "age"
# 2) "email"
# 3) "name"

FLUSHALL
# (empty array)
```

---

# [Data Persistence and Recovery](https://redis.io/docs/manual/persistence/)

You maybe wondering, **"How can an in-memory database persist data?"**

'Cause if the Redis process or the server on which Redis is running fails, all the data in memory is gone, right? And if the data is gone, how can one recover it? Basically how can one be confident that the data is safe?

The simplest way to have data backups is by replicating Redis. So if the Redis master instance goes down, the replicas will still be running and have all the data. So if you have a replicated Redis, the replicas will have the data but if all the Redis instances including their replicas go down, you will lose the data with no replica remaining. So we need real persistence.

Redis has multiple mechanisms for persisting the data for keeping the data safe:

1. **Snapshots (RDB)** - The RDB persistence performs point-in-time snapshots of your dataset at specified intervals (based on time or number of writes passed). This will be stored on disk. This is great for backups and disaster recovery. Note that we will still lose the last minutes of data because we do snapshotting every 5 minutes or an hour depending on your needs.

2. **AOF (Append only File)** - The AOF persistence logs every write operation received by the server, that will be played again at server startup, reconstructing the original dataset.

3. **No Persistence** - If you wish, you can disable persistence completely, if you want your data to just exist as long as the server is running.

4. **RDB + AOF** - It is possible to combine both **AOF** and **RDB** in the same instance. Notice that, in this case, when Redis restarts the AOF file will be used to reconstruct the original dataset since it is guaranteed to be the most complete.

The most important thing to understand is the different trade-offs between the RDB and AOF persistence.

## RDB

### Advantages of RDB

1. RDB is a very compact single-file point-in-time representation of your Redis data. RDB files are perfect for backups. For instance you may want to archive your RDB files every hour for the latest 24 hours, and to save an RDB snapshot every day for 30 days. This allows you to easily restore different versions of the data set in case of disasters.

2. RDB is very good for disaster recovery, being a single compact file that can be transferred to far data centers, or onto Amazon S3 (possibly encrypted).

3. RDB maximizes Redis performances since the only work the Redis parent process needs to do in order to persist is forking a child that will do all the rest. The parent process will never perform disk I/O or alike.

4. RDB allows faster restarts with big datasets compared to AOF.

5. On replicas, RDB supports [partial resynchronizations after restarts and failovers](https://redis.io/topics/replication#partial-resynchronizations-after-restarts-and-failovers).

### Disadvantages of RDB

1. RDB is NOT good if you need to minimize the chance of data loss in case Redis stops working (for example after a power outage). You can configure different save points where an RDB is produced (for instance after at least five minutes and 100 writes against the data set, you can have multiple save points). However you'll usually create an RDB snapshot every five minutes or more, so in case of Redis stopping working without a correct shutdown for any reason you should be prepared to lose the latest minutes of data.

2. RDB needs to **`fork()`** often in order to persist on disk using a child process. **`fork()`** can be time consuming if the dataset is big, and may result in Redis stopping serving clients for some milliseconds or even for one second if the dataset is very big and the CPU performance is not great. AOF also needs to **`fork()`** but less frequently and you can tune how often you want to rewrite your logs without any trade-off on durability.

---

## AOF

### Advantages of AOF

1. Using AOF Redis is much more durable: you can have different fsync policies: no fsync at all, fsync every second, fsync at every query. With the default policy of fsync every second, write performance is still great. fsync is performed using a background thread and the main thread will try hard to perform writes when no fsync is in progress, so you can only lose one second worth of writes.

2. The AOF log is an append-only log, so there are no seeks, nor corruption problems if there is a power outage. Even if the log ends with a half-written command for some reason (disk full or other reasons) the redis-check-aof tool is able to fix it easily.

3. Redis is able to automatically rewrite the AOF in background when it gets too big. The rewrite is completely safe as while Redis continues appending to the old file, a completely new one is produced with the minimal set of operations needed to create the current data set, and once this second file is ready Redis switches the two and starts appending to the new one.

4. AOF contains a log of all the operations one after the other in an easy to understand and parse format. You can even easily export an AOF file. For instance even if you've accidentally flushed everything using the FLUSHALL command, as long as no rewrite of the log was performed in the meantime, you can still save your data set just by stopping the server, removing the latest command, and restarting Redis again.

### Disadvantages of AOF

1. AOF files are usually bigger than the equivalent RDB files for the same dataset.

2. AOF can be slower than RDB depending on the exact fsync policy. In general with fsync set to every second performance is still very high, and with fsync disabled it should be exactly as fast as RDB even under high load. Still RDB is able to provide more guarantees about the maximum latency even in the case of a huge write load.

**On Redis < 7.0**

3. AOF can use a lot of memory if there are writes to the database during a rewrite (these are buffered in memory and written to the new AOF at the end).

4. All write commands that arrive during rewrite are written to disk twice.

5. Redis could freeze writing and fsyncing these write commands to the new AOF file at the end of the rewrite.

---

## Durability and Recovery

It is a best practice to separate servers that run the Redis database and where data is backed up.

For example: If your applications and services run in the cloud on AWS EC2 instance, you should use Elastic Block Storage (EBS) to persist your data instead of storing the data on the EC2 instance's hard drive. This is because, if the EC2 instance died, you want have access to any of its storage, whether it is RAM or disk or whatever.

So if you want persistence and durability for your data, you must put your data outside your instances on an external network storage. As a result, by decoupling the database and the backup, even if all the server instances fail, you still have the data on disk unaffected. You can just spin up other instances and pull the data from the separate storage, like EBS.

---

# Optimizing Memory Costs with Redis on Flash

The question that maybe lingering is - **"Isn't storing data on memory expensive?"**

You would need more servers compared to a database that stores data on disk simply because memory is limited in size. So there's a trade-off between cost and performance. Redis has a way to optimize this using a service called Redis on Flash, which is part of Redis Enterprise.

Redis on Flash extends the RAM to the Flash Drive or SSD where frequently used values are stored in memory (RAM) and infrequently used values are stored on disk (SSD).

So for Redis, this is more RAM-like latency and performance on the server. This means, Redis can use more of the underlying infrastructure and server resources by using both RAM and SSD, increasing the storage capacity on each server and saving infrastructure costs.

---

# Scaling Redis

Let's say, your single Redis instance runs out of memory, i.e. becomes too large to hold in memory or the Redis instance becomes a bottleneck and cannot handle any more requests. In such case, how do you increase the capacity and memory size for your Redis database? In other words, How do we scale a Redis Database?

We have several options.

## Clustering

Redis supports **clustering**. This means you can have a primary or master Redis instance for reading and writing, and you can have multiple replicas of that primary instance for reading the data. This way you can scale Redis to handle more requests and in addition increase the high availability of your database, because if the master fails, one of the replicas can take over and your Redis database can continue functioning without any issues.

All replicas hold copies of the data of the primary instance, hence the more replicas you have, the more space you need as one server may not have sufficient memory for all your replicas. In addition, having multiple replicas on one server defeats the purpose of replicas because if that server fails, multiple replicas are gone. Instead, you want to distribute these replicas among different servers or nodes.

But what if the dataset grows too large to fit in a single server? In other words, what if the primary instance gets capped for writes? This is when we use **sharding**.

## Sharding

Sharding is a general concept in databases that means you take the complete dataset and divide it into smaller subsets of data called shards, which are then responsible for their own subset of data. That means that instead of having one master instance that handles the complete dataset, we can now shard it into let's say, 4 shards, each of them responsible for Reads and Writes to a subset of the data. Each shard also needs less memory capacity because they just have 1/4th of the total data. This means you can distribute and run shards on smaller nodes and basically scale your cluster horizontally.

As the databse grows, these shards can be re-sharded it in even smaller chunks and create more shards.

---

# High Availability across Geo-locations

## Problem

Let's consider another scenario where applications need even higher availability and performance across multiple geographic locations.

For example: You have a Redis database cluster in one region, in the datacenter of London (EU). But we have the two following use cases:

1. Users are geographically distributed and accessing the application all over the world. So we want to distribute our application and data services globally close to the users to give our users better performance.
2. Disaster Recovery - If the datacenter in London (EU) goes down, we want an immediate switch over to another data center so that the Redis service stays available. In other words, we want replicas of the whole Redis cluster in datacenters in multiple geographic locations.

This means a single dataset must be replicated to many clusters, spread across multiple geographic locations, with each cluster being fully able to accept reads and writes.

## Solution

You will have multiple Redis clusters that will act as local Redis instances in each region.

Say Cluster01 (EU), Cluster02 (US)

The data will now be synced across these geographically distributed clusters. This is a feature available in Redis Enterprise called Active-Active Deployment because you have multiple active databases in multiple locations.

So with this setup we will have lower latency for the users and even if the Redis database in one region completely goes down, the other regions will be unaffected.

## Data Integrity and Consistency

If a connection or syncing between two regions breaks for a short time, because of some network problem or some reason, the Redis clusters in these regions can update the data independently and once connection is re-established, they can sync up those changes again.

Now the first question that may pop up on your mind is - **"How does Redis resolve the changes in multiple regions to the same dataset?"**

So if the same data changed in multiple regions, how does Redis make sure that the data changes of any region is not lost and data is correctly synced.

For this particular problem, Redis Enterprise uses a concept called **Conflict-Free Replicated Data Types (CRDT)**. This concept is used to resolve any conflicts automatically at the database level without any data loss.

**Conflict 1: Concurrent SETs**

| Time | Instance A           | Instance B           |
| ---- | -------------------- | -------------------- |
| t1   | SET key1 "value1"    |                      |
| t2   |                      | SET key1 "value2"    |
| t3   | SYNC                 | SYNC                 |
| t4   | GET key1 => "value2" | GET key1 => "value2" |

**Resolution:** Last Write Wins

Outcome of concurrent writes is predictable and based on a set of rules. Dataset will eventually converge to a single, consistent state.

**Conflict 2: APPEND vs DEL**

| Time | Instance A                | Instance B                |
| ---- | ------------------------- | ------------------------- |
| t1   | SET key1 "Hello"          |                           |
| t2   | SYNC                      | SYNC                      |
| t3   | APPEND key1 " there"      |                           |
| t3   |                           | DEL key1                  |
| t5   | SYNC                      | SYNC                      |
| t6   | GET key1 => "Hello there" | GET key1 => "Hello there" |

**Resolution:** APPEND wins

As we learned, Redis uses multiple data types, so for each data type, Redis Enterprise uses its own data conflict resolution rules, that are most optimal for that data type. Instead of just overriding the changes of one source and just discarding all the others, all the parallel changes are kept and intelligently resolved.

---

# Running Redis on Kubernetes

---
