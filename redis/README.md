# Table of Contents

- [Table of Contents](#table-of-contents)
- [What is Redis?](#what-is-redis)
- [Architecture](#architecture)
- [Advantages](#advantages)
- [Setup and Installation](#setup-and-installation)
  - [Setup using Docker](#setup-using-docker)
  - [Setup in Linux](#setup-in-linux)
- [Commands](#commands)
  - [String Commands](#string-commands)
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
  - [List Commands](#list-commands)
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
    - [`BLPOP`](#blpop)
      - [**Overview**](#overview)
      - [**Non-Blocking Behaviour**](#non-blocking-behaviour)
      - [**Blocking Behaviour**](#blocking-behaviour)
      - [**Examples**](#examples)
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
- [Data Types](#data-types)
  - [Strings](#strings)
    - [Overview](#overview-1)
    - [String Commands](#string-commands-1)
  - [Lists](#lists)
    - [List Commands](#list-commands-1)
  - [Streams](#streams)

# What is Redis?

Redis is an open source (BSD licensed), in-memory **data structure store** used as a NoSQL database, cache, message broker, and streaming engine.

Following the footsteps of other NoSQL Databases like Cassandra, CouchDB and MongoDB, Redis allows the user to store vast amounts of data without the limits of relational databases.

---

# Architecture

There are two main processes in Redis architecture:

1. Redis Console Client
2. Redis Server

This client and server can be on the same computer or on two different computers. Redis can also be configured as a Master-Slave configuration for distributed systems.

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

# Setup and Installation

## [Setup using Docker](https://redis.io/docs/stack/get-started/install/docker/)

- [Download Redis Image from Docker Hub](https://hub.docker.com/_/redis)
- Start a Redis Instance - `docker run --name some-redis -p [containerPort:hostPort] -d redis`
- Connecting via redis-cli - `docker exec -it some-redis redis-cli`
- For other options, check the Docker Hub page above.

## [Setup in Linux](https://redis.io/docs/stack/get-started/install/linux/)

- Update the package manager - `sudo apt update`
- Install Redis Server - `sudo apt install redis-server`
- Start Redis Server as a background process - `redis-server &`
- Enter Redis CLI to use Redis - `redis-cli`

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

### `BLPOP`

#### **Overview**

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

#### **Non-Blocking Behaviour**

When **`BLPOP`** is called, if at least one of the specified keys contains a non-empty list, an element is popped from the head of the list and returned to the caller together with the key it was popped from.

Keys are checked in the order that they are given. Let's say that the key **`list1`** doesn't exist and **`list2`** and **`list3`** hold non-empty lists. Consider the following command:

```sh
BLPOP list1 list2 list3 0
```

**`BLPOP`** guarantees to return an element from the list stored at **`list2`** (since it is the first non empty list when checking **`list1`**, **`list2`** and **`list3`** in that order).

---

#### **Blocking Behaviour**

If none of the specified keys exist, **`BLPOP`** blocks the connection until another client performs an **`LPUSH`** or **`RPUSH`** operation against one of the keys.

Once new data is present on one of the lists, the client returns with the name of the key unblocking it and the popped value.

When **`BLPOP`** causes a client to block and a **`non-zero timeout`** is specified, the client will unblock returning a **`nil`** multi-bulk value when the specified timeout has expired without a push operation against at least one of the specified keys.

**The timeout argument is interpreted as a double value specifying the maximum number of seconds to block**. A timeout of zero can be used to block indefinitely.

---

#### **Examples**

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

## Streams

---
