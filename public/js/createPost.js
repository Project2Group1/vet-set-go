const postFormHandler = async (event) => {
    event.preventDefault();
  
    const titleText = document.querySelector('#title-input').value.trim();
    const descriptionText = document.querySelector('#description-input').value.trim();

    if (titleText && descriptionText) {
      await fetch('/api/forums', {
        method: 'POST',
        body: JSON.stringify({ titleText, descriptionText }),
        headers: { 'Content-Type': 'application/json' },
      });

      document.location.reload();
    }
  };
  
  document.querySelector('.topic-form').addEventListener('submit', postFormHandler);
