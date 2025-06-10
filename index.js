let countRed = 0;
let countBlue = 0;
let countGreen = 0;
let countYellow = 0;

function updateBars() {
  const total = countRed + countBlue + countGreen + countYellow || 1;

  document.getElementById("barRed").style.width = (countRed / total) * 100 + "%";
  document.getElementById("labelRed").textContent = `🔴 Red: ${countRed}`;

  document.getElementById("barBlue").style.width = (countBlue / total) * 100 + "%";
  document.getElementById("labelBlue").textContent = `🔵 Blue: ${countBlue}`;

  document.getElementById("barGreen").style.width = (countGreen / total) * 100 + "%";
  document.getElementById("labelGreen").textContent = `🟢 Green: ${countGreen}`;

  document.getElementById("barYellow").style.width = (countYellow / total) * 100 + "%";
  document.getElementById("labelYellow").textContent = `🟡 Yellow: ${countYellow}`;
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
