# Category - Single Select - string

View screenshot:

![Single Select](../../media/single.png)

Schema:

```json
{
	"title": "Category (string)",
	"description": "Single-select Category, and store Category ID as enforced string",
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
		"propertyName": "category/24"
	}
}
```
