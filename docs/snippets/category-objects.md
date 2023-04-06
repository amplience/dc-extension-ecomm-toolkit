# Category (object)

Single-select Category, and store Name, ID as object:

```json
{
	"title": "Category (object)",
	"description": "Single-select Category, and store Name, ID as object",
	"type": "array",
	"minItems": 0,
	"maxItems": 10,
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
	"propertyOrder": ["id", "name"],
	"ui:extension": {
		"name": "ecomm-toolkit",
		"params": {
			"label": "Category",
			"view": "multi",
			"data": "category",
			"type": "objects"
		}
	}
}
```

Sample content:

```json
{
	"categoryObjects": [
		{
			"name": "(bath-utilities) Bath Utilities",
			"id": "24"
		},
		{
			"name": "(womens) Womens",
			"id": "3"
		}
	]
}
```
