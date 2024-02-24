window.onload = function () {
  function handleUpdateProfile(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    console.log(formData.toString());
  }

  const profileUpdateForm: HTMLElement | null = document.getElementById('profileUpdateForm');

  profileUpdateForm?.addEventListener('submit', handleUpdateProfile);
};
