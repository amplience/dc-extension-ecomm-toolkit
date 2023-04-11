# Product Selector (enforced string)

## Snippet

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

## Sample Content

```json
{
    "productSingleEnforcedString": "pdp/content/25050736M"
}
```

## Sample UI

Empty field:

![Sample UI](../../media/product-selector-enforced-string.png)

Sample Keyword Search:

![Sample UI](../../media/product-selector-key1.png)

Sample Category Search:

![Sample UI](../../media/product-selector-cat1.png)
