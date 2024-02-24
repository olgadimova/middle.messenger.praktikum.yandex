window.onload = function () {
  function handleLogin(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    console.log(formData.toString());
  }

  const loginForm: HTMLElement | null = document.getElementById('loginForm');

  loginForm?.addEventListener('submit', handleLogin);
};
