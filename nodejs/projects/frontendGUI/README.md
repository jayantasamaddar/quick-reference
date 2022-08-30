# About

We want to build an app that presents a GUI to the user with HTML, CSS and JavaScript.

Users should be able to do the following:

1. Sign Up
2. Login and Logout
3. Modify Account Settings
4. Delete their account
5. Create, modify and delete checks
6. View a dashboard of checks that they have created and the status of the checks

To do this we will have to refactor our current app so that we can serve static assets: Images, HTML files, CSS stylesheets, frontend JavaScript files to the browser.

We will add a bunch of public facing routes that will serve HTML to the browser instead of JSON responses via an API.

We will create a bunch of templates that will be used to serve the HTML pages and we are going to write a lot of frontend JavaScript so that the form submissions can be processed by AJAX-JSON calls to our API as opposed to a form POST.

---
