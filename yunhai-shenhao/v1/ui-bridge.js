$(() => {
  const UI_URL = 'https://raw.githubusercontent.com/Baichen-xi/SillyTavern-storehouse/main/yunhai-shenhao/v1/index.html';
  let htmlCache = '';

  const hideOldMessages = () => {
    $('#chat > .mes').not('.last_mes').remove();
  };

  const loadHtml = async () => {
    if (htmlCache) return htmlCache;
    const response = await fetch(UI_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`UI load failed: ${response.status}`);
    htmlCache = await response.text();
    return htmlCache;
  };

  const mountUi = async () => {
    const roots = document.querySelectorAll('[data-yh-ui-root]:not([data-yh-mounted])');
    if (!roots.length) return;

    try {
      const html = await loadHtml();
      roots.forEach(root => {
        root.innerHTML = html;
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

  refresh();
  setTimeout(refresh, 300);
  setTimeout(refresh, 1200);

  let currentChatId = SillyTavern.getCurrentChatId?.();
  eventOn?.(tavern_events.CHAT_CHANGED, chatId => {
    if (currentChatId !== chatId) {
      currentChatId = chatId;
      htmlCache = '';
      reloadIframe?.();
      setTimeout(refresh, 100);
    }
  });

  eventOn?.(tavern_events.MESSAGE_RECEIVED, () => {
    setTimeout(refresh, 100);
    setTimeout(refresh, 900);
  });
});
