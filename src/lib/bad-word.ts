import { words } from "@/config/bad-words.json";

export function isBadWord(string: string) {
    for (const word of words) {
        const regexp = new RegExp(`\\b${word.replace(/\W/g, "\\$1")}\\b`, "gi");

        if (regexp.test(string)) {
            return true;
        }
    }

    return false;
}

export function replaceWord(string: string) {
    return string.replace(/[^a-zA-Z0-9]\$|\@^/g, "").replace(/\w/g, "*");
}

export function cleanSentence(string: string) {
    return string
        .split(/\b/)
        .map((word) => {
            return isBadWord(word) ? replaceWord(word) : word;
        })
        .join(/\b/.exec(string)![0]);
}
