"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/views/index.pug
var views_exports = {};
__export(views_exports, {
  default: () => views_default
});
module.exports = __toCommonJS(views_exports);
function pug_attr(t, e, n, r) {
  if (false === e || null == e || !e && ("class" === t || "style" === t))
    return "";
  if (true === e)
    return " " + (r ? t : t + '="' + t + '"');
  var f = typeof e;
  return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'";
}
function pug_escape(e) {
  var a = "" + e, t = pug_match_html.exec(a);
  if (!t)
    return e;
  var r, c, n, s = "";
  for (r = t.index, c = 0; r < a.length; r++) {
    switch (a.charCodeAt(r)) {
      case 34:
        n = "&quot;";
        break;
      case 38:
        n = "&amp;";
        break;
      case 60:
        n = "&lt;";
        break;
      case 62:
        n = "&gt;";
        break;
      default:
        continue;
    }
    c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
  }
  return c !== r ? s + a.substring(c, r) : s;
}
var pug_match_html = /["&<>]/;
function pug_rethrow(e, n, r, t) {
  if (!(e instanceof Error))
    throw e;
  if (!("undefined" == typeof window && n || t))
    throw e.message += " on line " + r, e;
  var o, a, i, s;
  try {
    t = t || require("fs").readFileSync(n, { encoding: "utf8" }), o = 3, a = t.split("\n"), i = Math.max(r - o, 0), s = Math.min(a.length, r + o);
  } catch (t2) {
    return e.message += " - could not read from " + n + " (" + t2.message + ")", void pug_rethrow(e, null, r);
  }
  o = a.slice(i, s).map(function(e2, n2) {
    var t2 = n2 + i + 1;
    return (t2 == r ? "  > " : "    ") + t2 + "| " + e2;
  }).join("\n"), e.path = n;
  try {
    e.message = (n || "Pug") + ":" + r + "\n" + o + "\n\n" + e.message;
  } catch (e2) {
  }
  throw e;
}
function template(locals) {
  var pug_html = "", pug_mixins = {}, pug_interp;
  var pug_debug_filename, pug_debug_line;
  try {
    ;
    var locals_for_with = locals || {};
    (function(currentTheme2, message2, nonceId2, require2, title2) {
      ;
      pug_debug_line = 1;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      pug_html = pug_html + "<!DOCTYPE html>";
      ;
      pug_debug_line = 2;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      pug_html = pug_html + "<html" + pug_attr("theme", currentTheme2, true, true) + ">";
      ;
      pug_debug_line = 2;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      pug_html = pug_html + " </html>";
      ;
      pug_debug_line = 3;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      pug_html = pug_html + "<head>";
      ;
      pug_debug_line = 5;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      pug_html = pug_html + '<link rel="preconnect" href="https://fonts.googleapis.com">';
      ;
      pug_debug_line = 6;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      pug_html = pug_html + '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="use-credential">';
      ;
      pug_debug_line = 7;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      pug_html = pug_html + '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&amp;display=swap">';
      ;
      pug_debug_line = 8;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      pug_html = pug_html + "<title>";
      ;
      pug_debug_line = 8;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      pug_html = pug_html + pug_escape(null == (pug_interp = title2) ? "" : pug_interp) + "</title>";
      ;
      pug_debug_line = 12;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      pug_html = pug_html + "<style" + pug_attr("none", nonceId2, true, true) + ">";
      ;
      pug_debug_line = 12;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      pug_html = pug_html + pug_escape(null == (pug_interp = require2("../styles/resets.modules.css")) ? "" : pug_interp) + "</style>";
      ;
      pug_debug_line = 14;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      pug_html = pug_html + "</head>";
      ;
      pug_debug_line = 15;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      pug_html = pug_html + "<body>";
      ;
      pug_debug_line = 16;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\scaffold\\layout.pug";
      ;
      pug_debug_line = 4;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\index.pug";
      pug_html = pug_html + "<h1>";
      ;
      pug_debug_line = 4;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\index.pug";
      pug_html = pug_html + pug_escape(null == (pug_interp = message2) ? "" : pug_interp) + "</h1>";
      ;
      pug_debug_line = 5;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\index.pug";
      pug_html = pug_html + '<button hx-put="/change-theme/dark" hx-trigger="click" hx-swap="none">';
      ;
      pug_debug_line = 5;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\index.pug";
      pug_html = pug_html + "Click me</button>";
      ;
      pug_debug_line = 6;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\index.pug";
      pug_html = pug_html + '<button hx-put="/change-theme/system" hx-trigger="click" hx-swap="none">';
      ;
      pug_debug_line = 6;
      pug_debug_filename = "C:\\projects\\frontend-mentor\\todo-app\\src\\views\\index.pug";
      pug_html = pug_html + "Click me</button></body>";
    }).call(this, "currentTheme" in locals_for_with ? locals_for_with.currentTheme : typeof currentTheme !== "undefined" ? currentTheme : void 0, "message" in locals_for_with ? locals_for_with.message : typeof message !== "undefined" ? message : void 0, "nonceId" in locals_for_with ? locals_for_with.nonceId : typeof nonceId !== "undefined" ? nonceId : void 0, "require" in locals_for_with ? locals_for_with.require : typeof require !== "undefined" ? require : void 0, "title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : void 0);
    ;
  } catch (err) {
    pug_rethrow(err, pug_debug_filename, pug_debug_line);
  }
  ;
  return pug_html;
}
var views_default = template;
