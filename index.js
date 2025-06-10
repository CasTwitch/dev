let countRed = 0, countBlue = 0, countGreen = 0, countYellow = 0;

const scriptURL = "https://script.google.com/macros/s/AKfycbwoNK0yVH9A02jaXYg6PwPmfvvN893WRv_QlXxU1utpYS9PzHtF7WXx6KzYoVfomWmDOA/exec";

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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        vote: vote
      })
    });
  } catch (error) {
    console.error('Error sending vote:', error);
  }
}

ComfyJS.onCommand = (user, command) => {
  const cmd = command.toLowerCase();

  switch (cmd) {
    case "votered":
      countRed++;
      sendVoteToSheet(user, "red");
      break;
    case "voteblue":
      countBlue++;
      sendVoteToSheet(user, "blue");
      break;
    case "votegreen":
      countGreen++;
      sendVoteToSheet(user, "green");
      break;
    case "voteyellow":
      countYellow++;
      sendVoteToSheet(user, "yellow");
      break;
    default:
      return;
  }

  updateBars();
};

ComfyJS.Init("casthekingofawesomeness");
