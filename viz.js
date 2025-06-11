// Function to dynamically load the JSONP script
function fetchVotesJSONP(callbackName) {
  const script = document.createElement('script');
  script.src = 'https://script.google.com/macros/s/AKfycbzv5LQFZ2Dj2x4OMQZr1o20acXoN4DCy8Vez7oxc1A8T0hCGBK5EqHusXWxq7yIgY21Pw/exec?callback=' + callbackName;
  document.body.appendChild(script);
}

// Callback function to handle the vote data returned from JSONP
function handleVotes(data) {
  console.log('Votes:', data);

  // Check for error in data
  if (data.error) {
    console.error('Error fetching votes:', data.error);
    return;
  }

  // Example: update bars or display counts on page
  const votes = data;

  // Assuming you have HTML elements with IDs 'bar-red', 'bar-blue', 'bar-green', 'bar-yellow'
  document.getElementById('bar-red').style.width = (votes.votered || 0) * 10 + 'px';
  document.getElementById('bar-blue').style.width = (votes.voteblue || 0) * 10 + 'px';
  document.getElementById('bar-green').style.width = (votes.votegreen || 0) * 10 + 'px';
  document.getElementById('bar-yellow').style.width = (votes.voteyellow || 0) * 10 + 'px';

  // Display counts if you want
  document.getElementById('count-red').textContent = votes.votered || 0;
  document.getElementById('count-blue').textContent = votes.voteblue || 0;
  document.getElementById('count-green').textContent = votes.votegreen || 0;
  document.getElementById('count-yellow').textContent = votes.voteyellow || 0;
}

// Fetch votes every 10 seconds
function startAutoRefresh() {
  fetchVotesJSONP('handleVotes');
  setInterval(() => {
    fetchVotesJSONP('handleVotes');
  }, 10000);
}

// Start on page load
window.onload = startAutoRefresh;
