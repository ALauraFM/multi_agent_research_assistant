# Multi-Agent Research Assistant

An intelligent research automation system built with LangGraph that orchestrates multiple AI agents to research topics, analyze findings, and generate structured reports. Includes a professional Next.js frontend for easy interaction.

## Overview

This project implements a multi-agent workflow using LangGraph to automate the research and report generation process. The system chains three specialized agents that work sequentially:

1. **Researcher Agent** - Searches the web for relevant information using Tavily
2. **Analyzer Agent** - Processes research data using GPT-4o-mini to extract key insights, trends, opportunities, and risks
3. **Writer Agent** - Generates a well-structured Markdown report based on the analyzed insights

## Architecture

```
┌──────────────┐
│   Frontend   │  (Next.js + React + TypeScript)
│  (Port 3000) │
└──────┬───────┘
       │ HTTP POST /generate
       ▼
┌──────────────┐
│   Backend    │  (FastAPI)
│  (Port 8000) │
└──────┬───────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌──────────┐
│ Researcher  │────▶│  Analyzer   │────▶│   Writer    │────▶│ Reviewer │
│ (Tavily)    │     │  (GPT-4o)   │     │  (GPT-4o)   │     │ (GPT-4o) │
└─────────────┘     └─────────────┘     └─────────────┘     └──────────┘
                                                                   │
                                                                   ▼
                                                            Approved? ──No──▶ Retry
                                                                   │
                                                                  Yes
                                                                   │
                                                                   ▼
                                                              Final Report
```

## Tech Stack

### Backend
- **LangGraph** - Agent orchestration and state management
- **OpenAI GPT-4o-mini** - LLM for analysis and report generation
- **Tavily API** - Web search and data retrieval
- **FastAPI** - REST API interface with CORS support
- **Python 3.12+**

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first styling
- **React Markdown** - Report rendering
- **Lucide React** - Modern icons

## Project Structure

```
├── agents/              # AI agents
│   ├── researcher.py    # Web search agent
│   ├── analyzer.py      # Insights extraction agent
│   └── writer.py        # Report generation agent
├── tools/               # Utility tools
│   ├── web_search.py    # Tavily search integration
│   └── pdf_generator.py # PDF export utility
├── graph/               # LangGraph workflow
│   └── workflow.py      # Multi-agent pipeline with reviewer
├── api/                 # FastAPI backend
│   └── main.py          # REST endpoints with CORS
├── frontend/            # Next.js frontend (NEW!)
│   ├── app/             # Next.js app directory
│   ├── components/      # React components
│   ├── lib/             # API client and utilities
│   └── public/          # Static assets
├── orchestrator.py      # Pipeline runner
├── requirements.txt     # Python dependencies
└── .env.example         # Environment variables template
```

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd multi_agent_research_assistant
```

### 2. Create a virtual environment

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
OPENAI_API_KEY="your_openai_api_key_here"
TAVILY_API_KEY="your_tavily_api_key_here"
```

Get your API keys from:
- [OpenAI](https://platform.openai.com/api-keys)
- [Tavily](https://app.tavily.com/api-keys)

### 5. Set up the Frontend (Optional but Recommended)

```bash
cd frontend
npm install
```

Create `.env.local` (optional, defaults to `http://127.0.0.1:8000`):
```bash
cp .env.local.example .env.local
```

## Usage

### Option 1: Use the Web Interface (Recommended)

**Terminal 1 - Start Backend:**
```bash
source .venv/bin/activate
uvicorn api.main:app --reload
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

Open your browser to **http://localhost:3000** and use the professional web interface to:
- Enter research topics
- Add business context
- Generate reports with AI agents
- View beautifully formatted results
- Copy reports to clipboard
- See system review and iteration count

### Option 2: Use the API Directly

Start the API server:

```bash
source .venv/bin/activate
uvicorn api.main:app --reload
```

Generate a report via curl:

```bash
curl -X POST "http://localhost:8000/generate?topic=AI%20in%20Healthcare&context=startup%20early-stage"
```

Or use the interactive API docs at `http://localhost:8000/docs`

### Option 3: Use Python Directly

```python
from orchestrator import run_pipeline

result = run_pipeline("Renewable Energy Trends 2024", "enterprise context")
print(result["report"])
```

## Report Structure

Generated reports follow a standardized Markdown format:

- **Introduction** - Context and background of the topic
- **Main Trends** - Key trends identified from research
- **Market Analysis** - Deep dive into insights
- **Opportunities** - Relevant business or research opportunities
- **Risks and Challenges** - Potential issues and obstacles
- **Conclusion** - Strategic summary

## API Reference

### POST `/generate`

Generate a research report for a given topic.

**Parameters:**
- `topic` (string, required) - The research topic to investigate
- `context` (string, optional) - Business context for more targeted analysis

**Response:**
```json
{
  "topic": "AI in Healthcare",
  "research": "Raw research data...",
  "insights": "Analyzed insights...",
  "report": "# Full Markdown Report...",
  "review": "System review feedback...",
  "approved": true,
  "iterations": 1
}
```

## Features

### Multi-Agent Pipeline
- **Researcher** - Searches web with enhanced queries
- **Analyzer** - Extracts strategic insights
- **Writer** - Generates executive reports
- **Reviewer** - Quality control with auto-retry (max 2 iterations)

### Professional Frontend
- Modern SaaS-style UI
- Real-time loading states with agent visualization
- Beautiful Markdown rendering
- Copy to clipboard functionality
- Error handling and validation
- Responsive design
- Auto-scroll to results

### Quality Assurance
- AI-powered report review
- Automatic refinement loop
- Iteration tracking
- Approval status indicators

## Documentation

- **[FRONTEND_SETUP.md](FRONTEND_SETUP.md)** - Detailed frontend setup guide
- **[frontend/README.md](frontend/README.md)** - Frontend documentation
- **[frontend/FEATURES.md](frontend/FEATURES.md)** - Complete feature list

## License

MIT License
