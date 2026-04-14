from fastapi import FastAPI
from orchestrator import run_pipeline

app = FastAPI()


@app.post("/generate")
def generate(topic: str):
    report = run_pipeline(topic)
    return {"report": report}