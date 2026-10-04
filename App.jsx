import { useEffect, useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const loadExpenses = async () => {
    const response = await fetch("http://localhost:8080/expenses");
    const data = await response.json();
    setExpenses(data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const addExpense = async () => {
    await fetch("http://localhost:8080/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        amount: Number(amount),
        note: "Added from React"
      })
    });

    setName("");
    setAmount("");
    loadExpenses();
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Expense Tracker</h1>

      <input
        placeholder="Expense name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={addExpense}>Add Expense</button>

      <h2>Expenses</h2>

      {expenses.map((expense) => (
        <div key={expense.id}>
          {expense.name} - ₹{expense.amount}
        </div>
      ))}
    </div>
  );
}

export default App;