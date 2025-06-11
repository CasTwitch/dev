async function fetchVotes() {
  try {
    const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhM7953Iy_jZU5i2DP7nzeBw_K-zmvLg7VtoYWE80m6YfmKUN2NIMRm86ocPtRk9Veh5vN9aik8bbQY41petpIYaQIieF9xX4IDCyrsCyLNeicnK_9agz5sxt2njnfdDZg7k75aX10LkGJGzX_Ee69_g2dTmE7mnu5zhjJeL7tsKfis42gR8O5HKS5RQv9dEr3Xb_pWTMBQuW_CjQ9mmPk_GraJJhcPpKKAIaGlFBi75Sm2rX_oHklf0VRRnnSuCKOL8RCZEX3uJz0QAjuUKjKqVfs591oi9RfeJpI5&lib=MeaYsQTwvRmx50QmXqr06QZq1e8rbxTfw'); // Replace with your doGet URL
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
