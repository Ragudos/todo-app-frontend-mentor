import { mount_toaster, toast } from "@webdevaaron/vanilla-toast";
import "@webdevaaron/vanilla-toast/index.min.css";

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

window.addEventListener("DOMContentLoaded", () => {
    mount_toaster({
        position: {
            x: "left",
            y: "bottom",
        },
    });

    // @ts-expect-error
    document.body.addEventListener("htmx:responseError", (e: ErrorEvent) => {
        toast.error(
            {
                title: e.detail.xhr.status.toString(),
                message: e.detail.xhr.responseText,
            },
            {
                theme: document.documentElement.getAttribute("data-theme") as
                    | "dark"
                    | "light"
                    | "system",
                role: "alert",
                style: "glass",
                close_button: {
                    is_shown_on_hover: false,
                    position: "right",
                },
            }
        );
    });

    // @ts-expect-error
    document.body.addEventListener("htmx:sendError", (e: { xhr: XMLHttpRequest }) => {
        toast.error(
            {
                title: e.xhr.status.toString(),
                message: e.xhr.responseText,
            },
            {
                theme: document.documentElement.getAttribute("data-theme") as
                    | "dark"
                    | "light"
                    | "system",
                role: "alert",
                style: "glass",
                close_button: {
                    is_shown_on_hover: false,
                    position: "right",
                },
            }
        );
    });
});
