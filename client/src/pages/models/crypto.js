// models/crypto.js
import clientPromise from '../lib/db';

export async function getCryptos(type) {
  const client = await clientPromise;
  const db = client.db();
  const cryptos = await db.collection(type).find({}).toArray();
  return cryptos;
}

export async function saveCryptos(cryptos, type) {
  const client = await clientPromise;
  const db = client.db();
  await db.collection(type).insertMany(cryptos);
}
