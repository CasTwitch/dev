let countRed = 0;
let countBlue = 0;
let countGreen = 0;
let countYellow = 0;

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

ComfyJS.onCommand = (user, command) => {
  switch (command.toLowerCase()) {
    case "votered":
      countRed++;
      break;
    case "voteblue":
      countBlue++;
      break;
    case "votegreen":
      countGreen++;
      break;
    case "voteyellow":
      countYellow++;
      break;
    default:
      return;
  }
  updateBars();
};

ComfyJS.Init("casthekingofawesomeness", null, ["Castheking02", "Djzandr", "casthekingofawesomeness"]);
