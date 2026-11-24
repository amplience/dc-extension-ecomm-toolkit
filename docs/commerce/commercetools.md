# Commercetools

In order to have this extension point to your Commercetools instance you need specific installation params, instance details and API access. 

[Extension Instalation Params Docs](https://amplience.com/developers/docs/integrations/extensions/register-use/#installation-parameters)

Full details can be seen in the `dc-integration-middleware` project [here](https://github.com/amplience/dc-integration-middleware/blob/main/docs/vendor/commerce/commercetools.md)

## Storing SKUs instead of product IDs

By default the extension stores the commercetools product ID. Add the optional `identifier` installation parameter, beside `vendor` (or inside `codec_params`), to store SKUs instead:

```json
{
    "vendor": "commercetools",
    "identifier": "sku",
    ...
}
```

| `identifier` | Stored value                                   |
| ------------ | ---------------------------------------------- |
| `id`         | The commercetools product ID. This is the default. |
| `sku`        | The SKU of the selected variant.               |

With `sku`, the picker stores and looks up SKUs for every instance `type` (`string`, `strings`, `object` and `objects`; the `id` of an `object` is the SKU). Existing content is unaffected unless the parameter is set, but values already saved as product IDs will not be found once it is, so pick the products again.

A few things to be aware of:

-   Choosing a product from search results stores the SKU of its first variant, as it already picks that variant for `object` values.
-   Products with no SKU are not offered by the picker, because there would be nothing to look them up by.
-   SKUs are passed to the lookup as a comma-separated list, so a SKU that contains a comma cannot be used.
-   Any value other than `id` or `sku` is rejected when the extension loads.
