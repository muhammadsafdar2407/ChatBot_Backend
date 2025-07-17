const express = require("express");
const router = express.Router();

const { addChatMessage } = require("../Controller/ChatHistory");
const authenticate = require("../Middleware/authenticator");

router.post("/add", authenticate, addChatMessage);

module.exports = router;
