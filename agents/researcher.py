from tools.web_search import search_web

def research(topic: str) -> str:
    query = f"{topic} mercado tendências empresas análise"
    return search_web(query)
