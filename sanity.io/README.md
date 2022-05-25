# What is Sanity?

[**Sanity.io**](https://www.sanity.io) is a Headless CMS platform for structured content. It comes with an open-source editing environment called Sanity Studio that we can customize with JavaScript, and a real-time hosted data store.

---

# The Sanity workflow

The workflow with Sanity is as follows -

1. There will be a backend setup where we create the schemas for the content database. Picturize this as setting up MongoDB with Mongoose with the added benefit of having a Content Management System to create, edit, delete content easier using the Sanity Studio GUI.
2. There will be a frontend setup where we access the data by making queries to the Sanity Project.

---

# Installation

### Installing the Sanity CLI

```
npm install -g @sanity/cli
```

### Installing the backend dependencies

In the `backend` directory,

Access Sanity Studio:

```
sanity init
```

Install any other plugins like `Leaflet`.

### Installing the frontend dependencies

In the `frontend` directory,

```
npm i @sanity/client @sanity/image-url groq mapbox-gl next-sanity @portabletext/react
```

---

# Schemas

When Sanity Studio starts up it defaults to look for the schema in a file called `schema.js` in the folder schemas in your project folder. The schema.js is a reference point for Sanity Studio for all the schemaTypes defined in other schema files in the `schemas` folder.

For those that are familiar with MongoDB and Mongoose, Schemas in Sanity Studio, work just like it does in Mongoose.

---

# Creating the Content Block Schema for a Blog

```
export default {
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'h5', value: 'h5' },
        { title: 'h6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Code', value: 'code' },
          { title: 'Strike-through', value: 'strike-through' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};

```

### Annotations

Annotations make it possible to embed rich content structures on top of inline text. A simple and frequent annotation can be a reference to another document, typically used for internal linking. A complete example with frontend implementation can be found at sanity-io/sanity-recipes on Github. To add an internal link annotation, configure the Portable Text schema like this:

---

# [Leaflet Plugin](https://www.npmjs.com/package/sanity-plugin-leaflet-input)

1. Install `sanity-plugin-leaflet-input`.
   ```
   npm i sanity-plugin-leaflet-input
   ```
2. Install leaflet on Sanity to use the Leaflet library for the Geopoint schema type | [Docs](https://www.sanity.io/plugins/sanity-plugin-leaflet-input)
   ```
   sanity install leaflet-input
   ```
3. Create/Modify `leaflet-input.json` in the `config` folder. Remove the defaultValues or defaultZoom
   ```
   {
      "tileLayer": {
        "attribution": "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
        "url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      },
      "defaultLocation": {                         // optional
        "lat": 37.779048,
        "lng": -122.415214
      },
      "defaultZoom": 13                            //optional
    }
   ```

---

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

---

# References

- [Reference - Sanity Docs](https://www.sanity.io/docs/reference)
- **@sanity/client** | [NPM](https://www.npmjs.com/package/@sanity/client)
- **@sanity/image-url** | [NPM](https://www.npmjs.com/package/@sanity/image-url) | [Github](https://github.com/sanity-io/image-url) | [Sanity](https://www.sanity.io/docs/image-url)
- Image Url Builder Methods | [Sanity](https://www.sanity.io/docs/image-url#builder-methods)
