const express = require('express');
const router = express.Router();
const {
  createRoom,
  getAllRooms,
  getRoomById
} = require('../controllers/Room');

// POST /api/rooms
router.post('/', createRoom);

// GET /api/rooms
router.get('/', getAllRooms);

// GET /api/rooms/:id
router.get('/:id', getRoomById);

module.exports = router;
