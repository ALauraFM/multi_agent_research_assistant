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
    sources = []

    for r in response["results"]:
        results.append(f"Título: {r['title']}\nConteúdo: {r['content']}\n")
        sources.append(r["url"])

    content = "\n\n".join(results)
    sources_text = "\n".join(sources)

    return f"{content}\n\nFONTES:\n{sources_text}"