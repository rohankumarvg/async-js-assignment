const asyncAwaitBtn = document.getElementById('asyncAwaitBtn');
const resultDiv = document.getElementById('result');

asyncAwaitBtn.addEventListener('click', async () => {
  resultDiv.textContent = 'Loading...';

  let isFetchCompleted = false; // Flag to track if fetch operation completed within timeout
  const timeout = setTimeout(() => {
    if (!isFetchCompleted) {
      resultDiv.textContent = 'Error: Operation Timed Out';
    }
  }, 5000); // Set a timeout of 5 seconds

  try {
    const response = await fetch('https://dummyjson.com/posts');
    const data = await response.json();
    isFetchCompleted = true; // Mark fetch operation as completed
    clearTimeout(timeout); // Clear the timeout since fetch completed within 5 seconds
    const postTitles = data.posts.map(post => `<p>${post.title}</p>`);
    resultDiv.innerHTML = postTitles.join('');
  } catch (error) {
    clearTimeout(timeout); // Clear the timeout if an error occurs
    resultDiv.textContent = 'Error: ' + error.message;
  }
});
