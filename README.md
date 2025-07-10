# Smart Security Frontend

This is the frontend for the Smart Security system, built with React, TypeScript, Vite, and Tailwind CSS. It connects to a backend API (deployed on Render) for authentication, device management, and real-time alerts.

## Features
- Login with email and password
- Dashboard with device status and toggling
- Real-time alerts via SSE
- Cookie-based authentication and session management
- Responsive, modern UI with Tailwind CSS

## Tech Stack
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Render](https://render.com/) (backend)
- [Vercel](https://vercel.com/) (frontend hosting)

## Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/der43eryks/ui-homesecurity.git
cd Smart-security
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the project root:
```
VITE_API_BASE_URL=https://homesecurity-3.onrender.com
```

### 4. Development
```bash
npm run dev
```
Visit [http://localhost:5173/](http://localhost:5173/) in your browser.

### 5. Build for Production
```bash
npm run build
```

### 6. Deploy to Vercel
- Push your code to GitHub.
- Connect your repo to Vercel.
- Ensure `vercel.json` is present for SPA routing:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/" }
    ]
  }
  ```
- Set `VITE_API_BASE_URL` in Vercel project settings if needed.

## API Endpoints Used
- `/api/auth/login` (POST)
- `/api/auth/logout` (POST)
- `/api/users/me` (GET)
- `/api/devices/me` (GET)
- `/api/devices/status` (POST)
- `/api/sse/alerts` (SSE)

## Notes
- All API requests use `credentials: 'include'` for cookie/session auth.
- Backend must have CORS enabled for your frontend domain.
- For SPA routing, Vercel uses `vercel.json` to rewrite all routes to `index.html`.

## License
MIT
