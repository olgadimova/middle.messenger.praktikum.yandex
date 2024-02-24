window.onload = function () {
  function toggleModal(modal: HTMLElement) {
    let modalStyle = modal.style;

    if (modalStyle.display === 'none') {
      modalStyle.display = 'flex';
    } else {
      modalStyle.display = 'none';
    }
  }

  // Тогл меню контроля в шапке чата
  const toggleChatMenuButton = document.querySelector('#toggleManageChatModal');
  const manageChatModal = document.getElementById('manageChatModal');

  toggleChatMenuButton?.addEventListener('click', () => {
    if (manageChatModal) {
      toggleModal(manageChatModal);
    }
  });

  // Закрытие модального окна через кнопку X в самом окне
  const closeModalButton = document.querySelectorAll('.closeModal');

  if (closeModalButton) {
    closeModalButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        const dataToggleName = (event.target as HTMLElement)?.getAttribute('data-toggle');

        if (dataToggleName) {
          const modalByCloseButton = document.getElementById(dataToggleName);

          if (modalByCloseButton) {
            toggleModal(modalByCloseButton);
          }
        }
      });
    });
  }

  // Открытие модального окна через меню контроля в шапке чата
  const chatControlButtons = document.querySelectorAll('.chatControls');

  chatControlButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chatControlModal = document.getElementById((button as HTMLButtonElement).value);

      if (manageChatModal) {
        toggleModal(manageChatModal);
      }

      if (chatControlModal) {
        toggleModal(chatControlModal);
      }
    });
  });
};
