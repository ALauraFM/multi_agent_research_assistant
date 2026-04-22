from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from orchestrator import run_pipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate")
def generate(topic: str, context: str = "", language: str = "en"):
    result = run_pipeline(topic, context, language)

    return result