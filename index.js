// Vote counters
let countRed = 0, countBlue = 0, countGreen = 0, countYellow = 0;

// Initialise pie chart
const ctx = document.getElementById("votePieChart").getContext("2d");
const pieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["CAN/U.S.", "AUS/NZ", "U.K.", "Euro"],
    datasets: [{
      data: [0, 0, 0, 0],
      backgroundColor: ["red", "blue", "green", "yellow"]
    }]
  },
  options: {
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});

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

  // Update pie chart data
  pieChart.data.datasets[0].data = [countRed, countBlue, countGreen, countYellow];
  pieChart.update();
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
