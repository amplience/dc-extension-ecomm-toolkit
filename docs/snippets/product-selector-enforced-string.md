# Product Selector (enforced string)

Keyword Search or Single-select Category, and store Product ID as enforced string:

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
{
    "productSingleEnforcedString": "pdp/content/25050736M"
}
```