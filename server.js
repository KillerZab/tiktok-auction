import express from "express";

const app = express();
app.use(express.json());

// Разрешаваме връзка с CodePen
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

let gifts = [];

app.get("/", (req, res) => {
  res.send("TikTok Auction server is running!");
});

app.post("/gift", (req, res) => {
  const { username, coins, image } = req.body;

  if (
    typeof username !== "string" ||
    !username.trim() ||
    !Number.isFinite(coins) ||
    coins <= 0
  ) {
    return res.status(400).json({ error: "Invalid gift data" });
  }

  const gift = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    username: username.trim(),
    coins,
    image: typeof image === "string" ? image : "",
    time: new Date().toISOString()
  };

  gifts.push(gift);

  res.json({ success: true, gift });
});

app.get("/gifts", (req, res) => {
  res.json(gifts);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
