function getArticleTextAndTitle() {
  let text = "";
  let title = document.title;
  const article = document.querySelector("article");
  if (article) {
    text = article.innerText;
    // Try to get a heading inside the article as a better title
    const heading = article.querySelector("h1, h2, h3");
    if (heading && heading.innerText.length > 5) title = heading.innerText;
  } else {
    const paragraphs = Array.from(document.querySelectorAll("p"));
    text = paragraphs.map((p) => p.innerText).join("\n");
    // Try to get a main heading on the page
    const heading = document.querySelector("h1, h2, h3");
    if (heading && heading.innerText.length > 5) title = heading.innerText;
  }
  return { text, title };
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === "GET_ARTICLE_TEXT_AND_TITLE") {
    const { text, title } = getArticleTextAndTitle();
    sendResponse({ text, title });
  } else if (req.type === "GET_ARTICLE_TEXT") {
    const text = getArticleText();
    sendResponse({ text });
  }
});
