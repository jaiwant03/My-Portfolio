const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.status(201).json({
      message: "Message saved successfully",
    });
  } catch (error) {
    console.error("Contact save error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
