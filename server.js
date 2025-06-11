const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/votes", async (req, res) => {
  try {
    const sheetURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";
    const response = await fetch(sheetURL);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
