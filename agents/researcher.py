from tools.web_search import search_web

def research(topic: str) -> str:
    results = search_web(topic)
    return results
