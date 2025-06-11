let countRed = 0, countBlue = 0, countGreen = 0, countYellow = 0;

// Your Google Apps Script Web App URL
const scriptURL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLi-DMMshYO44pUKGzdauiuhJi4cz0kg4S0LrMXivmNbWFbXK6KxwcqOz6sXrtPLR7yv8Xz6ekhJF4s6WoDNjVPIF2fBZ5vPbLVm8T60NrOZgh-X4KcwVUC05oIz2aKGDoJead8INEfx0_g3mtplhyVa0UwXkHvgcwyUrb8G41qYfrd23rb3-snBv5qoMrEsrR5qs3FL6239PTNxk4MJJSyjjgGuM8AUyCB2tYfnH5sVFUabrWVuJqHOapZOM6YajXWRnRn9aAZdsaRFaSAQ3v3lm1jeZT4XhrkB7mRP&lib=MeaYsQTwvRmx50QmXqr06QZq1e8rbxTfw";

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
ComfyJS.Init("StreamElements", null, ["castheking02", "casthekingofawesomeness"]);

