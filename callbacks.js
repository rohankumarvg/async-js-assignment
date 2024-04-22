const callbackBtn = document.getElementById('callbackBtn');
const resultDiv = document.getElementById('result');

// Simulates a delay by executing the provided callback function after the specified delay
function simulateDelay(delay, callback) {
  setTimeout(callback, delay);
}

// Fetches data from the API using callbacks
function fetchDataCallback() {
  fetch('https://dummyjson.com/posts')
    .then(response => response.json())
    .then(data => {
      const postTitles = data.posts.map(post => `<p>${post.title}</p>`);
      resultDiv.innerHTML = postTitles.join('');
    })
    .catch(error => {
      resultDiv.textContent = 'Error: ' + error.message;
    });
}

callbackBtn.addEventListener('click', () => {
  resultDiv.textContent = 'Loading...';
  simulateDelay(5000, () => {
    fetchDataCallback();
  });
});
