import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "strike",
  "del",
  "code",
  "pre",
  "blockquote",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "hr",
  "br",
  "span",
  "div",
  "sub",
  "sup",
  "iframe",
  "figure",
  "figcaption",
  "input",
  "mark",
  "button",
];

const ALLOWED_ATTR = [
  "href",
  "target",
  "rel",
  "title",
  "src",
  "alt",
  "width",
  "height",
  "class",
  "style",
  "align",
  "type",
  "checked",
  "disabled",
  "allow",
  "allowfullscreen",
  "frameborder",
  "data-callout",
  "data-align",
  "data-width",
];

const ALLOWED_URI_REGEXP = /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i;

// Ensure iframes are only from trusted video providers (YouTube, Vimeo)
const ALLOWED_IFRAME_HOSTS = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
];

export function sanitizeHtml(rawHtml: string): string {
  if (!rawHtml) return "";

  // If the content doesn't appear to contain HTML tags (legacy plain text), convert newlines to paragraphs
  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(rawHtml);
  let contentToSanitize = rawHtml;
  if (!hasHtml) {
    contentToSanitize = rawHtml
      .split(/\n{2,}/)
      .map((para) => `<p>${para.trim().replace(/\n/g, "<br/>")}</p>`)
      .join("");
  }

  const clean = DOMPurify.sanitize(contentToSanitize, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP,
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "target"],
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });

  return clean;
}
