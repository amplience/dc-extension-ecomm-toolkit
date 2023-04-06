# Category Tree (enforced string)

Single-select Category Tree, and store Category ID as string:

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
    "categorySingleEnforcedStringTree": "category/24"
}
```