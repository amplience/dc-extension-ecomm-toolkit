# Product Selector (enforced strings)

Keyword Search or Single-select Category, and store Product IDs as enforced string:

```json
{
    "title": "Product Selector (enforced strings)",
    "description": "Keyword Search or Single-select Category, and store Product IDs as enforced string",
    "type": "array",
    "items": {
        "type": "string",
        "pattern": "pdp/content/.*"
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
{
    "productArrayEnforcedStrings": [
        "pdp/content/25591072M",
        "pdp/content/25517823M",
        "pdp/content/25050730M",
        "pdp/content/25594776M",
        "pdp/content/25501952M"
    ]
}
```