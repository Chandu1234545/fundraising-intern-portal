// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Dummy intern data
const intern = {
  name: "Manne Chandana",
  referralCode: "mannechandana012025",
  totalDonations: 1250, // arbitrary number
  rewards: [
    { title: "Bronze Badge", unlocked: true },
    { title: "Silver Badge", unlocked: false },
    { title: "Early Access", unlocked: true },
  ],
};

// Dummy leaderboard
const leaderboard = [
  { name: "Alice", donations: 5000, referralCode: "alice2025" },
  { name: "Bob", donations: 3200, referralCode: "bob2025" },
  { name: "Manne Chandana", donations: 1250, referralCode: "mannechandana012025" },
  { name: "Eve", donations: 900, referralCode: "eve2025" },
];

app.get("/api/intern", (req, res) => {
  res.json(intern);
});

app.get("/api/leaderboard", (req, res) => {
  // sorted descending
  const sorted = [...leaderboard].sort((a, b) => b.donations - a.donations);
  res.json(sorted);
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
