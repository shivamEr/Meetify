const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/api/ice-servers', async (req, res) => {
  const { XIRSYS_USERNAME, XIRSYS_SECRET, XIRSYS_CHANNEL } = process.env;

  try {
    const auth = Buffer.from(`${XIRSYS_USERNAME}:${XIRSYS_SECRET}`).toString('base64');

    const response = await fetch(`https://global.xirsys.net/_turn/${XIRSYS_CHANNEL}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    res.json(data.v.iceServers);

  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch ICE servers' });
  }
});

module.exports = router;
