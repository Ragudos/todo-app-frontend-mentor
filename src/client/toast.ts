import { mount_toaster } from "@webdevaaron/vanilla-toast";
import "@webdevaaron/vanilla-toast/index.min.css";

window.addEventListener("DOMContentLoaded", () => {
    mount_toaster({
        position: {
            x: "left",
            y: "bottom"
        }
    });
});
