import clientPromise from '../utils/mongodb';

interface Transaction {
  walletAddress: string;
  transactionId: string;
  amount: number;
  timestamp: Date;
}

export const saveTransaction = async (transaction: Transaction) => {
  const client = await clientPromise;
  const db = client.db('mydatabase');
  const collection = db.collection('transactions');

  const result = await collection.insertOne(transaction);
  return result;
};

export const getTransactionsByWallet = async (walletAddress: string) => {
  const client = await clientPromise;
  const db = client.db('mydatabase');
  const collection = db.collection('transactions');

  const transactions = await collection.find({ walletAddress }).toArray();
  return transactions;
};
