# Commercetools

In order to have this extension point to your Commercetools instance you need specific installation params, instance details and API access. 

[Extension Instalation Params Docs](https://amplience.com/developers/docs/integrations/extensions/register-use/#installation-parameters)

Full details can be seen in the `dc-integration-middleware` project [here](https://github.com/amplience/dc-integration-middleware/blob/main/docs/vendor/commerce/commercetools.md)

## Storing SKUs and slugs instead of IDs

By default the extension stores commercetools IDs. Two optional installation parameters, beside `vendor` (or inside `codec_params`), store readable identifiers instead:

```json
{
    "vendor": "commercetools",
    "productIdentifier": "sku",
    "categoryIdentifier": "slug",
    ...
}
```

| Parameter            | Values                    | Stored value                                                    |
| -------------------- | ------------------------- | --------------------------------------------------------------- |
| `productIdentifier`  | `id` (default), `sku`     | The commercetools product ID, or the SKU of the selected variant |
| `categoryIdentifier` | `id` (default), `slug`    | The commercetools category ID, or its slug in the codec's `language` |

Existing content is unaffected unless a parameter is set, but values already saved as IDs will not be found once it is, so pick them again. Any other value is rejected when the extension loads.

### Products by SKU

With `productIdentifier: "sku"`, the picker stores and looks up SKUs for every instance `type` (`string`, `strings`, `object` and `objects`; the `id` of an `object` is the SKU). A few things to be aware of:

-   Choosing a product from search results stores the SKU of its first variant, as it already picks that variant for `object` values.
-   Products with no SKU are not offered by the picker, because there would be nothing to look them up by.
-   SKUs are passed to the lookup as a comma-separated list, so a SKU that contains a comma cannot be used.

### Categories by slug

With `categoryIdentifier: "slug"`, category fields (`data: "category"`, in every `view`) store the slug in place of the ID, including the `id` of an `object` value. Browsing products by category in the product picker is unchanged. `categoryIdentifier` is read the same way for every vendor, since every codec gives its categories a slug.
