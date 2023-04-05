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

Under the Snippets tab, add snippets using each of the following:

#### User Segments - Multi select - object

View screenshot:

![Multi select](media/multi.png)

Schema:

```json
{
    "title": "User Segments (objects)",
    "description": "Multi-select User Segments, and store as { name: string, id: string }",
    "type": "array",
    "minItems": 0,
    "maxItems": 5,
    "items": {
        "type": "object",
        "properties": {
            "id": {
                "title": "ID",
                "type": "string"
            },
            "name": {
                "title": "Name",
                "type": "string"
            }
        }
    },
    "ui:extension": {
        "name": "ecomm-toolkit",
        "params": {
            "label": "User Segments",
            "view": "multi",
            "data": "segment",
            "type": "object"
        }
    }
}
```

Sample content:

```json
{
    "content": {
        "items": [
            {
                "id": "2",
                "name": "Big Spenders"
            },
            {
                "id": "1",
                "name": "VIP"
            }
        ]
    }
}
```

#### User Segments - Multi select - string

View screenshot:

![Multi Select](media/multi.png)

Schema:

```json
{
    "title": "User Segments (strings)",
    "description": "Multi-select User Segments, and store Segments as strings array",
    "type": "array",
    "minItems": 0,
    "maxItems": 5,
    "items": {
        "type": "string"
    },
    "ui:extension": {
        "name": "ecomm-toolkit",
        "params": {
            "label": "User Segments",
            "view": "multi",
            "data": "segment",
            "type": "string"
        }
    }
}
```

Sample content:

```json
{
    "content": {
        "items": ["1", "2"]
    }
}
```

#### Category - Single Select - object

View screenshot:

![Single Select](media/single.png)

Schema:

```json
{
    "title": "Category (object)",
    "description": "Single-select Category, and store Name, ID as { name: string, id: string }",
    "type": "object",
    "properties": {
        "name": {
            "title": "Name",
            "type": "string"
        },
        "id": {
            "title": "ID",
            "type": "string"
        }
    },
    "propertyOrder": [
        "id",
        "name"
    ],
    "ui:extension": {
        "name": "ecomm-toolkit",
        "params": {
            "label": "Category",
            "view": "single",
            "data": "category",
            "type": "object"
        }
    }
}
```

Sample content:

```json
{
    "content": {
        "propertyName": {
            "name": "(bath-utilities) Bath Utilities",
            "id": "24"
        }
    }
}
```

#### Category - Single Select - string

View screenshot:

![Single Select](media/single.png)

Schema:

```json
{
    "title": "Category (string)",
    "description": "Single-select Category, and store Category ID as string",
    "type": "string",
    "ui:extension": {
        "name": "ecomm-toolkit",
        "params": {
            "label": "Category",
            "view": "single",
            "data": "category",
            "type": "string"
        }
    }
}
```

Sample content:

```json
{
    "content": {
        "propertyName": "24"
    }
}
```

#### Category - Single Select - enforced string

View screenshot:

![Single Select](media/single.png)

Schema:

```json
{
    "title": "Category (enforced string)",
    "description": "Single-select Category, and store Category ID as enforced string",
    "type": "string",
    "pattern": "category/.*",
    "ui:extension": {
        "name": "ecomm-toolkit",
        "params": {
            "label": "Category",
            "view": "single",
            "data": "category",
            "type": "string"
        }
    }
}
```

Sample content:

```json
{
    "content": {
        "propertyName": "category/24"
    }
}
```

#### Category - Single Select Tree - string

View screenshot:

![Single Select Tree](media/tree-single.png)

Schema:

```json
{
    "title": "Category Tree (string)",
    "description": "Single-select Category Tree, and store Category ID as string",
    "type": "string",
    "ui:extension": {
        "name": "ecomm-toolkit",
        "params": {
            "label": "Category",
            "view": "tree",
            "data": "category",
            "type": "string"
        }
    }
}
```

Sample content:

```json
{
    "content": {
        "propertyName": "24"
    }
}
```

#### Category - Single Select Tree - enforced string

View screenshot:

![Single Select Tree](media/tree-single.png)

Schema:

```json
{
    "title": "Category Tree (enforced string)",
    "description": "Single-select Category Tree, and store Category ID as string",
    "type": "string",
    "pattern": "category/.*",
    "ui:extension": {
        "name": "ecomm-toolkit",
        "params": {
            "label": "Category",
            "view": "tree",
            "data": "category",
            "type": "string"
        }
    }
}
```

Sample content:

```json
{
    "content": {
        "propertyName": "category/24"
    }
}
```

### Product Selector - Single - string

Schema:

```json
{
    "title": "Product Selector (string)",
    "description": "Keyword Search or Single-select Category, and store Product ID as string",
    "type": "string",
    "ui:extension": {
        "name": "ecomm-toolkit",
        "params": {
            "label": "Search By Category",
            "view": "product",
            "data": "product",
            "type": "string"
        }
    }
}
```

Sample Content:

```json
"product": "25050736M"
```

### Product Selector - Single - enforced string

Schema:

```json
{
    "title": "Product Selector (enforced string)",
    "description": "Keyword Search or Single-select Category, and store Product ID as enforced string",
    "type": "string",
    "pattern": "pdp/content/.*",
    "ui:extension": {
        "name": "ecomm-toolkit",
        "params": {
            "label": "Search By Category",
            "view": "product",
            "data": "product",
            "type": "string"
        }
    }
}
```

Sample Content:

```json
"product": "pdp/content/25050736M"
```

### Product Selector - Array of ID Strings - `string[]`

Schema:

```json
{
    "title": "Product Selector (strings)",
    "description": "Keyword Search or Single-select Category, and store Product IDs as array of string",
    "type": "array",
    "items": {
        "type": "string"
    },
    "ui:extension": {
        "name": "ecomm-toolkit",
        "params": {
            "label": "Search By Category",
            "view": "product",
            "data": "product",
            "type": "strings"
        }
    }
}
```

Sample Content:

```json
"products": [
    "25591072M",
    "25517823M",
    "25050730M",
    "25594776M",
    "25501952M"
  ]
```

## License

This software is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0),

Copyright 2023 Amplience

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

```
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
