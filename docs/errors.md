# Codec Errors

## Authentication Error

`AuthUnreachable`, `AuthError`, `NotAuthenticated`

Authentication errors generally mean that authentication parameters, such as client id/secret, token, or even the API url may be incorrect. See the [middleware project's documentation](https://github.com/amplience/dc-integration-middleware/tree/main/docs/vendor/commerce) for information on properly setting up each type of vendor.

## API Error

`ApiError`, `ApiGraphQL`

API errors may indicate a misconfiguration on either the vendor side or the extension params. The error status code and message may give some hint as to what the problem is. It's also possible that they represent a bug in the toolkit or integration middleware, in which case they should be reported via an issue.

## Cors

The ecomm-toolkit extension runs from within the browser, so it is subject to Cross Origin request restrictions imposed by the browser. These mean that requests outside the same domain must be explicitly allowed by the destination, in our case the vendor.

The vendor must explicitly allow the domain the extension is running on - this is usually configurable via an admin control panel. When a CORS error is displayed, the origin you should add to your vendor's "allowed origins" list should be printed out. More information on CORS setup is available for each vendor in the [middleware project's documentation](https://github.com/amplience/dc-integration-middleware/tree/main/docs/vendor/commerce).

For some vendors, some types of resource don't have any way of accessing them via CORS at all. View the [middleware support table](https://github.com/amplience/dc-integration-middleware/blob/main/README.md) for more information.

## Not Supported

Certain vendors don't support all request types. Verify that your vendor supports the required requests using the [middleware support table](https://github.com/amplience/dc-integration-middleware/blob/main/README.md).

## Other

Make sure your vendor params are correct. If they are pointing to the wrong service, no service at all or your API client doesn't have appropriate permissions, unexpected errors may occur. 