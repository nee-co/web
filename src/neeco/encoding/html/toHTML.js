let toCharacterReference = require("neeco/encoding/xml/toCharacterReference")

module.exports = (string) =>
    string
        .replace(
            /(`+)\s*?\r?\n((?:.+?\r?\n)*?)\s*\1/g,
            (match, $1, $2) =>
                "<pre><code>" + toCharacterReference($2) + "</code></pre>"
        )
        .replace(
            /((?:^ {4}(?!(?:[\*\+\-] )).*?\r?\n)+)/gm,
            (match, $1) =>
                "<pre><code>" + toCharacterReference($1) + "</code></pre>"
        )
        .replace(
            /(`+)([^`]+?)\1/g,
            (match, $1, $2) =>
                "<code>" + toCharacterReference($2) + "</code>"
        )
        .replace(/((?:^> .*?\r?\n)+)/gm, "<blockquote>$1</blockquote>")
        .replace(/\[(.*?)\]\((.*?)\)/g, "<a href=\"$2\">$1</a>")
        .replace(/^\s*([_=\-\*])(?: ?\1)+\s*$/gm, "<hr />")
        .replace(/.*/, (string) => {
            while (true) {
                let match = /(^.+?(?:\|.*?)+?$)/m.exec(string)
                         || /(^\|.+?(?:\|.*?)+?$)/m.exec(string)
                         || /(?:^\|(.*?)\|$)/m.exec(string)
                if (match)
                    string = string.replace(
                        new RegExp(
                            "^(?:\|?.*?(?:\|.*?){" + match[0].split("|").length + "}\|\r?\n)*",
                            "gm"
                        ),
                        (s) => 
                            "<table>"
                          + s
                                .split("\r\n")
                                .map((row) =>
                                    "<tr>"
                                  + row
                                        .split("\|")
                                        .join("")
                                  + "</tr>"
                                )
                                .join("")
                          + "</table>"
                    )
                else
                    return string
            }
        })
        .replace(/^\s*(#+)\s+(.+)$/gm, (match, $1, $2) => {
            let tagName = `h${$1.length}`

            return (
                `<${tagName}>`
              + $2
              + `</${tagName}>`
            )
        })
        .replace(/(?:^\s*[\+\-\*]\s+.*?\r?\n)+/gm, (match) => 
            "<ul>"
          + match
                .split(/^\s*[\+\-\*]\s+/gm)
                .slice(1)
                .map((x) => {
                    return `<li>${x}</li>`
                })
                .join("")
          + "</ul>"
        )
        .replace(/(?:^\s*[0-9]\.\s+.*?\r?\n)+/gm, (match) =>
            "<ol>"
          + match
                .split(/\s*[0-9].\s+/)
                .slice(1)
                .map((x) => `<li>${x}</li>`)
                .join("")
          + "</ol>"
        )
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/\*{2}(.+?)\*{2}/g, "<strong>$1</strong>")
        .replace(/~{2}(.*?)~{2}/g, "<s>$1</s>")
        .replace(/(?:\s\r?\n){2,}/g, "<br />\n")
