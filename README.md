[![Amplience Dynamic Content](media/header.png)](https://amplience.com/dynamic-content)

# eComm Toolkit

`dc-extension-ecomm-toolkit` is an Amplience Dynamic Content extension written in React/MUI/Typescript that provides an easy way to interface with eComm platforms for multiple use cases.

## 🏢 Supported platforms

-   [Salesforce Commerce Cloud (SFCC)](./docs/sfcc.md)
-   [Big Commerce](./docs/bigcommerce.md)
-   [Commerce Tools](./docs/commercetools.md)
-   [Shopify](./docs/shopify.md)
-   [REST (JSON Sample Data)](./docs/rest.md)

## ⚙️ Features

-   Category selector
-   User Segment selector
-   Product Finder

## 🏁 Quickstart

Instructions for basic registration & setup of the ecomm-toolkit in your Amplience Dynamic Content box [are here](./docs/extension.md). Then come back to the Snippets section below.

## 🧩 Extension Snippets

Since the eComm Toolkit requires a number of "Instance Parameters", we recommend providing a number of extension snippets for ease of use and to ensure functionality. By including Snippets in an extension registration, you'll be able to quickly configure properties when you're editing/creating a Content Schema that are automatically associated with an extension.

![Extension Snippets](media/ext-snipSelections.png)

The Instance Parameters are all included in the snippets and will drive how the extension looks and functions, and what type of data will be retrieved from your eComm platform.

You can find the code for all snippets in [data/snippets.json](./data/snippets.json) or in the following pages:

- **Products**
  - [Product Selector (string)](./docs/snippets/product-selector-string.md)
  - [Product Selector (enforced string)](./docs/snippets/product-selector-enforced-string.md)
  - [Product Selector (strings)](./docs/snippets/product-selector-strings.md)
  - [Product Selector (enforced strings)](./docs/snippets/product-selector-enforced-strings.md)
- **Categories**
  - [Category (string)](./docs/snippets/category-string.md)
  - [Category (enforced string)](./docs/snippets/category-enforced-string.md)
  - [Category (object)](./docs/snippets/category-object.md)
  - [Category Tree (string)](./docs/snippets/category-tree-string.md)
  - [Category Tree (enforced string)](./docs/snippets/category-tree-enforced-string.md)
- **User Segments**
  - [User Segments (strings)](./docs/snippets/user-segments-strings.md)
  - [User Segments (objects)](./docs/snippets/user-segments-objects.md)

## 🌍 Useful Links

-   [Contributing](./CONTRIBUTING.md)
-   [Support](./support.md)
-   [Licensing](./LICENSE)
