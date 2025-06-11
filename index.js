const scriptURL = "https://script.google.com/macros/s/AKfycbwYtWBxiyTSdkIfB7fAQa8hvFDTsPQbuazIrxSlTDwWH0oalfKvWPAo8klGpLnaEMC_bg/exec"; // Replace with your Web App URL

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
  const voteCommand = command.toLowerCase();

  if (["votered", "voteblue", "votegreen", "voteyellow"].includes(voteCommand)) {
    sendVoteToSheet(user, voteCommand);
  }
};

ComfyJS.Init("casthekingofawesomeness", null, ["castheking02"]);
