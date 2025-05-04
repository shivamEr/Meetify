const Room = require('../models/Room');

// Create Room
exports.createRoom = async (req, res) => {
  try {
    const { name, topic, language, privacy, password, capacity, createdBy } = req.body;

    const room = await Room.create({
      name,
      topic,
      language,
      privacy,
      password,
      capacity,
      createdBy
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating room' });
  }
};

// Get All Rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms' });
  }
};

// Get Single Room
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching room' });
  }
};
