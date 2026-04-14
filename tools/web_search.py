from tavily import TavilyClient
from dotenv import load_dotenv
import os

load_dotenv()

client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

def search_web(query: str) -> str:
    response = client.search(
        query=query,
        search_depth="advanced",
        max_results=5
    )

    results = []

    for r in response["results"]:
        results.append(f"Título: {r['title']}\nConteúdo: {r['content']}\n")

    return "\n\n".join(results)