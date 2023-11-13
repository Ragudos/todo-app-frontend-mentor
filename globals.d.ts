declare global {
    interface Window {
        htmx: Awaited<typeof import("htmx.org")>
    }
}

export {}
