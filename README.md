# 💸 CashFlow Minimizer

> Settle group expenses with fewer transactions using greedy minimization and min-cost max-flow algorithms.

![License](https://img.shields.io/badge/license-MIT-green)
![Stack](https://img.shields.io/badge/stack-MERN-blue)
![Auth](https://img.shields.io/badge/auth-JWT-orange)

---

## ✨ Features

- 🔐 JWT Authentication
- 👥 Group Management
- 💸 Expense Tracking
- ⚡ Settlement Minimization Engine
- 📤 Export Support
- 🔴 Real-time Updates with WebSockets

---

## ⚙ Algorithms Used

### 1. Greedy Minimizer — `O(n log n)`
Fast heuristic that reduces transfers by matching the largest creditor with the largest debtor.

### 2. Min-Cost Max-Flow
Computes the globally optimal settlement with minimum total transfer cost.

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Infrastructure
- JWT Authentication
- WebSockets
- REST API

---

# 🚀 Quick Start

## 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd Cash-Flow-Minimizer
```

---

## 2️⃣ Configure Backend

Create a `.env` file inside the backend folder.

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

## 3️⃣ Install Dependencies & Run

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on:
`http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:
`http://localhost:5173`

---

# 💡 How It Works

## 📝 Record Expenses
Members log shared expenses within a group.

## ⚖️ Compute Net Balances
The system calculates who owes whom.

## 🔁 Minimize Transfers
Algorithms reduce the number of transactions required.

## ✅ Settle & Export
Export or share settlement results with the group.

---

# 📊 Example Settlement Flow

```text
Alice ── $40 ─▶ Bob ── $25 ─▶ Carol ── $60 ─▶ Dave ── $15 ─▶ Eve
```

---

# 📈 Stats

| Metric | Value |
|---|---|
| Fewer Transfers | ↓ 70% |
| Algorithms | 2 |
| Stack | MERN |
| Authentication | JWT |

---

# 🗺 Roadmap

- [ ] Multi-currency support
- [ ] Receipt uploads
- [ ] Admin roles & permissions
- [ ] PDF & CSV exports

---

# 🤝 Contributing

Pull requests are welcome.

If you'd like to contribute:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a PR

---

# 📄 License

MIT License © CashFlow Minimizer

---