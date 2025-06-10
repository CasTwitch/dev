let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;

function updateBars() {
  const total = count1 + count2 + count3 + count4 || 1; // prevent divide by 0

  document.getElementById("bar1").style.width = (count1 / total) * 100 + "%";
  document.getElementById("label1").textContent = `Test1: ${count1}`;

  document.getElementById("bar2").style.width = (count2 / total) * 100 + "%";
  document.getElementById("label2").textContent = `Test2: ${count2}`;

  document.getElementById("bar3").style.width = (count3 / total) * 100 + "%";
  document.getElementById("label3").textContent = `Test3: ${count3}`;

  document.getElementById("bar4").style.width = (count4 / total) * 100 + "%";
  document.getElementById("label4").textContent = `Test4: ${count4}`;
}

ComfyJS.onCommand = (user, command) => {
  switch (command) {
    case "test1":
      count1++;
      break;
    case "test2":
      count2++;
      break;
    case "test3":
      count3++;
      break;
    case "test4":
      count4++;
      break;
    default:
      return;
  }
  updateBars();
};

ComfyJS.Init("casthekingofawesomeness", null, ["Castheking02", "Djzandr", "casthekingofawesomeness"]);

