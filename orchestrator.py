from graph.workflow import build_graph

# cria o grafo UMA vez
graph = build_graph()


def run_pipeline(topic: str, context: str = "", language: str = "en"):
    result = graph.invoke({
        "topic": topic,
        "context": context,
        "language": language,
        "research": "",
        "insights": "",
        "report": "",
        "review": "",
        "approved": False,
        "iterations": 0
    })

    return result   