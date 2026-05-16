$(() => {
  const hideOldMessages = () => {
    $('#chat > .mes').not('.last_mes').remove();
  };

  hideOldMessages();

  let currentChatId = SillyTavern.getCurrentChatId?.();
  eventOn?.(tavern_events.CHAT_CHANGED, chatId => {
    if (currentChatId !== chatId) {
      currentChatId = chatId;
      reloadIframe?.();
      setTimeout(hideOldMessages, 100);
    }
  });

  eventOn?.(tavern_events.MESSAGE_RECEIVED, () => {
    setTimeout(hideOldMessages, 100);
  });
});
