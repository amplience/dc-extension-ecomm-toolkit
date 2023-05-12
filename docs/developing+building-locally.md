# Developing & Building Locally

The extension can easily be built and run locally with the following commands:

- `npm i`
- `npm run dev` (development build)
- `npm run build` / `npm start` (for live reload)

An active extension sdk connection to DC is required for most functionality to work. You can easily run your locally hosted extension within DC by pointing the extension url (either in the Extensions registry or the schema) to the locally hosted instance, typically at `http://localhost:3000`.

Make sure that the extension is properly configured using the [installation parameters.](../docs/extension.md)

## Dependency versions
This extension was developed and tested with:

- Node version `16.x`
- NPM version `8.x`