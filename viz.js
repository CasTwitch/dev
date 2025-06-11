async function fetchVotes() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbx9VVRbCFTNTcLL8KMSr9WHxOQD8eav9onyTbo_ryzSSwBY3coX1-X7tgI0PB3e_H4uFQ/exec'); // Replace with your doGet URL
    const data = await response.json();

    // Example: data might be {votered: 3, voteblue: 5, votegreen: 2, voteyellow: 4}
    updateBars(data);

  } catch (error) {
    console.error('Error fetching votes:', error);
  }
}

function updateBars(voteCounts) {
  // Example: update progress bars or divs by vote counts
  document.getElementById('redBar').style.width = (voteCounts.votered || 0) * 20 + 'px';
  document.getElementById('blueBar').style.width = (voteCounts.voteblue || 0) * 20 + 'px';
  document.getElementById('greenBar').style.width = (voteCounts.votegreen || 0) * 20 + 'px';
  document.getElementById('yellowBar').style.width = (voteCounts.voteyellow || 0) * 20 + 'px';
}

// Call fetchVotes every 5 seconds to update visualization
setInterval(fetchVotes, 5000);
fetchVotes(); // Initial call
