/**
 * Image services we know how to ask for a resized, square-cropped image.
 * Each one is matched on the image URL and adds its own resize parameters.
 *
 * Images from anywhere else are returned untouched: they load at full size,
 * but never break because of parameters their server doesn't understand
 * (Adobe Dynamic Media, for example, rejects an unexpected `fit` with a 403).
 */
type ImageService = {
    matches: (url: URL) => boolean
    resize: (src: string, size: number) => string
}

const withParams = (src: string, params: string) =>
    `${src}${src.includes('?') ? '&' : '?'}${params}`

const imageServices: ImageService[] = [
    // Amplience Dynamic Media
    {
        matches: ({ hostname, pathname }) =>
            /(^|\.)(amplience\.net|adis\.ws|bigcontent\.io)$/.test(hostname) &&
            pathname.startsWith('/i/'),
        resize: (src, size) =>
            withParams(src, `w=${size}&h=${size}&sm=c&fmt=auto`)
    },
    // Adobe Dynamic Media (Scene7 / AEM) image serving, on any domain
    {
        matches: ({ pathname }) => pathname.includes('/is/image/'),
        resize: (src, size) =>
            withParams(src, `wid=${size}&hei=${size}&fit=crop,1`)
    },
    // Adobe Dynamic Media with OpenAPI (AEM as a Cloud Service)
    {
        matches: ({ hostname, pathname }) =>
            hostname.endsWith('.adobeaemcloud.com') &&
            pathname.startsWith('/adobe/'),
        resize: (src, size) => withParams(src, `width=${size}&height=${size}`)
    },
    // Salesforce Commerce Cloud Dynamic Imaging Service
    {
        matches: ({ pathname }) => pathname.includes('/dw/image/'),
        resize: (src, size) => withParams(src, `sw=${size}`)
    },
    // Shopify CDN
    {
        matches: ({ hostname, pathname }) =>
            hostname === 'cdn.shopify.com' || pathname.includes('/cdn/shop/'),
        resize: (src, size) =>
            withParams(src, `width=${size}&height=${size}&crop=center`)
    },
    // BigCommerce CDN (size is part of the path)
    {
        matches: ({ hostname, pathname }) =>
            hostname.endsWith('.bigcommerce.com') &&
            pathname.includes('/images/stencil/'),
        resize: (src, size) =>
            src.replace(/\/images\/stencil\/[^/]+\//, `/images/stencil/${size}x${size}/`)
    },
    // imgix, and Sanity (which uses imgix-style parameters)
    {
        matches: ({ hostname }) =>
            hostname.endsWith('.imgix.net') || hostname === 'cdn.sanity.io',
        resize: (src, size) =>
            withParams(src, `w=${size}&h=${size}&fit=crop&auto=format`)
    },
    // Contentful Images API
    {
        matches: ({ hostname }) => hostname === 'images.ctfassets.net',
        resize: (src, size) => withParams(src, `w=${size}&h=${size}&fit=fill`)
    }
]

/**
 * Returns a URL for a square image of `size` pixels, if the image's host
 * supports resizing via its URL. Otherwise returns `src` unchanged.
 */
export function getResizedImageUrl(src: string | undefined, size: number) {
    if (!src) return src

    let url: URL
    try {
        url = new URL(src, 'https://localhost')
    } catch {
        return src
    }

    const service = imageServices.find((s) => s.matches(url))
    return service ? service.resize(src, size) : src
}
