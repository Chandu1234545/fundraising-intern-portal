const content = document.getElementById("content");
const showDashboardBtn = document.getElementById("show-dashboard");
const showLeaderboardBtn = document.getElementById("show-leaderboard");

let internData = null;
let leaderboardData = [];

async function fetchData() {
  try {
    const internRes = await fetch("http://localhost:4000/api/intern");
    internData = await internRes.json();
    const lbRes = await fetch("http://localhost:4000/api/leaderboard");
    leaderboardData = await lbRes.json();
  } catch (e) {
    content.innerHTML = `<p style="color:red;">Error fetching backend data. Is backend running on port 4000?</p>`;
    console.error(e);
  }
}

function renderDashboard() {
  if (!internData) {
    content.innerHTML = "<p>Loading...</p>";
    return;
  }
  content.innerHTML = `
    <section class="card">
      <h2>Welcome, ${internData.name}</h2>
      <p><strong>Referral Code:</strong> ${internData.referralCode}</p>
      <p><strong>Total Donations Raised:</strong> ₹${internData.totalDonations}</p>
    </section>

    <section class="card">
      <h3>Rewards / Unlockables</h3>
      <div class="rewards">
        ${internData.rewards
          .map(
            (r) => `
          <div class="reward ${r.unlocked ? "unlocked" : ""}">
            <p>${r.title}</p>
            <p>Status: ${r.unlocked ? "Unlocked" : "Locked"}</p>
          </div>
        `
          )
          .join("")}
      </div>
    </section>

    <section class="card">
      <h3>Dummy Login / Signup</h3>
      <div class="login-signup">
        <div class="box">
          <h4>Login</h4>
          <input placeholder="Email" />
          <input placeholder="Password" type="password" />
          <button class="primary">Login (dummy)</button>
        </div>
        <div class="box">
          <h4>Signup</h4>
          <input placeholder="Name" />
          <input placeholder="Email" />
          <button class="primary">Signup (dummy)</button>
        </div>
      </div>
    </section>
  `;
}

function renderLeaderboard() {
  if (!leaderboardData.length) {
    content.innerHTML = "<p>Loading...</p>";
    return;
  }
  content.innerHTML = `
    <section class="card">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th><th>Name</th><th>Donations</th><th>Referral Code</th>
          </tr>
        </thead>
        <tbody>
          ${leaderboardData
            .map((p, i) => {
              const highlight = internData && p.name === internData.name ? "highlight" : "";
              return `
              <tr class="${highlight}">
                <td>${i + 1}</td>
                <td>${p.name}</td>
                <td>₹${p.donations}</td>
                <td>${p.referralCode}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}

showDashboardBtn.addEventListener("click", () => {
  renderDashboard();
});
showLeaderboardBtn.addEventListener("click", () => {
  renderLeaderboard();
});

(async () => {
  await fetchData();
  renderDashboard();
})();
