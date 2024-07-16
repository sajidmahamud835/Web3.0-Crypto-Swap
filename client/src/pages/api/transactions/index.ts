import { NextApiRequest, NextApiResponse } from 'next';
import { saveTransaction, getTransactionsByWallet } from '../../../services/transactionService';

// An example transaction data structure might look like this:
// json
// {
//   "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
//   "transactionId": "tx_1234567890abcdef1234567890abcdef",
//   "amount": 1.234,
//   "timestamp": "2024-07-16T12:34:56Z"
// }
  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const transaction = req.body;
      const result = await saveTransaction(transaction);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save transaction' });
    }
  } else if (req.method === 'GET') {
    try {
      const { walletAddress } = req.query;
      const transactions = await getTransactionsByWallet(walletAddress as string);
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
