# AgentFlow Market Intelligence - Frontend

A modern, professional Next.js frontend for the AgentFlow Market Intelligence system. This application provides an intuitive interface for generating AI-powered market research reports.

## Features

- **Modern UI/UX** - Clean, professional SaaS-style design with TailwindCSS
- **Real-time Loading States** - Visual feedback during report generation with agent pipeline visualization
- **Markdown Report Rendering** - Beautiful, formatted display of generated reports
- **Copy to Clipboard** - Easy report sharing functionality
- **Error Handling** - Graceful error states with user-friendly messages
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **TypeScript** - Full type safety throughout the application
- **Auto-scroll** - Automatically scrolls to results when ready

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **React Markdown** - Markdown rendering
- **Lucide React** - Modern icon library

## Project Structure

```
frontend/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main application page
├── components/
│   ├── ui/                   # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   ├── ReportForm.tsx        # Form for topic and context input
│   ├── ReportViewer.tsx      # Displays generated reports
│   └── LoadingState.tsx      # Loading animation with agent pipeline
├── lib/
│   ├── api.ts                # API client for backend communication
│   └── utils.ts              # Utility functions
└── public/                   # Static assets
```

## Setup

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://127.0.0.1:8000`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
cp .env.local.example .env.local
```

Edit `.env.local` if your backend runs on a different URL:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Usage

1. **Enter Topic** - Provide a research topic (e.g., "AI in Healthcare in Brazil")
2. **Add Context** (Optional) - Provide business context to refine the analysis
3. **Generate Report** - Click the button to start the AI pipeline
4. **View Results** - See the formatted report with:
   - System review and approval status
   - Number of iterations
   - Full market intelligence report
5. **Copy or Reset** - Copy the report or generate a new one

## API Integration

The frontend communicates with the FastAPI backend via:

**Endpoint:** `POST /generate`

**Parameters:**
- `topic` (string, required) - Research topic
- `context` (string, optional) - Business context

**Response:**
```typescript
{
  topic: string
  research: string
  insights: string
  report: string
  review: string
  approved: boolean
  iterations: number
}
```

## Components

### ReportForm
Form component with topic and context inputs, handles submission and loading states.

### ReportViewer
Displays the generated report with:
- Metadata cards (review status, iterations)
- Formatted Markdown content
- Copy and reset actions

### LoadingState
Animated loading screen showing the agent pipeline (Researcher → Analyzer → Writer).

### UI Components
Reusable base components built with TailwindCSS:
- Button (variants: default, outline, ghost)
- Card (with header, content, footer)
- Input
- Textarea

## Customization

### Colors
Edit `app/globals.css` to customize the color scheme using CSS variables.

### Styling
All components use TailwindCSS. Modify classes directly in components or extend the theme in `tailwind.config.ts`.

### API URL
Change the backend URL in `.env.local` or it defaults to `http://127.0.0.1:8000`.

## Development Notes

- Uses Next.js App Router with client-side rendering for interactive components
- All form components are marked with `"use client"` directive
- TypeScript strict mode enabled for type safety
- Responsive design with mobile-first approach
- Accessibility features included (proper labels, ARIA attributes)

## License

MIT License
