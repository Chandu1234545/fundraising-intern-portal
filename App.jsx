// frontend/intern-portal/src/App.jsx
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [intern, setIntern] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [view, setView] = useState("dashboard"); // dashboard | leaderboard

  useEffect(() => {
    fetch("http://localhost:4000/api/intern")
      .then((r) => r.json())
      .then(setIntern);
    fetch("http://localhost:4000/api/leaderboard")
      .then((r) => r.json())
      .then(setLeaderboard);
  }, []);

  if (!intern) return <div>Loading...</div>;

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Fundraising Intern Portal</h1>
        <div>
          <button onClick={() => setView("dashboard")} style={{ marginRight: 8 }}>
            Dashboard
          </button>
          <button onClick={() => setView("leaderboard")}>Leaderboard</button>
        </div>
      </header>

      {view === "dashboard" && (
        <div>
          <section style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <h2>Welcome, {intern.name}</h2>
            <p>
              <strong>Referral Code:</strong> {intern.referralCode}
            </p>
            <p>
              <strong>Total Donations Raised:</strong> ₹{intern.totalDonations}
            </p>
          </section>

          <section style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <h3>Rewards / Unlockables</h3>
            <div style={{ display: "flex", gap: 12 }}>
              {intern.rewards.map((r) => (
                <div
                  key={r.title}
                  style={{
                    flex: 1,
                    padding: 12,
                    border: "1px solid",
                    borderColor: r.unlocked ? "#4caf50" : "#ccc",
                    borderRadius: 6,
                    background: r.unlocked ? "#e8f5e9" : "#f9f9f9",
                  }}
                >
                  <p>{r.title}</p>
                  <p>Status: {r.unlocked ? "Unlocked" : "Locked"}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginTop: 24 }}>
            <h3>Dummy Login / Signup</h3>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ flex: 1, border: "1px solid #ccc", padding: 12, borderRadius: 6 }}>
                <h4>Login</h4>
                <input placeholder="Email" style={{ display: "block", width: "100%", marginBottom: 8 }} />
                <input placeholder="Password" type="password" style={{ display: "block", width: "100%", marginBottom: 8 }} />
                <button>Login (dummy)</button>
              </div>
              <div style={{ flex: 1, border: "1px solid #ccc", padding: 12, borderRadius: 6 }}>
                <h4>Signup</h4>
                <input placeholder="Name" style={{ display: "block", width: "100%", marginBottom: 8 }} />
                <input placeholder="Email" style={{ display: "block", width: "100%", marginBottom: 8 }} />
                <button>Signup (dummy)</button>
              </div>
            </div>
          </section>
        </div>
      )}

      {view === "leaderboard" && (
        <div style={{ marginTop: 16 }}>
          <h2>Leaderboard</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #aaa", padding: 8, textAlign: "left" }}>Rank</th>
                <th style={{ borderBottom: "1px solid #aaa", padding: 8, textAlign: "left" }}>Name</th>
                <th style={{ borderBottom: "1px solid #aaa", padding: 8, textAlign: "left" }}>Donations</th>
                <th style={{ borderBottom: "1px solid #aaa", padding: 8, textAlign: "left" }}>Referral Code</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((p, i) => (
                <tr key={p.name} style={{ background: p.name === intern.name ? "#fffde7" : "white" }}>
                  <td style={{ padding: 8 }}>{i + 1}</td>
                  <td style={{ padding: 8 }}>{p.name}</td>
                  <td style={{ padding: 8 }}>₹{p.donations}</td>
                  <td style={{ padding: 8 }}>{p.referralCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer style={{ marginTop: 40, fontSize: 12, color: "#555" }}>
        <p>Prototype — submit GitHub repo or live deployment. No real auth or payments included.</p>
      </footer>
    </div>
  );
}

export default App;
