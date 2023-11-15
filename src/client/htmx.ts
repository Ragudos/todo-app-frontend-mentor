import * as htmx from "htmx.org";

window.htmx = htmx;

function init() {
    if (document.documentElement.getAttribute("data-env") != "production") {
        htmx.logAll();
    }

    document
        .querySelector("#section-of-todos")
        ?.addEventListener("htmx:afterOnLoad", (_e) => {
            let amountOfItems = 0;
            const activeFilterButton = document.querySelector(
                "[name='active-filter-todo-button']"
            )! as HTMLButtonElement;
            const activeFilter = activeFilterButton.value;
            const children = Array.from(
                document.querySelector("#section-of-todos")!.children
            );
            const amountOfItemsLeftIndicator = document.querySelector(
                "#amount-of-items-left"
            )!;

            if (children[0] instanceof HTMLElement) {
                if (children[0].dataset.type == "empty-list-indicator") {
                    if (activeFilter.toLowerCase() == "completed") {
                        amountOfItemsLeftIndicator.textContent =
                            amountOfItems + " completed items";
                    } else {
                        amountOfItemsLeftIndicator.textContent =
                            amountOfItems + " items left";
                    }
                } else {
                    if (activeFilter.toLowerCase() == "completed") {
                        amountOfItems = children.filter((item) => {
                            return item.getAttribute("data-active") == "true";
                        }).length;

                        amountOfItemsLeftIndicator.textContent =
                            amountOfItems + " completed items";
                    } else if (activeFilter.toLowerCase() == "all") {
                        amountOfItems = children.filter((item) => {
                            return item.getAttribute("data-active") != "true";
                        }).length;

                        amountOfItemsLeftIndicator.textContent =
                            amountOfItems + " items left";
                    } else if (activeFilter.toLowerCase() == "active") {
                        amountOfItems = children.filter((item) => {
                            return item.getAttribute("data-active") != "true";
                        }).length;

                        amountOfItemsLeftIndicator.textContent =
                            amountOfItems + " todos left to be done";
                    }
                }
            }
        });

    document.querySelectorAll("[data-disableonclick]").forEach((item) => {
        item.addEventListener("click", () => {
            item.setAttribute("disabled", "true");
        });
    });

    document
        .querySelector("#create-new-todo")
        ?.addEventListener("submit", (_e) => {
            document.querySelectorAll("input[type='text']").forEach((input) => {
                if (input instanceof HTMLInputElement) {
                    input.value = "";
                }
            });
        });
}

window.addEventListener("DOMContentLoaded", init);
