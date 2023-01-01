import styles from './page.module.css';
import { NextRequest } from 'next/server';

async function getData() {
  const res = await fetch(
    'https://api-b.iot.bt.com:53054/dataexchange/adept/sensors/feeds/cda46b57-7208-4ad1-84b0-a8d5edb2fa2a/metadata?version=1',
    {
      method: 'GET',
      headers: {
        'x-api-key': process.env.BTEX_API_KEY,
      },
    },
  );
  const data = await res.json();
  return JSON.stringify(data, null, 4);
}

export default async function Home() {
  const stuff = await getData();
  return (
    <main className={styles.main}>
      <h1>Information Engineering: Assignment 1</h1>
      <code>
        <pre>{stuff}</pre>
      </code>
    </main>
  );
}
