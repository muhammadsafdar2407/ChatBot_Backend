const pool = require("../db");

const addChatMessage = async (req, res) => {
  const { business_id, sender, message } = req.body;
  const user_id = req.user.id;

  if (!business_id || !sender || !message) {
    return res.status(400).json({ error: "Missing fields in request" });
  }

  try {
    await pool.query(
      `INSERT INTO chat_history (user_id, business_id, sender, message) 
       VALUES ($1, $2, $3, $4)`,
      [user_id, business_id, sender, message]
    );
    res.status(201).json({ message: "Message saved successfully" });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addChatMessage
};
