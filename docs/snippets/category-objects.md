# Category (objects)

Multi-select Category, and store Name, ID as object:

```json
{
	"title": "Category (objects)",
	"description": "Multi-select Category, and store Name, ID as object",
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
	"categoryArrayObject": [
		{
			"name": "(shop-all) Shop All",
			"slug": "shop-all",
			"id": "23"
		},
		{
			"name": "(bath) Bath",
			"slug": "bath",
			"id": "18"
		}
	]
}
```
