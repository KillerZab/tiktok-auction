import express from "express";

const app = express();
app.use(express.json());

let gifts = [];

app.get("/", (req, res) => {
  res.send("TikTok Auction server is running!");
});

app.post("/gift", (req, res) => {
  const { username, coins } = req.body;

  if (!username || !Number.isFinite(coins) || coins <= 0) {
    return res.status(400).json({ error: "Invalid gift data" });
  }

  gifts.push({
    username,
    coins,
    entries: coins,
    time: new Date().toISOString()
  });

  res.json({ success: true });
});

app.get("/gifts", (req, res) => {
  res.json(gifts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
