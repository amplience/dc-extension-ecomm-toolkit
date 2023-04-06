# User Segment (object)

Single-select a User Segment, and store as object:

```json
{
    "title": "User Segment (object)",
    "description": "Single-select a User Segment, and store as an object",
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
    "segmentSingleSelectObject": {
        "id": "2",
        "name": "Big Spenders"
    }
}
```