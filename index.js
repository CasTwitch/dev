let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;

ComfyJS.onCommand = (user, command, message, extra) => {
  switch (command) {
    case "test1":
      count1++;
      document.getElementById("count1").innerHTML = count1;
      console.log("!test1 typed by", user);
      break;
    case "test2":
      count2++;
      document.getElementById("count2").innerHTML = count2;
      console.log("!test2 typed by", user);
      break;
    case "test3":
      count3++;
      document.getElementById("count3").innerHTML = count3;
      console.log("!test3 typed by", user);
      break;
    case "test4":
      count4++;
      document.getElementById("count4").innerHTML = count4;
      console.log("!test4 typed by", user);
      break;
  }
};

ComfyJS.Init("casthekingofawesomeness", null, ["Castheking02", "Djzandr", "casthekingofawesomeness"]);
