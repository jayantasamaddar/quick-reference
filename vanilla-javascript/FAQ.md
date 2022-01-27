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

#### How to prevent default behaviour of an element?
Calling `preventDefault()` during any stage of event flow cancels the event, meaning that any default action normally taken by the implementation as a result of the event will not occur. 

The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.

The event continues to propagate as usual, unless one of its event listeners calls stopPropagation() or stopImmediatePropagation(), either of which terminates propagation at once.

As noted below, calling preventDefault() for a non-cancelable event, such as one dispatched via EventTarget.dispatchEvent(), without specifying cancelable: true has no effect. 

This is effective on form submit buttons where we want the form submit button to run an event handler without the form's default way of submitting forms, which refreshes the page.