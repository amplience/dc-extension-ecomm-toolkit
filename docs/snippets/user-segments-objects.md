# User Segments - Multi select - object

View screenshot:

![Multi select](../../media/multi.png)

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
