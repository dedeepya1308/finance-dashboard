import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#4e73df", "#1cc88a", "#e74a3b", "#f6c23e"];

export default function App() {
  const sampleData = [
    { id: 1, date: "2026-03-01", amount: 5000, category: "Salary", type: "income" },
    { id: 2, date: "2026-03-03", amount: 800, category: "Food", type: "expense" },
    { id: 3, date: "2026-03-05", amount: 1200, category: "Shopping", type: "expense" }
  ];

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : sampleData;
  });

  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense"
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addOrUpdateTransaction = () => {
    if (!form.date || !form.amount || !form.category) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      setTransactions(transactions.map(t =>
        t.id === editId ? { ...form, id: editId, amount: Number(form.amount) } : t
      ));
      setEditId(null);
    } else {
      const newTx = {
        id: Date.now(),
        ...form,
        amount: Number(form.amount)
      };
      setTransactions([...transactions, newTx]);
    }

    setForm({ date: "", amount: "", category: "", type: "expense" });
    setShowForm(false);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const editTransaction = (t) => {
    setForm(t);
    setEditId(t.id);
    setShowForm(true);
  };

  const filtered = useMemo(() => {
    return transactions.filter(t =>
      (filterType === "all" || t.type === filterType) &&
      t.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [transactions, search, filterType]);

  const income = transactions.filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions.filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expenses;

  const categoryData = Object.values(
    transactions
      .filter(t => t.type === "expense")
      .reduce((acc, curr) => {
        acc[curr.category] = acc[curr.category] || { name: curr.category, value: 0 };
        acc[curr.category].value += curr.amount;
        return acc;
      }, {})
  );

  const monthlyData = useMemo(() => {
    const map = {};
    transactions.forEach(t => {
      const m = t.date.slice(0, 7);
      if (!map[m]) map[m] = { month: m, income: 0, expense: 0 };
      map[m][t.type] += t.amount;
    });
    return Object.values(map);
  }, [transactions]);

  return (
    <div className={darkMode ? "container dark" : "container"}>
      
      {/* Header */}
      <div className="header">
        <h2>Finance Dashboard</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="summary">
        <div className="card">Balance: ₹{balance}</div>
        <div className="card">Income: ₹{income}</div>
        <div className="card">Expenses: ₹{expenses}</div>
      </div>

      {/* Charts */}
      <div className="charts">
        <div className="chart-box">
          <ResponsiveContainer>
            <LineChart data={transactions}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#4e73df" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={categoryData} dataKey="value">
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      
      {/* Admin Actions */}
      {role === "admin" && (
        <>
          {!showForm ? (
            <button onClick={() => setShowForm(true)}>Add Transaction</button>
          ) : (
            <div className="form-box">
              <input type="date" name="date" value={form.date} onChange={handleChange} />
              <input type="number" name="amount" value={form.amount} onChange={handleChange} />
              <input type="text" name="category" value={form.category} onChange={handleChange} />
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <button onClick={addOrUpdateTransaction}>
                {editId ? "Update" : "Save"}
              </button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          )}
        </>
      )}

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filtered.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>
  <span className={t.type === "income" ? "income" : "expense"}>
    {t.type === "income" ? "+" : "-"}₹{t.amount}
  </span>
</td>
              <td>{t.category}</td>
              <td>{t.type}</td>

              {role === "admin" && (
                <td>
                  <button onClick={() => editTransaction(t)}>Edit</button>
                  <button onClick={() => deleteTransaction(t.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Insights */}
      <div className="insights">
        <h3>Insights</h3>
        <p>
          Highest Spending: {[...categoryData].sort((a,b)=>b.value-a.value)[0]?.name || "N/A"}
        </p>

        <h4>Monthly</h4>
        {monthlyData.map(m => (
          <p key={m.month}>
            {m.month} → ₹{m.income} / ₹{m.expense}
          </p>
        ))}
      </div>

    </div>
  );
}