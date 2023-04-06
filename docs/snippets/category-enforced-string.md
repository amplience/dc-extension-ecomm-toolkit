# Category (enforced string)

## Snippet

Single-select Category, and store Category ID as enforced string:

```json
{
    "title": "Category (enforced string)",
    "description": "Single-select Category, and store Category ID as enforced string",
    "type": "string",
    "pattern": "category/.*",
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

## Sample content

```json
{
    "categorySingleEnforcedString": "category/24"
}
```

## Sample UI

Empty field:
![Sample UI](../../media/category-enforced-string.png)

Selecting a category:
![Sample UI](../../media/category-enforced-string2.png)
