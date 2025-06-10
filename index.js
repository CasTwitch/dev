const scriptURL = "https://script.google.com/macros/s/AKfycbzQpEgSHGmkju9skS5m-BFOAzXUkU30312bWtTYtR8q98mOtqOx8OEDULsPt3ygGgPF3A/exec"; // Replace with your real one

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
