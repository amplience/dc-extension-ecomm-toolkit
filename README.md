[![Amplience Dynamic Content](media/header.png)](https://amplience.com/dynamic-content)

# eComm Toolkit

`dc-extension-ecomm-toolkit` is an extension written in React/MUI/Typescript for Amplience Dynamic Content that provides an easy way to interface with eComm platforms for multiple use cases. The extension currently supports SFCC, with more eComm support in the works. Here's a list of high-level current features:

## Supported platforms

-   Salesforce Commerce Cloud (SFCC)
-   Big Commerce
-   Commerce Tools
-   Shopify
-   Rest (JSON Sample Data)

## Supported features

-   Category selector
-   User Segment selector
-   Product Finder

## Getting Started with the eComm Toolkit

There are many ways one may use a toolkit, but first you'll want to register the extension against an Amplience Dynamic Content Hub. Login to your Hub and head to Development > Extensions and click the "Register" button.

![Register Start](media/register-button.png)

### Base Extension Setup

Under the setup tab, enter the following (URL should be `https://ecomm-toolkit.dc-demostore.com`)

![Extension Setup](media/ext-setup.png)

### Host your own Setup

You can also clone this repository and deploy to services such as Vercel.

```bash
$ gh repo clone amplience/dc-extension-ecomm-toolkit
$ cd dc-extension-ecomm-toolkit
$ vercel deploy
Vercel CLI 24.0.0
? Set up and deploy “~/Workspace/amplience/dc-extension-ecomm-toolkit”? [Y/n] y
? Which scope do you want to deploy to? zzzzz
? Link to existing project? [y/N] n
? What’s your project’s name? dc-extension-ecomm-toolkit
? In which directory is your code located? ./
Auto-detected Project Settings (Next.js):
- Build Command: next build
- Output Directory: Next.js default
- Development Command: next dev --port $PORT
? Want to override the settings? [y/N] n
🔗  Linked to zzzzz/dc-extension-ecomm-toolkit (created .vercel)
🔍  Inspect: https://vercel.com/zzzzz/dc-extension-ecomm-toolkit/xxxxxx [1s]
✅  Production: https://dc-extension-ecomm-toolkit-yyyyy.vercel.app [copied to clipboard] [2m]
📝  Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).
💡  To change the domain or build command, go to https://vercel.com/zzzzz/dc-extension-ecomm-toolkit/settings
```

You can then use the new depolyment URL in your extension configuration.

### Extension Permissions Settings

Under the Permissions tab, select the following:

![Extension Permissions](media/ext-perms.png)

### Extensions Installation Parameters & Setup

### Extension Snippets

Since the eComm Toolkit requires a number of "Instance Parameters", we recommend providing a number of extension snippets for ease of use and to ensure functionality. By including Snippets in an extension registration, you'll be able to quickly configure properties when you're editing/creating a Content Schema that are automatically associated with an extension.

![Extension Snippets](media/ext-snipSelections.png)

The Instance Parameters are all included in the snippets and will drive how the extension looks and functions, and what type of data will be retrieved from your eComm platform.

You can find the code for all snippets in [data/snippets.json](./data/snippets.json) or in the following pages:

- [Product Selector (string)](./docs/snippets/product-selector-string.md)
- [Product Selector (enforced string)](./docs/snippets/product-selector-enforced-string.md)
- [Product Selector (strings)](./docs/snippets/product-selector-strings.md)
- [Product Selector (enforced strings)](./docs/snippets/product-selector-enforced-strings.md)
- [Category (string)](./docs/snippets/category-string.md)
- [Category (enforced string)](./docs/snippets/category-enforced string.md)
- [Category (object)](./docs/snippets/category-object.md)
- [Category Tree (string)](./docs/snippets/category-tree-string.md)
- [Category Tree (enforced string)](./docs/snippets/category-tree-enforced-string.md)
- [User Segments (strings)](./docs/snippets/user-segments-strings.md)
- [User Segments (objects)](./docs/snippets/user-segments-objects)

## Useful Links
 * [Contributing](./CONTRIBUTING.md)
 * [Support](./support.md)
 * [Licensing](./LICENSE)
