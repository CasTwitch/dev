const scriptURL = https://script.google.com/macros/s/AKfycbxpZ46goJBTL4yEEgSVOx-7Jq6m6DLQClmzEZi_P9bHXCXGBGA-j08Y9TTTzvVbp7y-_g/exec; // Replace with your deployed Google Apps Script Web App URL

async function sendVoteToSheet(username, vote) {
  try {
    await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors', // necessary for GAS
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, vote })
    });
  } catch (error) {
    console.error("Error sending vote:", error);
  }
}

ComfyJS.onCommand = (user, command) => {
  command = command.toLowerCase();

  if (["votered", "voteblue", "votegreen", "voteyellow"].includes(command)) {
    sendVoteToSheet(user, command);
  }
};

ComfyJS.Init("casthekingofawesomeness");
