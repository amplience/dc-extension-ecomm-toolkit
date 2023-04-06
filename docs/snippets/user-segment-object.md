# User Segment (object)

Single-select User Segment, and store as object:

```json
"segmentSingleSelectObject": {
    "title": "User Segment (object)",
    "description": "Single-select User Segment, and store as object",
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
    },
    "ui:extension": {
        "name": "ecomm-toolkit",
        "params": {
            "label": "User Segment",
            "view": "single",
            "data": "segment",
            "type": "object"
        }
    }
}
```

Sample content:

```json
{
    "segmentMultiSelectObject": {
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