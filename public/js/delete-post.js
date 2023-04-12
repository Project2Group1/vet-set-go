const deleteTopic = document.querySelectorAll('[id^="delete-btn-"]');

const deleteTopicHandler = async (event) => {
    event.preventDefault();

    const topic_id = event.target.id.split('-')[2];

    const response = await fetch(`/api/forums/${topic_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/api/users/profile');
    } else {
        alert('Sorry, please try again later.')
    }
};

deleteTopic.forEach(button => {
    button.addEventListener('click', deleteTopicHandler);
});
  