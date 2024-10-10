import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, [transactions]);

  const getTransactions = async () => {
    const url = import.meta.env.VITE_API_URL + "/transactions";
    const response = await fetch(url);
    return await response.json();
  };

  const addnewTransaction = (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL + "/transaction";

    const price = name.split(" ")[0];

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.substring(price.length + 1),
        price,
        description,
        dateTime,
      }),
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setName("");
        setDateTime("");
        setDescription("");
      });
    });
  };

  let balance = 0;

  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  
  // const fraction = balance.split(".")[1]

  return (
    <main className="pt-8">
      <h1 className="text-4xl">
        ${balance}<span className="text-xl">.00</span>
      </h1>

      <form onSubmit={addnewTransaction} class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6" className="basics">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane"
            />
            <p class="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Date and Time
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6" className="description">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Description
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
            />
          </div>
        </div>
        <button
          type="submit"
          class="bg-gray-500 hover:bg-amber-100 hover:text-black text-white font-bold py-2 px-4 rounded-md w-full h-12"
        >
          Add new transaction
        </button>
      </form>
      <h1>{transactions.length}</h1>

      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <div className="transaction">
              <div className="left">
                <div className="name text-xl">{transaction.name}</div>
                <div className="description text-base">
                  {transaction.description}
                </div>
              </div>
              <div className="right">
                <div
                  className={
                    "price" + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  ${transaction.price}
                </div>
                <div className="datetime">{transaction.dateTime}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
