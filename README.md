# 🎱 8base + ReactJS Starter App 🏎️

This project is a starter app for getting started with ReactJS + 8base! The app is pre-configured to use 8base user authentication, GraphQL API, so you can immediately hop into building something awesome.

You'll need to create an [8base workspace](https://app.8base.com) and [Authentication Profile](https://docs.8base.com/docs/8base-console/authentication/#8base-authenticationn). Once that's done... ALL you need to do is set some environment variables!  

## Running the App

To run the app, you're going to need to first install its dependencies.

```sh
$ npm install
```

1. The [.env](./.env) file provides a template of the required environment variables. Please do **not** commit any environment variables to git tracking. Running the following command will copy the `.env` template a new `.env.local` file that's already specified in the `.gitignore`.

```sh
cat .env > .env.local
```

All variables in the template are collected from your workspace and get used to enable both authentication and api connectivity.

```sh
PORT=3000
NODE_PATH=src
NODE_ENV=development
REACT_APP_WORKSPACE_ENDPOINT=<workspace_endpoint>
REACT_APP_AUTH_PROFILE_ID=<auth_profile_id>
REACT_APP_AUTH_CLIENT_ID=<auth_client_id>
REACT_APP_AUTH_DOMAIN=<auth_domain>
```

2. Run the app... seriously, just run it now.

```sh
npm run start
```

3. Visit [http://localhost:3000](http://localhost:3000) to test it out.

## TL;DR

There are several awesome things that have been done in this application to help you get started. Let's take a look at them:

1. **User Authentication**
The app enables sign-in and sign-up functionality using 8base auth (cognito/auth0 under the hood). Plus, it gives an example of enforcing authentication at the router level using a `ProtectedRoute` component.

The relevant files are:

* `src/Application.js` - Supplies AuthClient to AppProvider to inject auth as prop.
* `src/routes/auth/routes/callback/index.js` - Handle auth redirect and add/identify user.
* `src/routes/auth/index.js` - Loading screen for authorizing user.
* `src/components/ProtectedRoute.js` - Forces authentication redirect on protected routes.
* `src/components/ui/.AuthButton.js` - Provides sign-in / sign-out button based on auth state.
* `src/shared/auth/index.js` - Configures and exports 8base auth client using env variables.

1. **GraphQL API**
The app utilizes an 8base workspace for accessing and updating it's data using the GraphQL API. The code for this can utilize either a simple API client that gets initialized, or Recompose. Examples of both exist in the `AuthCallback` component and the "Profile" page.

The relevant files are:

* `src/routes/auth/routes/callback/index.js` - Uses Apollo Client to make authenticated queries.
* `src/routes/profile/index.js` - Uses query and render profile page.
* `src/shared/graphql/index.js` - Build a library of GraphQL queries, mutations, and subscriptions.

1. **Styles (or not...)**
This project is totally unstyles, minus a few minor css classes. If you'd like to add your own styling, go for it! However, we didn't want your first few steps being to rip out a chosen CSS framework to begin implementing another.

## Contributing

Feel welcome to fork this project and change it as you need, or submit a pull request with comments and improvements!
