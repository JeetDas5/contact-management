import express from "express";
import Contact from "../models/Contact.ts";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching contacts", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = new Contact({ name, email, phone, message });
    const savedContact = await contact.save();

    res.status(201).json(savedContact);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ message: "Validation error", errors });
    }
    res
      .status(500)
      .json({ message: "Error creating contact", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      message: "Contact deleted successfully",
      contact: deletedContact,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error deleting contact", error: error.message });
  }
});

export default router;
