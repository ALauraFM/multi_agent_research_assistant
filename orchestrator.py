from graph.workflow import build_graph

# cria o grafo UMA vez
graph = build_graph()


def run_pipeline(topic: str, context: str = ""):
    result = graph.invoke({
        "topic": topic,
        "context": context,
        "research": "",
        "insights": "",
        "report": "",
        "review": "",
        "approved": False,
        "iterations": 0
    })

    return result   