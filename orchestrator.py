from graph.workflow import build_graph

graph = build_graph()

def run_pipeline(topic: str):
    result = graph.invoke({
        "topic": topic,
        "research": "",
        "insights": "",
        "report": ""
    })

    return result["report"]