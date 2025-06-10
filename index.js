let countRed = 0, countBlue = 0, countGreen = 0, countYellow = 0;

const scriptURL = "https://script.google.com/macros/s/AKfycbzzffTtIQu9whqwxKsZanZqI7qsDVG2jhd4lg0tqjHCk_CCJcGODlU3vzpHm_q2mZw/exec";

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
        "linear-gradient(to right, #ff4e50, #f9d423)",  // red gradient - will set differently later
        "linear-gradient(to right, #2193b0, #6dd5ed)",  // blue gradient
        "linear-gradient(to right, #56ab2f, #a8e063)",  // green gradient
        "linear-gradient(to right, #f7971e, #ffd200)"   // yellow gradient
      ],
      // Since gradients don't work in ChartJS backgroundColor directly, we will keep solid colors here
      backgroundColor: ["red", "blue", "green", "gold"],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "black", font: { size: 14 } }
      },
      datalabels: {
        color: 'white',
        font: { weight: 'bold', size: 16 },
        formatter: (value, ctx) => {
          let sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          if (sum === 0) return "";
          return (value * 100 / sum).toFixed(1) + "%";
        },
        textShadowColor: "rgba(0, 0, 0, 0.7)",
        textShadowBlur: 3,
        textShadowOffsetX: 1,
        textShadowOffsetY: 1,
      }
    }
  },
  plugins: [ChartDataLabels]
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

  pieChart.data.datasets[0].data = [countRed, countBlue, countGreen, countYellow];
  pieChart.update();
}

async function sendVoteToSheet(user, command) {
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, vote: command })
    });
    // no-cors means no response access, so no error catch here
  } catch (err) {
    console.error("Failed to send vote to Google Sheets:", err);
  }
}

ComfyJS.onCommand = (user, command) => {
  command = command.toLowerCase();
  let valid = true;
  switch(command) {
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
      valid = false;
      break;
  }
  if(valid) {
    updateBars();
    sendVoteToSheet(user, command);
  }
};

ComfyJS.Init("casthekingofawesomeness", null, ["Castheking02", "Djzandr", "casthekingofawesomeness"]);
