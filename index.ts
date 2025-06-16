export const TextFormatter = (text: string): string | null => {
  const markdownToText = (textInput: string): string => {
    const escapeMarkdownInUrl = (url: string): string => {
      return url.replace(/[<>"']/g, (char: string) => {
        return (
          {
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          }[char] || char
        );
      });
    };

    const processedText = textInput.replace(
      /(^|\s)(https?:\/\/(?:www\.)?\S+|www\.\S+)/gi,
      (match, prefix, url) => {
        const escapedUrl = escapeMarkdownInUrl(url);
        return `${prefix}<a href="${escapedUrl}">${escapedUrl}</a>`;
      }
    );

    const transformMarkdown = (markdownText: string): string => {
      let transformedText = markdownText;

      // Bold: *text*
      transformedText = transformedText.replace(
        /\B\*(\S(?:.*?\S)?)\*\B/g,
        "<b>$1</b>"
      );

      // Italic: _text_
      transformedText = transformedText.replace(
        /\b_(\S(?:.*?\S)?)_\b/g,
        "<i>$1</i>"
      );

      // Strikethrough: ~text~
      transformedText = transformedText.replace(
        /\B~(\S(?:.*?\S)?)~\B/g,
        "<s>$1</s>"
      );

      // Code block: ```code```
      transformedText = transformedText.replace(
        /```([^`]+)```/g,
        "<pre><code>$1</code></pre>"
      );

      // Inline code: `code`
      transformedText = transformedText.replace(
        /`([^`]+)`/g,
        "<code>$1</code>"
      );

      // Bulleted list: * text or - text
      transformedText = transformedText.replace(
        /^(?:\s*[*-]\s+)(.+)$/gm,
        "<ul><li>$1</li></ul>"
      );

      // Blockquote: > text
      transformedText = transformedText.replace(
        /^\s*>\s*(.+)$/gm,
        "<blockquote>$1</blockquote>"
      );

      // Newlines → <br>, except inside <ul> or <li>
      transformedText = transformedText.replace(
        /(\n)(?!<\/?(ul|li)>)/g,
        "<br>"
      );

      return transformedText;
    };

    const parts = processedText.split(/(<a href=".*?<\/a>)/g);
    for (let i = 0; i < parts.length; i++) {
      if (!parts[i].startsWith("<a href=")) {
        parts[i] = transformMarkdown(parts[i]);
      }
    }

    return parts.join("");
  };

  if (!text) return null;

  const escapeHTML = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const containsHTMLTag = /<\/?[a-z][\s\S]*?>/i.test(text);
  const htmlContent = containsHTMLTag ? escapeHTML(text) : markdownToText(text);

  return htmlContent;
};

export default TextFormatter;
