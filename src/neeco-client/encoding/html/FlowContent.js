let contains = require("neeco-client/core/contains")

module.exports = {
    contains: x => {
        return 
            contains("area", x) && isDescendantOf(x, "map")
         || [
                "a",
                "abbr",
                "address",
                "article",
                "aside",
                "audio",
                "b",
                "bdi",
                "bdo",
                "blockquote",
                "br",
                "button",
                "canvas",
                "cite",
                "code",
                "command",
                "datalist",
                "del",
                "details",
                "dfn",
                "div",
                "dl",
                "em",
                "embed",
                "fieldset",
                "figure",
                "footer",
                "form",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "header",
                "hgroup",
                "hr",
                "i",
                "iframe",
                "img",
                "input",
                "ins",
                "kbd",
                "keygen",
                "label",
                "map",
                "mark",
                "math",
                "menu",
                "meter",
                "nav",
                "noscript",
                "object",
                "ol",
                "output",
                "p",
                "pre",
                "progress",
                "q",
                "ruby",
                "s",
                "samp",
                "script",
                "section",
                "select",
                "small",
                "span",
                "strong",
                "sub",
                "sup",
                "svg",
                "table",
                "textarea",
                "time",
                "u",
                "ul",
                "var",
                "video",
                "wbr",
                "text"
            ]
                .some(y => contains(y, x))
    }
}
