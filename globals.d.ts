declare global {
    interface Window {
        htmx: Awaited<typeof import("htmx.org")>
    }
}

interface AbsoluteTitle {
    text: string;
    isAbsolute: boolean;
}

type SiteTitle = string | AbsoluteTitle;
type ImgFormats = "jpg" | "jpeg" | "png" | "webp" | "avif";

interface Image {
    url: string;
    width: `${number}`;
    height: `${number}`;
    alt: string;
    type: `image/${ImgFormats}` | `svg/xml`;
}

interface OpenGraph {
    title: SiteTitle;
    description: string;
    image: Image;
}

interface RenderOptions {
    title: SiteTitle;
    description: string;
    openGraph?: OpenGraph;

    [key: string]: any;
}

export type { RenderOptions }
