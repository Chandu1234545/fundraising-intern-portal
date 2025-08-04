# Fundraising Intern Portal – Round 1 Prototype

## Overview
Simple full-stack intern dashboard with:
- Dummy login/signup UI
- Dashboard showing intern name, referral code, total donations
- Rewards section
- Leaderboard (static/dummy)
- Backend REST API serving dummy data

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js + Express
- Data: Static objects (no database)

## API Endpoints
- `GET /api/intern` — returns intern info (name, referral code, donations, rewards)
- `GET /api/leaderboard` — returns sorted dummy leaderboard

## Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev
