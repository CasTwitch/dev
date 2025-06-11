const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; // Replace with your actual URL

async function fetchVotes() {
  try {
    const res = await fetch(scriptURL);
    const data = await res.json();

    // Calculate max votes for scaling bars
    const maxVotes = Math.max(...Object.values(data), 1);

    ['votered', 'voteblue', 'votegreen', 'voteyellow'].forEach(color => {
      const count = data[color] || 0;
      const widthPercent = (count / maxVotes) * 100;
      const barFill = document.querySelector(`#${color} .bar-fill`);
      barFill.style.width = widthPercent + '%';
      barFill.textContent = count; // show count inside bar
    });
  } catch (error) {
    console.error('Error fetching votes:', error);
  }
}

// Refresh every 10 seconds
fetchVotes();
setInterval(fetchVotes, 10000);
