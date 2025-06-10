const scriptURL = "https://docs.google.com/spreadsheets/d/1qhlbDr57GYGF1KvEyN5Dz7mJUqi1yICSEEm9ootTaLg/edit?gid=0#gid=0"; // Replace with your real one

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
