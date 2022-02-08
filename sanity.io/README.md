# What is Sanity?
[**Sanity.io**](https://www.sanity.io) is a Headless CMS platform for structured content. It comes with an open-source editing environment called Sanity Studio that we can customize with JavaScript, and a real-time hosted data store.

----------------------------------------------------------------------------------------------------------

# Schemas
When Sanity Studio starts up it defaults to look for the schema in a file called `schema.js` in the folder schemas in your project folder. The schema.js is a reference point for Sanity Studio for all the schemaTypes defined in other schema files in the `schemas` folder.

For those that are familiar with MongoDB and Mongoose, Schemas in Sanity Studio, work just like it does in Mongoose.

----------------------------------------------------------------------------------------------------------

# Using the [**@sanity/image-url**](https://www.sanity.io/docs/image-url) client library

The `@sanity/image-url` client library is installed on the client side and is useful for quickly generating image urls from Sanity image records.

This helper will by default respect any crops/hotspots specified in the Sanity content provided to it. The most typical use case for this is to give it a sanity image and specify a width, height or both and get a nice, cropped and resized image according to the wishes of the content editor and the specifications of the front end developer.

In addition to the core use case, this library provides a handy builder to access the rich selection of processing options available in the Sanity image pipeline.

#### Requirements
- Requires the [**@sanity/client**](https://www.npmjs.com/package/@sanity/client) installed and configured. Requires JavaScript ES6-Compliant Runtime Environment.
- Requires the [**@sanity/image-url**](https://www.sanity.io/docs/image-url installed.

> `npm install @sanity/client @sanity/image-url`

#### Syntax (Using `create-react-app`)
```
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configure Client
export const client = sanityClient({
  projectId: 'your-project-id', // required
  dataset: 'bikeshop', // required
  apiVersion: '2021-03-25', // required | Sanity uses ISO dates (YYYY-MM-DD) in UTC timezone
  token: 'sanity-auth-token', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});

// Setup imageUrlBuilder and pass in the configured client
const builder = imageUrlBuilder(client);

// Export Image URL
export const urlFor = (source) => builder.image(source);
```

> Where,
> `const client = sanityClient(options)`
> Initializes a new Sanity client. Required fields: `projectId`, `dataset`, `apiVersion`. `useCdn` is a Boolean value that sets the use of the Sanity CDN for hosting images and is encouraged.

#### Obtaining the `projectId` and `token`
The `projectId` and `token` can be obtained by following these steps :-

- Launch `sanity manage` from the backend directory / the directory where the sanity project has been initialized.
- Inside the Manage Studio backend, find the PROJECT ID on the top info bar.
- Go to API --> Tokens ---> Add API token. Enter a token name and select the necessary permission to generate the token.
- Copy both the `projectId` and `token` and save them as environment variables in a .env file.


#### Using the Image Url in a React JSX document

The imageUrlBuilder can be used with [Builder Methods](https://www.sanity.io/docs/image-url#builder-methods)

```
import urlFor from './urlFor'

<img src={urlFor(mysteryPerson.mugshot).width(200).height(200).blur(50).url()}>
```

> Where, (mysteryPerson.mugshot) is the image and `width`, `height`, `blur` are [Builder Methods](https://www.sanity.io/docs/image-url#builder-methods)

> **Note:** The `url()` function needs to be the final one in order to output the url as a string.

----------------------------------------------------------------------------------------------------------

# References

- [Reference - Sanity Docs](https://www.sanity.io/docs/reference)
- **@sanity/client** | [NPM](https://www.npmjs.com/package/@sanity/client)
- **@sanity/image-url** | [NPM](https://www.npmjs.com/package/@sanity/image-url) | [Github](https://github.com/sanity-io/image-url) | [Sanity](https://www.sanity.io/docs/image-url)
- Image Url Builder Methods | [Sanity](https://www.sanity.io/docs/image-url#builder-methods)