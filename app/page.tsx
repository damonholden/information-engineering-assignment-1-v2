import styles from './page.module.css';
import FeedChart from './FeedChart';

const feed = 'cda46b57-7208-4ad1-84b0-a8d5edb2fa2a';

async function getDataWrapper(endpoint: string) {
  const xApiKey = process.env.BTEX_API_KEY;

  if (!xApiKey) {
    console.log('no API key');
    return 'No API key';
  }

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'x-api-key': xApiKey,
      },
    });
    const data = await res.json();

    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.log(error);
    return 'Error';
  }
}

async function getMetaData({
  feedId,
  version = 1,
}: {
  feedId: string;
  version?: number;
}): Promise<string> {
  return getDataWrapper(
    `https://api-b.iot.bt.com:53054/dataexchange/adept/sensors/feeds/${feedId}/metadata?version=${version}`,
  );
}

async function getLastValuesOfEachStream({
  feedId,
  version = 1,
}: {
  feedId: string;
  version?: number;
}): Promise<string> {
  return getDataWrapper(
    `https://api-b.iot.bt.com:53054/dataexchange/adept/sensors/feeds/${feedId}?version=${version}`,
  );
}

async function getLastValueOfStream({
  feedId,
  dataStreamId,
  version = 1,
}: {
  feedId: string;
  dataStreamId: number;
  version?: number;
}): Promise<string> {
  return getDataWrapper(
    `https://api-b.iot.bt.com:53054/dataexchange/adept/sensors/feeds/${feedId}/datastream/${dataStreamId}?version=${version}`,
  );
}

async function getDataPointsOfStream({
  feedId,
  dataStreamId,
  version = 1,
  start,
  end,
  limit = 100,
}: {
  feedId: string;
  dataStreamId: number;
  start?: string;
  end?: string;
  version?: number;
  limit?: number;
}): Promise<string> {
  return getDataWrapper(
    `https://api-b.iot.bt.com:53054/dataexchange/adept/sensors/feeds/${feedId}/datastream/${dataStreamId}/datapoints${
      start ? `?start=${start}&` : ''
    }${end ? `?end=${end}&` : ''}?limit=${limit}&?version=${version}`,
  );
}

export default async function Home() {
  const metaData = await getMetaData({ feedId: feed });
  const feedData = await getLastValuesOfEachStream({ feedId: feed });
  const streamData = await getLastValueOfStream({
    feedId: feed,
    dataStreamId: 1,
  });
  const dataPoints = await getDataPointsOfStream({
    feedId: feed,
    dataStreamId: 1,
  });

  return (
    <main className={styles.main}>
      <h1>Information Engineering: Assignment 1</h1>
      <FeedChart />
      <h2>Meta Data</h2>
      <code>
        <pre>{metaData}</pre>
      </code>
      <h2>Feed Data</h2>
      <code>
        <pre>{feedData}</pre>
      </code>
      <h2>Stream Data</h2>
      <code>
        <pre>{streamData}</pre>
      </code>
      <h2>Point Data</h2>
      <code>
        <pre>{dataPoints}</pre>
      </code>
    </main>
  );
}
