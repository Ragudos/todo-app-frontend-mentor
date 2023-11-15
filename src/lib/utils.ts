let timeStamp: number | undefined;

const htmlEntityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;", // Use '&#39;' instead of '&apos;' for wider browser support
};

function escapeHtml(str: string) {
    str = str.replace(/%2520/g, " ").replace(/%20/g, " ");

    return str.replace(/[&<>"']/g, function (char: string) {
        return htmlEntityMap[char as keyof typeof htmlEntityMap];
    });
}

export function cleanInput(val: string) {
    return escapeHtml(val);
}

export function parseCookie(cookieStr: string): Record<string, string> {
    const parsedCookie: Record<string, string> = {};

    for (const cookie of cookieStr.split(";")) {
        const splitCookieIntoKeyValuePair = cookie.split("=") as [
            string,
            string,
        ];

        parsedCookie[splitCookieIntoKeyValuePair[0].trim()] =
            splitCookieIntoKeyValuePair[1].trim();
    }

    return parsedCookie;
}

export function getTimestampForCacheBusting(
    shoudGetNewTimeStamp: boolean = true
) {
    if (process.env.NODE_ENV != "production") {
        timeStamp = Date.now();
    } else {
        if (!timeStamp || Date.now() - timeStamp == 1000 * 60 * 60) {
            if (shoudGetNewTimeStamp) {
                timeStamp = Date.now();
                console.log(
                    `New time stamp for assets at ${timeStamp} milliseconds. On ${new Date(
                        timeStamp
                    )}`
                );
            }
        }
    }

    return timeStamp;
}
