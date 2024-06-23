"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextFormatter = function (text) {
    var markdownToText = function (textInput) {
        var escapeMarkdownInUrl = function (url) {
            return url.replace(/[<>"']/g, function (char) {
                return ({
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;',
                }[char] || char);
            });
        };
        var processedText = textInput.replace(/(^|\s)(https?:\/\/(?:www\.)?\S+|www\.\S+)/gi, function (match, p1, p2) {
            return "".concat(p1, "<a href=\"").concat(escapeMarkdownInUrl(p2), "\">").concat(escapeMarkdownInUrl(p2), "</a>");
        });
        var transformMarkdown = function (markdownText) {
            var transformedText = markdownText;
            // Bold: *text*
            transformedText = transformedText.replace(/\B\*(\S(?:.*?\S)?)\*\B/g, '<b>$1</b>');
            // Italic: _text_
            transformedText = transformedText.replace(/\b_(\S(?:.*?\S)?)_\b/g, '<i>$1</i>');
            // Strikethrough: ~text~
            transformedText = transformedText.replace(/\B~(\S(?:.*?\S)?)~\B/g, '<s>$1</s>');
            // Code block (triple backticks): ```code```
            transformedText = transformedText.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
            // Inline code: `code`
            transformedText = transformedText.replace(/`([^`]+)`/g, '<code>$1</code>');
            // Bulleted list: * text or - text (only if there is a space after * or -)
            transformedText = transformedText.replace(/^(?:\s*[*-]\s+)(.+)$/gm, '<ul><li>$1</li></ul>');
            // Quote block: > text
            transformedText = transformedText.replace(/^\s*>\s*(.+)$/gm, '<blockquote>$1</blockquote>');
            // Replace newline characters with <br> tags
            transformedText = transformedText.replace(/(\n)(?!<\/?(ul|li)>)/g, '<br>');
            return transformedText;
        };
        var parts = processedText.split(/(<a href=".*?<\/a>)/g);
        for (var i = 0; i < parts.length; i += 1) {
            if (!parts[i].startsWith('<a href=')) {
                parts[i] = transformMarkdown(parts[i]);
            }
        }
        return parts.join('');
    };
    if (!text)
        return null;
    var htmlContent = markdownToText(text);
    return htmlContent;
};
exports.default = TextFormatter;
