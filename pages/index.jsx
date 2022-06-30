import Head from "next/head";
import React from "react";
import { apiUrl } from "../utils/api-url";

export default function Home() {
  const [items, setItems] = React.useState([]);
  async function getItems() {
    const res = await fetch(`${apiUrl}/items`);
    const data = await res.json();
    setItems(data.items);
  }
  React.useEffect(() => {
    getItems();
  }, []);

  async function addItem() {
    const item = {
      title: `Item ${items.length + 1}`,
      body: "Description",
    };
    const res = await fetch(`${apiUrl}/add-item`, {
      method: "POST",
      body: item,
    });
    if (res.ok) {
      setItems([...items, item]);
    }
  }

  return (
    <div>
      <Head>
        <title>MSW Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Items</h1>
        {items.map((item, i) => (
          <div key={i}>
            <h2 data-testid={`title${i + 1}`}>{item.title}</h2>
            <p>{item.body}</p>
          </div>
        ))}
        <button data-testid="addButton" onClick={() => addItem()}>
          Add Item
        </button>
      </main>
    </div>
  );
}
