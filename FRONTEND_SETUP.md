# Frontend Setup Guide

## Quick Start

### 1. Install Node.js (if not installed)

```bash
# Check if Node.js is installed
node --version

# If not installed, install Node.js 18+ using nvm or your package manager
# For Ubuntu/Debian:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The frontend will be available at: **http://localhost:3000**

### 4. Start the Backend API

In a separate terminal, make sure your FastAPI backend is running:

```bash
cd /home/analauraf/multi_agent_research_assistant
source .venv/bin/activate
uvicorn api.main:app --reload
```

The backend should be running at: **http://127.0.0.1:8000**

## Full Workflow

### Terminal 1 - Backend
```bash
cd /home/analauraf/multi_agent_research_assistant
source .venv/bin/activate
uvicorn api.main:app --reload
```

### Terminal 2 - Frontend
```bash
cd /home/analauraf/multi_agent_research_assistant/frontend
npm run dev
```

### Access the Application
Open your browser and navigate to: **http://localhost:3000**

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

### CORS Issues

The backend needs to allow CORS from the frontend. If you see CORS errors, update `api/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from orchestrator import run_pipeline

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
def generate(topic: str, context: str = ""):
    result = run_pipeline(topic, context)
    return result
```

### API Connection Issues

If the frontend can't connect to the backend:

1. Verify the backend is running: `curl http://127.0.0.1:8000/docs`
2. Check the API URL in the frontend (defaults to `http://127.0.0.1:8000`)
3. Create `.env.local` if you need a different URL:
   ```bash
   cd frontend
   cp .env.local.example .env.local
   # Edit .env.local if needed
   ```

## Production Build

```bash
cd frontend
npm run build
npm start
```

## Features Overview

- **Topic Input** - Enter any market research topic
- **Context Input** - Optional business context for more targeted analysis
- **Real-time Loading** - Visual feedback with agent pipeline animation
- **Report Display** - Beautifully formatted Markdown reports
- **System Review** - See the AI reviewer's assessment
- **Iterations Count** - Track how many refinement cycles occurred
- **Copy Report** - One-click copy to clipboard
- **Responsive Design** - Works on all screen sizes

## Architecture

```
User Input (Topic + Context)
        ↓
    Frontend (Next.js)
        ↓
    POST /generate
        ↓
    Backend (FastAPI)
        ↓
    LangGraph Pipeline
        ↓
    Researcher → Analyzer → Writer → Reviewer
        ↓
    JSON Response
        ↓
    Frontend Renders Report
```

## Next Steps

1. Customize the design in `app/globals.css`
2. Add more features (export to PDF, save reports, etc.)
3. Deploy to production (Vercel, Netlify, etc.)
4. Add authentication if needed
5. Implement report history/database

Enjoy your professional market intelligence platform! 🚀
