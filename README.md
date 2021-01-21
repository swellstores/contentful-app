# Swell for Contentful
This app enables the selection of products (and product variants) from a Swell store on **Short text** or **Short text, list** fields.

- When variant selection is disabled, the selected product's ID is saved as the field value.
- When variant selection is enabled, the field value will be in the format `{productID}:{variantID}`.

## Installing the app

1. In your Contentful organization, create a new private app called 'Swell'.
2. Enter `https://swell-contentful-picker.vercel.app` in the **App URL** field.
3. Under Locations, select **App configuration screen**, **Entry field**, and the **Short text** and/or **Short text, list** field types.
4. Save the configuration and click **Install to space**
5. Enter the Swell store ID and public key, and select which fields to use the product picker for.
6. Click **Save**. The app is now ready to use.

---

This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

## Available Scripts

In the project directory, you can run:

#### `npm start`

Creates or updates your app definition in contentful, and runs the app in development mode.
Open your app to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Libraries to use

To make your app look and feel like Contentful use the following libraries:

- [Forma 36](https://f36.contentful.com/) – Contentful's design system
- [Contentful Field Editors](https://www.contentful.com/developers/docs/extensibility/field-editors/) – Contentful's field editor React components

## Learn More

[Read more](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/) and check out the video on how to use the CLI.

Create Contentful App uses [Create React App](https://create-react-app.dev/). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) and how to further customize your app.
