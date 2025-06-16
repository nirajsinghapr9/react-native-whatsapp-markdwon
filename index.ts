export const TextFormatter = (text: string): string | null => {
  if (!text) return null;

  const escapeHTML = (unsafe: string): string =>
    unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const markdownToText = (textInput: string): string => {
    const escapeMarkdownInUrl = (url: string): string => {
      return url.replace(/[<>"']/g, escapeHTML);
    };

    const processedText = textInput.replace(
      /(^|\s)(https?:\/\/(?:www\.)?\S+|www\.\S+)/gi,
      (match, prefix, url) => {
        const escapedHref = escapeMarkdownInUrl(url);
        return `${prefix}<a href="${escapedHref}">${escapedHref}</a>`;
      }
    );

    const transformMarkdown = (markdownText: string): string => {
      let transformed = markdownText;

      // Bold: *text*
      transformed = transformed.replace(/\*(\S(?:.*?\S)?)\*/g, "<b>$1</b>");

      // Italic: _text_
      transformed = transformed.replace(/_(\S(?:.*?\S)?)_/g, "<i>$1</i>");

      // Strikethrough: ~text~
      transformed = transformed.replace(/~(\S(?:.*?\S)?)~/g, "<s>$1</s>");

      // Code block: ```code```
      transformed = transformed.replace(
        /```([^`]+)```/g,
        "<pre><code>$1</code></pre>"
      );

      // Inline code: `code`
      transformed = transformed.replace(/`([^`]+)`/g, "<code>$1</code>");

      // Bulleted list: * or - with space
      transformed = transformed.replace(
        /^(?:\s*[*-]\s+)(.+)$/gm,
        "<ul><li>$1</li></ul>"
      );

      // Quote block: > text
      transformed = transformed.replace(
        /^>\s*(.+)$/gm,
        "<blockquote>$1</blockquote>"
      );

      // Replace newline characters with <br> (excluding lists)
      transformed = transformed.replace(
        /(\n)(?!<\/?(ul|li|pre|code|blockquote)>)/g,
        "<br>"
      );

      return transformed;
    };

    const parts = processedText.split(/(<a href=".*?<\/a>)/g);

    for (let i = 0; i < parts.length; i += 1) {
      if (!parts[i].startsWith("<a href=")) {
        parts[i] = transformMarkdown(parts[i]);
      }
    }

    return parts.join("");
  };

  // Escape all HTML from input first
  const escapedText = escapeHTML(text);

  // Then apply markdown
  const htmlContent = markdownToText(escapedText);
  return htmlContent;
};

export default TextFormatter;
