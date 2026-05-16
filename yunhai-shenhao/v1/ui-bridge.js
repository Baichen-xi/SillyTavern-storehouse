(function bootYunhaiBridge() {
  const UI_URL = 'https://raw.githubusercontent.com/Baichen-xi/SillyTavern-storehouse/main/yunhai-shenhao/v1/index.html';
  let htmlCache = '';
  let observer = null;

  const hideOldMessages = () => {
    if (globalThis.$) {
      $('#chat > .mes').not('.last_mes').remove();
    }
  };

  const loadHtml = async () => {
    if (htmlCache) return htmlCache;
    const response = await fetch(UI_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`UI load failed: ${response.status}`);
    htmlCache = await response.text();
    return htmlCache;
  };

  const runInsertedScripts = root => {
    root.querySelectorAll('script').forEach(oldScript => {
      const script = document.createElement('script');
      for (const attr of oldScript.attributes) script.setAttribute(attr.name, attr.value);
      script.textContent = oldScript.textContent;
      oldScript.replaceWith(script);
    });
  };

  const mountUi = async () => {
    const roots = document.querySelectorAll('[data-yh-ui-root]:not([data-yh-mounted])');
    if (!roots.length) return;

    try {
      const html = await loadHtml();
      roots.forEach(root => {
        root.innerHTML = html;
        runInsertedScripts(root);
        root.dataset.yhMounted = 'true';
      });
    } catch (error) {
      roots.forEach(root => {
        root.innerHTML = `<div style="padding:12px;border:1px solid #8c6a2c;border-radius:8px;color:#f0d995;background:#14100b;line-height:1.6">
          云海神豪前端加载失败。请先关闭“界面”正则继续文本模式，或检查 Raw 链接访问。<br>
          <small>${String(error.message || error)}</small>
        </div>`;
        root.dataset.yhMounted = 'error';
      });
    }
  };

  const refresh = () => {
    hideOldMessages();
    mountUi();
  };

  const startObserver = () => {
    if (observer) return;
    observer = new MutationObserver(() => refresh());
    observer.observe(document.body, { childList: true, subtree: true });
  };

  const start = () => {
    refresh();
    startObserver();
    [300, 900, 1800, 3200, 5000].forEach(ms => setTimeout(refresh, ms));

    let currentChatId = globalThis.SillyTavern?.getCurrentChatId?.();
    globalThis.eventOn?.(globalThis.tavern_events?.CHAT_CHANGED, chatId => {
      if (currentChatId !== chatId) {
        currentChatId = chatId;
        htmlCache = '';
        globalThis.reloadIframe?.();
        setTimeout(refresh, 100);
        setTimeout(refresh, 900);
      }
    });

    globalThis.eventOn?.(globalThis.tavern_events?.MESSAGE_RECEIVED, () => {
      setTimeout(refresh, 100);
      setTimeout(refresh, 900);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
