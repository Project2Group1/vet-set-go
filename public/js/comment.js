const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const commentText = document.querySelector('#comment-input').value.trim();
    const topics_id = document.querySelector('#topic').dataset.id;

    if (commentText) {
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ commentText, topics_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      document.location.reload();
    }
  };
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
