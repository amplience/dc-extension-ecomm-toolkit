# Category - Single Select Tree - enforced string

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
