# Frequently Asked Questions / Problems and their Solutions

#### How to check if the element is an Array?

**Problem:**
The Javascript property `typeof` returns the typeof for Arrays as Object, which may make it difficult to detect if it is indeed an Array or a regular Object.

**Example Use Case:**
Processing an API request of adding a customer, where you want to limit processing of Bulk adds.

**Solution:**
Define an isArray variable that stores a Boolean value if an Array is found.

**Method 1:**
`const isArray = Object.prototype.toString.call(req.body) == "[object Array]" ? true : false;`

**Method 2:**
`const isArray = Array.isArray(req.body);`

```
if(isArray) {
    return res.status(400).json({ error: "Adding Customers in Bulk is not supported." });
}
```

------------------------------------------------------------------------------------------------------

