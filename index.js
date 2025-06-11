let countRed = 0, countBlue = 0, countGreen = 0, countYellow = 0;

// Your Google Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbzQpEgSHGmkju9skS5m-BFOAzXUkU30312bWtTYtR8q98mOtqOx8OEDULsPt3ygGgPF3A/exec";

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
      mode: 'no-cors',  // Google Apps Script doesn’t send CORS headers
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, vote: vote })
    });
  } catch (error) {
    console.error('Error sending vote:', error);
  }
}

ComfyJS.onCommand = (user, command) => {
  command = command.toLowerCase();

  if (["votered", "voteblue", "votegreen", "voteyellow"].includes(command)) {
    // Increment local counts for visual bars
    if (command === "votered") countRed++;
    else if (command === "voteblue") countBlue++;
    else if (command === "votegreen") countGreen++;
    else if (command === "voteyellow") countYellow++;

    sendVoteToSheet(user, command);
    updateBars();
  }
};

// Initialize your bot for the first channel:
ComfyJS.Init("casthekingofawesomeness");

// Join the other channels you want to listen to:
ComfyJS.Join("castheking02");
ComfyJS.Join("anotherchannel"); // Add more channels as needed
