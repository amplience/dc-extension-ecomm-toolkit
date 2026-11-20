# Amplience PIM

Use products authored in Amplience itself as the product source, for projects that have no other PIM. Products are Dynamic Content items of a `Product` content type, in the shape used by [Amplience Frontend Starter](https://github.com/amplience/amplience-frontend-starter).

Unlike the other vendors, nothing is configured with credentials. Requests are made as the logged-in user through the extension SDK, so the extension needs **Read Access** (see [Extension Setup](../extension.md)).

## Installation parameters

```json
{
    "vendor": "amplience",
    "productSchemaUri": "https://quadratic.amplience.com/v2/content/product"
}
```

| Parameter          | Description                                                          |
| ------------------ | -------------------------------------------------------------------- |
| `vendor`           | Must be `amplience`.                                                 |
| `productSchemaUri` | The schema URI of the Product content type, as registered in the hub. |

## Behaviour

-   **Which products:** every item of the Product content type with status `ACTIVE` in the hub, whether or not it is published. Archived items are ignored.
-   **Stored value:** the product's **SKU**. It is what the field saves and what the picker looks up again when the content item is reopened.
-   **Search:** keyword search matches the product name, SKU, brand, tags and categories, and every word must match. Category search lists the distinct values of the `categories` field. Categories are plain strings, so the list is flat.
-   **Limit:** products are loaded once and searched in memory, so the hub may hold at most 200 active Product items. Beyond that, the extension shows an error.

## Fields read from a Product item

| Field                                          | Used for                                                                             |
| ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| `sku`                                          | Product ID and variant SKU. Items without one are skipped.                           |
| `name`, `shortDescription`                     | Localized values. The first value is used.                                           |
| `images`                                       | `DynamicImage` and `ManualImage` entries. The first image is shown on the tile.      |
| `brand`, `tags`, `categories`                  | Keyword and category search.                                                         |
| `prices`                                       | The first price.                                                                     |
| `_meta.deliveryKeys`                           | The first delivery key is used as the slug.                                          |
