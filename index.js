const scriptURL = "https://script.google.com/macros/s/AKfycbydSEXS66HX-PZkmT4rtRdI3_jo0YMcCxOCwiG45SUi4S3jm7Ot2elKCeekxEFeUYRUmA/exec"; // Replace with your real one

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
  command = command.toLowerCase();

  if (["votered", "voteblue", "votegreen", "voteyellow"].includes(command)) {
    sendVoteToSheet(user, command);
  }
};

ComfyJS.Init("Casthekingofawesomeness");
