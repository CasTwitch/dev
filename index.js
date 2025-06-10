let countRed = 0, countBlue = 0, countGreen = 0, countYellow = 0;

// Setup pie chart
const ctx = document.getElementById("votePieChart").getContext("2d");
const pieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [
      "🇨🇦/🇺🇸 CAN/U.S.",
      "🇦🇺/🇳🇿 AUS/NZ",
      "🇬🇧 U.K.",
      "🇪🇺 Euro"
    ],
    datasets: [{
      data: [0, 0, 0, 0],
      backgroundColor: [
        "linear-gradient(to right, #ff4e50, #f9d423)", // red range
        "linear-gradient(to right, #2193b0, #6dd5ed)", // blue range
        "linear-gradient(to right, #56ab2f, #a8e063)", // green range
        "linear-gradient(to right, #f7971e, #ffd200)"  // yellow range
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "black",
          font: { size: 14 }
        }
      },
      datalabels: {
        color: 'white',
        formatter: (value, ctx) => {
          let sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          if (sum === 0) return "";
          let percentage = (value * 100 / sum).toFixed(1) + "%";
          return percentage;
        },
        textShadowColor: '#000',
        textShadowBlur: 4,
        font: {
          weight: 'bold',
          size: 16
        }
      }
    }
  },
  plugins: [ChartDataLabels]
});

// Update bars and pie chart
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

  pieChart.data.datasets[0].data = [countRed, countBlue, countGreen, countYellow];
  pieChart.update();

  sendVoteData(); // Send updated values to Google Sheets
}

// Send vote counts to Google Apps Script
function sendVoteData() {
  fetch("https://script.google.com/macros/s/AKfycbzzffTtIQu9whqwxKsZanZqI7qsDVG2jhd4lg0tqjHCk_CCJcGODlU3vzpHm_q2mZw/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      red: countRed,
      blue: countBlue,
      green: countGreen,
      yellow: countYellow
    })
  });
}

// Twitch command handling
ComfyJS.onCommand = (user, command) => {
  switch(command.toLowerCase()) {
    case "votered": countRed++; break;
    case "voteblue": countBlue++; break;
    case "votegreen": countGreen++; break;
    case "voteyellow": countYellow++; break;
    default: return;
  }
  updateBars();
};

// Initialise ComfyJS
ComfyJS.Init("casthekingofawesomeness", null, ["Castheking02", "Djzandr", "casthekingofawesomeness"]);
