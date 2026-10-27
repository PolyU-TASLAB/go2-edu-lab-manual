(() => {
  const preferenceKey = 'go2_manual_language';
  const catalog = JSON.parse(document.getElementById('manual-translations').textContent);
  const lookup = new Map();
  for (const [en, zh] of catalog) {
    const entry = { en, 'zh-CN': zh };
    lookup.set(en, entry);
    lookup.set(zh, entry);
  }
  let language = 'en';
  const translate = (value) => {
    const key = value.trim();
    const entry = lookup.get(key);
    if (!entry) return value;
    const start = value.indexOf(key);
    return value.slice(0, start) + entry[language] + value.slice(start + key.length);
  };
  function setLanguage(next, remember = true) {
    language = next === 'zh-CN' ? 'zh-CN' : 'en';
    document.documentElement.lang = language;
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement?.closest('script, style, [data-i18n-ignore]')) {
        node.nodeValue = translate(node.nodeValue);
      }
    }
    for (const element of document.querySelectorAll('[alt], [aria-label], [data-copy-label], meta[name="description"]')) {
      for (const name of ['alt', 'aria-label', 'data-copy-label', 'content']) {
        if (element.hasAttribute(name)) element.setAttribute(name, translate(element.getAttribute(name)));
      }
    }
    for (const button of document.querySelectorAll('[data-language]')) {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    }
    if (remember) {
      try { localStorage.setItem(preferenceKey, language); } catch { /* A blocked store does not disable switching. */ }
    }
  }
  window.ManualI18n = { t: translate, setLanguage, get language() { return language; } };
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });
  let preferred = 'en';
  try { preferred = localStorage.getItem(preferenceKey) || 'en'; } catch { /* Default to English. */ }
  setLanguage(preferred, false);
})();
