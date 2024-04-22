const promiseBtn = document.getElementById('promiseBtn');
const resultDiv = document.getElementById('result');

promiseBtn.addEventListener('click', () => {
  resultDiv.textContent = 'Loading...';
  fetchDataPromise()
    .then(data => {
      const postTitles = data.posts.map(post => `<p>${post.title}</p>`);
      resultDiv.innerHTML = postTitles.join('');
    })
    .catch(error => {
      resultDiv.textContent = 'Error: ' + error.message;
    });
});

// Fetches data from the API using Promises
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    // Create a timeout to reject the Promise after 5 seconds
    const timeout = setTimeout(() => {
      reject(new Error('Operation timed out'));
    }, 5000);

    fetch('https://dummyjson.com/posts')
      .then(response => response.json())
      .then(data => {
        // Clear the timeout if the Promise is resolved before the timeout
        clearTimeout(timeout);
        resolve(data);
      })
      .catch(error => {
        // Clear the timeout and reject the Promise if there's an error
        clearTimeout(timeout);
        reject(error);
      });
  });
}
