# CProduct Selector (object)

Keyword Search or Single-select Category, and store Product as object:

```json
{
    "title": "Product Selector (object)",
    "description": "Keyword Search or Single-select Category, and store Product as object",
    "type": "string",
    "properties": {
        "variant": {
            "title": "Variant",
            "type": "string"
        },
        "id": {
            "title": "ID",
            "type": "string"
        }
    },
    "ui:extension": {
        "name": "e-comm-toolkit-big-commerce",
        "params": {
            "label": "Search By Category",
            "view": "product",
            "data": "product",
            "type": "object"
        }
    }
}
```

Sample content:

```json
{
    "productSingleObject": {
        "id": "114",
        "variant": "2026X5M213081"
    }
}
```