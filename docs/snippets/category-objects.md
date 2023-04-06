# Category (objects)

Single-select Category, and store Name, ID as object:

```json
{
    "title": "Category (objects)",
    "description": "Multi-select Category, and Categories as object",
    "type": "array",
    "items": {
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
        ]
    },
    "ui:extension": {
        "name": "e-comm-toolkit-big-commerce",
        "params": {
            "label": "Category",
            "view": "multi",
            "data": "category",
            "type": "object"
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