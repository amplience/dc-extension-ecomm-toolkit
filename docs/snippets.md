# Extension Snippets

Since the eComm Toolkit requires a number of "Instance Parameters", we recommend providing a number of extension snippets for ease of use and to ensure functionality. By including Snippets in an extension registration, you'll be able to quickly configure properties when you're editing/creating a Content Schema that are automatically associated with an extension.

![Extension Snippets](../media/ext-snipSelections.png)

The Instance Parameters are all included in the snippets and will drive how the extension looks and functions, and what type of data will be retrieved from your eComm platform.

Under the Snippets tab, add snippets using each of the following:

## User Segments - Multi select - object

View screenshot:

![Multi select](../media/multi.png)

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

## User Segments - Multi select - string

View screenshot:

![Multi Select](../media/multi.png)

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

## Category - Single Select - object

View screenshot:

![Single Select](../media/single.png)

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
	"propertyOrder": ["id", "name"],
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

## Category - Single Select - string

View screenshot:

![Single Select](../media/single.png)

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

## Category - Single Select - enforced string

View screenshot:

![Single Select](../media/single.png)

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

## Category - Single Select Tree - string

View screenshot:

![Single Select Tree](../media/tree-single.png)

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

## Category - Single Select Tree - enforced string

View screenshot:

![Single Select Tree](../media/tree-single.png)

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

## Product Selector - Single - string

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

## Product Selector - Single - enforced string

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

## Product Selector - Array of ID Strings - `string[]`

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
