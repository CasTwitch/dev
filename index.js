// Your Google Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbzQpEgSHGmkju9skS5m-BFOAzXUkU30312bWtTYtR8q98mOtqOx8OEDULsPt3ygGgPF3A/exec";

// Current vote counts
let countRed = 0, countBlue = 0, countGreen = 0, countYellow = 0;

function updateBars() {
  const total = countRed + countBlue + countGreen + countYellow || 1;
  const percent = (count) => Math.round((count / total) * 100);

  document.getElementById("barRed").style.width = percent(countRed) + "%";
  document.getElementById("labelRed").textContent = `${countRed} (${percent(countRed)}%)`;

  document.getElementById("barBlue").style.width = percent(countBlue) + "%";
  document.getElementById("labelBlue").textContent = `${countBlue} (${percent(countBlue)}%)`;

  document.getElementById("barGreen").style.width = percent(countGreen) + "%";
  document.getElementById("labelGreen").textContent = `${countGreen} (${percent(countGreen)}%)`;

  document.getElementById("barYellow").style.width = percent(countYellow) + "%";
  document.getElementById("labelYellow").textContent = `${countYellow} (${percent(countYellow)}%)`;
}

async function sendVoteToSheet(username, vote) {
  try {
    await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, vote })
    });
  } catch (error) {
    console.error('Error sending vote:', error);
  }
}

async function fetchVotes() {
  try {
    const response = await fetch(scriptURL);
    const data = await response.json();

    countRed = data.votered || 0;
    countBlue = data.voteblue || 0;
    countGreen = data.votegreen || 0;
    countYellow = data.voteyellow || 0;

    updateBars();
  } catch (error) {
    console.error('Error fetching votes:', error);
  }
}

// Listen to Twitch chat commands via ComfyJS
ComfyJS.onCommand = (user, command) => {
  command = command.toLowerCase();

  if (["votered", "voteblue", "votegreen", "voteyellow"].includes(command)) {
    sendVoteToSheet(user, command);
  }
};

// Corrected ComfyJS.Init line with your channels:
ComfyJS.Init("StreamElements", null, ["castheking02", "casthekingofawesomeness"]);

// Update vote counts every 15 seconds
setInterval(fetchVotes, 15000);

// Initial fetch on page load
fetchVotes();
