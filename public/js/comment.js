const commentFormHandler = async function(event) {
  event.preventDefault();

  const projectId = document.querySelector('input[name="project-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;

  if (body) {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        projectId,
        body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    document.location.reload();
  }
};

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);
