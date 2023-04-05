# Category - Single Select - object

View screenshot:

![Single Select](../../media/single.png)

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
