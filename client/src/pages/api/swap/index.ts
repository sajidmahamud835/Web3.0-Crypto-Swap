import { NextApiRequest, NextApiResponse } from 'next';
import { createSwap } from '../../../services/mexcService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = await createSwap(req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create swap' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
