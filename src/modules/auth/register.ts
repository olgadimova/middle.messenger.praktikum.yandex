window.onload = function () {
  function handleRegister(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    console.log(formData.toString());
  }

  const registerForm: HTMLElement | null = document.getElementById('registerForm');

  registerForm?.addEventListener('submit', handleRegister);
};
