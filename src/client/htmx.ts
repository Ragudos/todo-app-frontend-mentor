import * as htmx from "htmx.org";
import { toast } from "@webdevaaron/vanilla-toast";

window.htmx = htmx;

interface ErrorEvent {
    detail: {
        boosted: undefined;
        elt: HTMLElement;
        error: string;
        etc: Record<string, any>;
        failed: boolean;
        pathInfo: {
            anchor: undefined;
            finalRequestPath: string;
            requestPath: string;
            responsePath: string;
        };
        xhr: XMLHttpRequest;
    };
    srcElement: EventTarget | null;
    type: string;
    target: EventTarget | null;
}

function init() {
    // @ts-expect-error
    document.body.addEventListener("htmx:responseError", (e: ErrorEvent) => {
        toast.error(
            {
                title: e.detail.xhr.status.toString(),
                message: e.detail.xhr.responseText
            },
            {
                theme: document.documentElement.getAttribute("data-theme") as "dark" | "light" | "system",
                role: "alert",
                style: "glass",
                close_button: {
                    is_shown_on_hover: false,
                    position: "right"
                },
            }
        );
    });
}

window.addEventListener("DOMContentLoaded", init);
