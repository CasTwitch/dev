let countRed = 0, countBlue = 0, countGreen = 0, countYellow = 0;

// Replace this with your Google Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbzzffTtIQu9whqwxKsZanZqI7qsDVG2jhd4lg0tqjHCk_CCJcGODlU3vzpHm_q2mZw/exec";

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
    const response = await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors', // because Google Apps Script doesn’t send CORS headers
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        vote: vote
      })
    });
    // no-cors means you cannot read response data here, but that’s okay
  } catch (error) {
    console.error('Error sending vote:', error);
  }
}

ComfyJS.onCommand = (user, command) => {
  command = command.toLowerCase();

  switch (command) {
    case "votered":
      countRed++;
      sendVoteToSheet(user, command);
      break;
    case "voteblue":
      countBlue++;
      sendVoteToSheet(user, command);
      break;
    case "votegreen":
      countGreen++;
      sendVoteToSheet(user, command);
      break;
    case "voteyellow":
      countYellow++;
      sendVoteToSheet(user, command);
      break;
    default:
      return; // ignore other commands
  }
  updateBars();
};

ComfyJS.Init("casthekingofawesomeness", null, ["Castheking02", "Djzandr", "casthekingofawesomeness"]);
