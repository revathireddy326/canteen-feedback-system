const Request = require('../models/Request');

// Submit a travel request
exports.submitRequest = async (req, res) => {
  const { email, toLocation, date, time } = req.body;
  try {
    console.log("Received Request:", { email, toLocation, date, time });

    const newRequest = new Request({ email, toLocation, date, time, status: "Pending" });
    await newRequest.save();

    console.log("Saved to DB");

    res.status(201).json(newRequest);
  } catch (err) {
    console.error("Error saving request:", err);
    res.status(500).json({ error: "Failed to submit request" });
  }
};

// Get latest request of a user
exports.getLatestRequest = async (req, res) => {
  const email = req.query.email;  // <-- fix here: get from query param
  if (!email) return res.status(400).json({ error: "Email is required" });

  console.log("Fetching latest request for email:", email);

  try {
    const request = await Request.findOne({ email }).sort({ createdAt: -1 });
    if (!request) return res.status(404).json({ error: "No request found" });
    res.json(request);
  } catch (err) {
    console.error("Error fetching latest request:", err);
    res.status(500).json({ error: "Failed to fetch latest request" });
  }
};

// Check for matches
exports.checkMatchStatus = async (req, res) => {
  const { email, toLocation, date } = req.body; // Expecting POST body

  if (!email || !toLocation || !date) {
    return res.status(400).json({ error: "Email, toLocation and date are required" });
  }

  try {
    const userRequest = await Request.findOne({ email, toLocation, date, status: "Pending" });
    if (!userRequest) return res.json({ status: "Pending" });

    const match = await Request.findOne({
      toLocation: userRequest.toLocation,
      date: userRequest.date,
      email: { $ne: email }, // Exclude self
      status: "Pending"
    });

    if (match) {
      await Request.updateMany(
        { _id: { $in: [userRequest._id, match._id] } },
        { status: "Matched" }
      );
      res.json({ status: "Matched", matchedEmail: match.email });
    } else {
      res.json({ status: "Pending" });
    }
  } catch (err) {
    console.error("Error checking match status:", err);
    res.status(500).json({ error: "Error checking match status" });
  }
};
