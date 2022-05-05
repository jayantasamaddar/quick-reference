# What is Firebase?

Firebase is a Backend-as-a-Service (Baas) platform developed by Google for creating mobile and web applications. It was originally an independent company founded in 2011. In 2014, Google acquired the platform and it is now their flagship offering for app development.

Simply put, Firebase is a swiss army knife of backend services. You can do many things easily, but if you use without considering the future, especially scale, you might get yourself cut by the same knife.

However, if you are a startup and looking to go-to-market quickly, Firebase is a great choice to create rapid prototypes by taking out the hassle out of building the backend for applications.

---

# Getting Started

- Visit `console.firebase.com`.
- Add a new Project.
- Enable or Disable Google Analytics for the Project.
- Register an App (Web, Android, ioS, Unity) by giving the app a name.
- Initialize Firebase SDK (Use npm or a Script tag) in a file, `firestore.js` in your app. 
  
> **Note**: Any APIKey or sensitive data is expected to be saved in an `.env` and accessed via `KEY`.

**In `firestore.js`**
```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const { FIREBASE_APP_KEY, FIREBASE_APP_PROJECT_ID, FIREBASE_MESSAGE_SENDER_ID, FIREBASE_APP_ID } = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_APP_KEY,
  authDomain: `${FIREBASE_APP_PROJECT_ID}.firebaseapp.com`,
  projectId: FIREBASE_APP_PROJECT_ID,
  storageBucket: `${FIREBASE_APP_PROJECT_ID}.appspot.com`,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

// Initialize SDKs for Firebase products
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
```

---

# Sections
Firebase comes with a lot of tools divided into four primary sections based on application lifecycle: 

1. ### Build - The build section comprises of the following tools:

   - **Authentication**
   - **Firestore Database**
   - **Realtime Database**
   - **Storage**
   - **Hosting**
   - **Functions**
   - **Machine Learning**

2. ### Release & Monitor
3. ### Analytics
4. ### Engage

---

# Authentication
The in-built authentication tools of Firebase, helps to easily authenticate with a bunch of authentication providers as well as standard **email/password** and **phone**.

The various methods available are:
- [Email/Password](https://firebase.google.com/docs/auth/web/password-auth)
- Phone
- Anonymous
- Google
- Facebook
- Play Games
- Game Center
- Apple
- GitHub
- Microsoft
- Twitter
- Yahoo

---

# [Firestore Database](https://firebase.google.com/docs/firestore/quickstart)
Firestore Database is google's offering for NoSQL Document Database based on MongoDB, within the Firebase stack.


### Understanding Cloud Firestore
Read the docs - **[HERE](https://firebase.google.com/docs/firestore/rtdb-vs-firestore)**


### [Setup](https://firebase.google.com/docs/firestore/quickstart)
- Click **Create Database**
- Start in **`production`** or **`test`** mode.
  
  In `production`: Your data is private by default. Client read/write access will only be granted as specified by your security rules. 

  The default security rules for `test` mode allow anyone with your database reference to view, edit and delete all data in your database for the next 30 days.

- Set up **[Cloud Firebase location](https://firebase.google.com/docs/functions/locations)** - After you set this location, you cannot change it later. Also, this location setting will be the location for your default Cloud Storage bucket.

> **Note**: *Enabling Cloud Firestore will prevent you from using Cloud Datastore with this project, notably from the associated App Engine app* 

- Set up **[Firestore Rules](https://firebase.google.com/docs/firestore/security/get-started)** - By default we are not allowed to make read or write operations. Click the Rules tab and modify the rules to `allow read, write: if true;`. As the project evolves the rules may change and need to be re-modified, added to. Click **`Publish`**.


### [Choosing a Data Structure](https://firebase.google.com/docs/firestore/manage-data/structure-data)


### [Data Model](https://firebase.google.com/docs/firestore/data-model)

### [Data Types](https://firebase.google.com/docs/firestore/manage-data/data-types)

---

## CREATING DATA

### [Adding Data to Cloud Firestore](https://firebase.google.com/docs/firestore/manage-data/add-data)
There are several ways to write data to Cloud Firestore:

- Set the data of a document within a collection, explicitly specifying a document identifier.
- Add a new document to a collection. In this case, Cloud Firestore automatically generates the document identifier.
- Create an empty document with an automatically generated identifier, and assign data to it later.

This guide explains how to use the set, add, or update individual documents in Cloud Firestore. If you want to write data in bulk, see [Transactions and Batched Writes](https://firebase.google.com/docs/firestore/manage-data/transactions).


#### [Add a Document](https://firebase.google.com/docs/firestore/quickstart?hl=en#add_data)
Cloud Firestore stores data in Documents, which are stored in Collections. Cloud Firestore creates collections and documents implicitly the first time you add data to the document. You do not need to explicitly create collections or documents.

Create a new collection and a document using the following example code.

```
import { collection, addDoc } from "firebase/firestore"; 

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
```

---

## UPDATING DATA
### [Set a Document](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en#set_a_document)
The `set()` method can be used to create or overwrite a single document:

- If the document does not exist, it will be created. The `set()` method requires an `id` parameter to be passed, so if you want to create a new document whose `id` you want to be autogenerated, then use the `add()` method to create a document.
- If the document does exist, its contents will be overwritten with the newly provided data, unless you specify that the data should be merged into the existing document, as follows:

**Syntax:** 
```
import { doc, setDoc } from "firebase/firestore";

await setDoc(doc(db, "users", res.user.uid), {
  ...formData,
  timeStamp: serverTimestamp(),
});
```

**Where**,
- **`db`** is the initialized Firestore database.
- **`users`** is the collection name. (Collection is same as collection in MongoDB)
- **`res.user.uid`** is the `id` of the document.


---

## READING DATA

### Get Multiple Documents from a Collection
You can also retrieve multiple documents with one request by querying documents in a collection. For example, you can use `where()` to query for all of the documents that meet a certain condition, then use `get()` to retrieve the results:

```
import { collection, query, where, getDocs } from "firebase/firestore";

const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
```

**Where**,
- **`db`** is the initialized Firestore database.
- **`cities`** is the collection name. (Collection is same as collection in MongoDB)
- **`where("capital", "==", true)`** is the condition for the query to match.



### Get All Documents in a Collection
In addition, you can retrieve all documents in a collection by omitting the `where()` filter entirely:

```
import { collection, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "cities"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
```

### [Order and Limit Data](https://firebase.google.com/docs/firestore/query-data/order-limit-data#order_and_limit_data)
By default, a query retrieves all documents that satisfy the query in ascending order by document ID. You can specify the sort order for your data using `orderBy()`, and you can limit the number of documents retrieved using `limit()`.

**For example, you could query for the first 3 cities alphabetically with:**
```
import { query, orderBy, limit } from "firebase/firestore";  

const q = query(citiesRef, orderBy("name"), limit(3));
```

**You could also sort in descending order to get the last 3 cities::**
```
import { query, orderBy, limit } from "firebase/firestore";  

const q = query(citiesRef, orderBy("name", "desc"), limit(3));
```

---

### [Query Cursors](https://firebase.google.com/docs/firestore/query-data/query-cursors)
With query cursors in Cloud Firestore, you can split data returned by a query into batches according to the parameters you define in your query.

Query cursors define the start and end points for a query, allowing you to:

- Return a subset of the data
  - [Add a simple cursor to a query](https://firebase.google.com/docs/firestore/query-data/query-cursors?hl=en#add_a_simple_cursor_to_a_query) - **`startAt()`, `startAfter()`, `endAt()`, `endBefore()`**

  ```
  import { query, orderBy, endAt } from "firebase/firestore";  

  const q = query(citiesRef, orderBy("population"), endAt(1000000));
  ```

  - [Using a document snapshot to define the query cursor](https://firebase.google.com/docs/firestore/query-data/query-cursors?hl=en#use_a_document_snapshot_to_define_the_query_cursor)
- **[Paginate query results](https://firebase.google.com/docs/firestore/query-data/query-cursors?hl=en#paginate_a_query)**

However, to define a specific range for a query, you should use the `where()` method described in [Simple Queries](https://firebase.google.com/docs/firestore/query-data/queries#simple_queries)

---

### [Get Realtime Updates](https://firebase.google.com/docs/firestore/query-data/listen)
You can listen to a document with the `onSnapshot()` method. An initial call using the callback you provide creates a document snapshot immediately with the current contents of the single document. Then, each time the contents change, another call updates the document snapshot.
This is possible because Firebase connects Firestore database and the client via websockets which is a stateful connection unlike HTTP, which is stateless.

#### Example Syntax:

**On a web client**
```
import { doc, onSnapshot } from "firebase/firestore";

const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    console.log("Current data: ", doc.data());
});
```

**On a nodejs server**
```
const doc = db.collection('cities').doc('SF');

const observer = doc.onSnapshot(docSnapshot => {
  console.log(`Received doc snapshot: ${docSnapshot}`);
  // ...
}, err => {
  console.log(`Encountered error: ${err}`);
});
```



### [Simple and Compound Queries](https://firebase.google.com/docs/firestore/query-data/queries)
Cloud Firestore provides powerful query functionality for specifying which documents you want to retrieve from a collection or collection group. These queries can also be used with either get() or addSnapshotListener(), as described in [Get Data](https://firebase.google.com/docs/firestore/query-data/get-data) and [Get Realtime Updates](https://firebase.google.com/docs/firestore/query-data/listen).

---

## DELETING DATA

#### [Delete Document](https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=en#delete_documents)
To delete a document, use the `delete()` method:

```
import { doc, deleteDoc } from "firebase/firestore";

await deleteDoc(doc(db, collectionName:string, id:string))
```

### [Delete Fields](https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=en#fields)

### [Delete Collections](https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=en#collections)

### [Delete Data with Firestore CLI](https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=en#delete_data_with_the_firebase_cli)

---

## [Storage](https://firebase.google.com/docs/firestore/quickstart)

#### [Upload Files with Cloud Storage on Web](https://firebase.google.com/docs/storage/web/upload-files)

> **Note:** *Warning: Deleting a document does not delete its subcollections!*

When you delete a document, Cloud Firestore does not automatically delete the documents within its subcollections. You can still access the subcollection documents by reference. For example, you can access the document at path `/mycoll/mydoc/mysubcoll/mysubdoc` even if you delete the ancestor document at `/mycoll/mydoc`.

Non-existent ancestor documents [appear in the console](https://firebase.google.com/docs/firestore/using-console#non-existent_ancestor_documents), but they do not appear in query results and snapshots.

If you want to delete a document and all the documents within its subcollections, you must do so manually. For more information, see [Delete Collections](https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=en#collections).

---

# References
- [Firebase Docs](https://firebase.google.com/docs) | [SDKs and Client Libraries](https://firebase.google.com/docs/firestore/client/libraries)
- [Understanding the Difference between Cloud Firestore and Realtime Database](https://firebase.google.com/docs/firestore/rtdb-vs-firestore)
- [Firebase vs MongoDB](https://www.mongodb.com/firebase-vs-mongodb)
- [Firebase Admin SDK](https://firebase.google.com/docs/reference/admin)
