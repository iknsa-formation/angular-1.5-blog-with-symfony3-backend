#  A simple angular app for a blog
This is a simple demonstration of using AngularJS in a multi-layered infrastructure.

We are only retrieving data in `AJAX` with the `GET` HTTP method.

The template in this tutorial is a free template downloaded on the web.

The backend is a Symfony3 blog application from another course.

## Backend
The backend is found [here](https://github.com/iknsa-formation/symfony3)

Go through the install procedure then execute the following commands to get to the working version of the backend:

```
git checkout step23-json-api-for-listing-all-post-and-one-post-with-its-comments

npm install
bower install
composer install
```
### CORS
To handle CORS on the Backend we are using nelmio which is configured to allow access in XMLHttpRequest on all routes with the following pattern

```
^/api/
```
or with the following host pattern:
```
^api\.
```

## Front End

Clone the repository and execute the following commands to install dependencies:

```
npm install
bower install
```

=
### ***For the front end part, all development should be done in the `./app` folder.***
=

### Default grunt task:
```
grunt
```
While in development, the default grunt task should always be running as it checks and copies html, css and js files to the root folder which is also the root of the server.
