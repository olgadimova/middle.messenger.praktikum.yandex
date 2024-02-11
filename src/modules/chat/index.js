window.onload = function () {
  function toggleModal(modal) {
    if (modal.style.display === 'none') {
      modal.style.display = 'flex';
    } else {
      modal.style.display = 'none';
    }
  }

  // Тогл меню контроля в шапке чата
  const toggleChatMenuButton = document.querySelector('#toggleManageChatModal');
  const manageChatModal = document.getElementById('manageChatModal');

  toggleChatMenuButton.addEventListener('click', () =>
    toggleModal(manageChatModal)
  );

  // Закрытие модального окна через кнопку X в самом окне
  const closeModalButton = document.querySelectorAll('.closeModal');

  if (closeModalButton) {
    closeModalButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        const modalByCloseButton = document.getElementById(
          event.target.getAttribute('data-toggle')
        );

        toggleModal(modalByCloseButton);
      });
    });
  }

  // Открытие модального окна через меню контроля в шапке чата
  const chatControlButtons = document.querySelectorAll('.chatControls');

  chatControlButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chatControlModal = document.getElementById(button.value);

      toggleModal(manageChatModal);
      toggleModal(chatControlModal);
    });
  });
};
