let toCharacterReference = require("neeco-client/encoding/xml/toCharacterReference")

module.exports = window.x = (string) =>
    string
        .replace(
            /(`+)\s*?\r?\n((?:.+?\r?\n)*?)\s*\1/g,
            (match, $1, $2) =>
                "<pre><code>" + toCharacterReference($2) + "</code></pre>"
        )
        .replace(
            /((?:^ {4}(?!(?:[\*\+\-] )).*?$\r?\n?)+)/gm,
            (match, $1) =>
                "<pre><code>" + toCharacterReference($1) + "</code></pre>"
        )
        .replace(
            /(`+)([^`]+?)\1/g,
            (match, $1, $2) =>
                "<code>" + toCharacterReference($2) + "</code>"
        )
        .replace(/((?:^> .*?$\r?\n?)+)/gm, "<blockquote>$1</blockquote>")
        .replace(/\[(.*?)\]\((.*?)\)/g, "<a href=\"$2\">$1</a>")
        .replace(/^\s*([_=\-\*])(?: ?\1)+\s*?/gm, "<hr />")
        .replace(/^(\s*[^\|\s]+?\s*(?:\|\s*[^\|\s]+?\s*?)+)$/gm, "|$1|")
        .replace(/^[\s\S]*$/, (string) => {
            while (true) {
                let match = /(?:^\s*\|.*\|\s*$)/m.exec(string)
                if (match)
                    string = string.replace(
                        new RegExp(
                            "(?:^\s*\\|(?:.*?\\|){" + (match[0].split("|").length - 2) + "}\s*$\r?\n?)+",
                            "m"
                        ),
                        (s) => 
                            "<table>"
                          + s.replace(/((?:^\s*\|.+\|\s*$\r?\n?)+?)^\s*(?:\|?\s*\:\-+\:\s*\|)+\s*$\r?\n?/gm, (_, rows) =>
                                "<thead>"
                              + rows.replace(/^.+$/gm, (row) =>
                                    "<tr>"
                                  + row.replace(/\|?(.+?)\|/gm, (_, column) =>
                                        "<th>"
                                      + column
                                      + "</th>"
                                    )
                                  + "</tr>"
                                )
                              + "</thead>\n"
                            ).replace(/(?:^\s*\|.+\|\s*$\r?\n?)+/gm, (rows) =>
                                "<tbody>"
                              + rows.replace(/^.+$/gm, (row) =>
                                    "<tr>"
                                  + row.replace(/\|?(.+?)\|/g, (_, column) =>
                                        "<td>"
                                      + column
                                      + "</td>"
                                    )
                                  + "</tr>"
                                )
                              + "</tbody>"
                            )
                          + "</table>"
                    )
                else
                    break
            }

            return string
        })
        .replace(/^\s*(#+)\s+(.+)$/gm, (match, $1, $2) => {
            let tagName = `h${$1.length}`

            return (
                `<${tagName}>`
              + $2
              + `</${tagName}>`
            )
        })
        .replace(/(?:^\s*[\+\-\*]\s+.*$\r?\n?)+/gm, (match) => {
            let spaces = /^(\s*).*$/m.exec(match)[1]

            return (
                "<ul>"
              + match.replace(/^\s*[\+\-\*]\s+(.*)$/gm, (_, x) =>
                    "<li>"
                  + x
                  + "</li>"
                )
              + "</ul>"
            )
        })
        .replace(/(?:^\s*[0-9]\.\s+.*$\r?\n?)+/gm, (match) =>
            "<ol>"
          + match.replace(/^\s*[0-9]\.\s+(.*)$/gm, (_, x) =>
                "<li>"
              + x
              + "</li>"
            )
          + "</ol>"
        )
        .replace(/\*{2}(.+?)\*{2}/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/~{2}(.*?)~{2}/g, "<s>$1</s>")
        .replace(/\s{2,}?$(\r?\n)/gm, "<br />$1")
