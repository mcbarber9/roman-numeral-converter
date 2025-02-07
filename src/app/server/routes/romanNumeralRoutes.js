import express from 'express';
import { convertToRomanNumeral } from '../romanNumeralConverter.js';

const router = express.Router();

router.get('/', (req, res) => {
  const query = req?.query?.query;

  if (!query || Number.isNaN(Number(query)) || query < 1 || query > 3999) {
    return res.status(400).json({ error: 'Please provide a number between 1 and 3999.' });
  }

  try {
    const input = query;
    const output = convertToRomanNumeral(parseInt(query, 10));
    res.json({ input, output });
  } catch (e) {
    console.error('Error during conversion:', e);
    return res.status(500).json({ error: 'Internal Server Error. Something went wrong during the conversion.' });
  }
});

export default router;
