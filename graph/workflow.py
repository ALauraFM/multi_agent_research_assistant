# graph/workflow.py
MAX_ITERATIONS = 3
from typing import TypedDict
from langgraph.graph import StateGraph, END

from agents.researcher import research
from agents.analyzer import analyze
from agents.writer import write_report

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

class AgentState(TypedDict):
    topic: str
    context: str
    language: str
    research: str
    insights: str
    report: str
    review: str
    approved: bool
    iterations: int

def reviewer_node(state: AgentState):
    lang = state.get("language", "en")
    if lang == "pt":
        system_msg = """Você é um revisor de relatórios de mercado. Avalie com base nestes critérios:
1. O relatório cobre todas as seções principais (visão geral, players, tendências, oportunidades, riscos, recomendações)
2. Tem profundidade adequada com exemplos ou dados quando disponíveis
3. As recomendações são acionáveis
Seja pragmático: aprove relatórios que atendam os critérios acima, mesmo que não sejam perfeitos."""
        user_msg = f"""Avalie o relatório abaixo.

Se atender os critérios mínimos de qualidade, responda: APROVADO seguido de um breve comentário.
Se faltar seções inteiras ou for muito superficial, responda: REPROVADO e diga o que melhorar.

Relatório:
{state["report"]}"""
    else:
        system_msg = """You are a market report reviewer. Evaluate based on these criteria:
1. The report covers all main sections (overview, players, trends, opportunities, risks, recommendations)
2. Has adequate depth with examples or data when available
3. Recommendations are actionable
Be pragmatic: approve reports that meet the criteria above, even if not perfect."""
        user_msg = f"""Review the report below.

If it meets minimum quality criteria, respond: APPROVED followed by a brief comment.
If entire sections are missing or it is too superficial, respond: REJECTED and explain what needs improvement.

Report:
{state["report"]}"""
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": system_msg
            },
            {
                "role": "user",
                "content": user_msg
            }
        ]
    )

    review_text = response.choices[0].message.content

    approved = "APROVADO" in review_text or "APPROVED" in review_text

    return {
        "review": review_text,
        "approved": approved
    }


# nós (agents)
def researcher_node(state: AgentState):
    result = research(state["topic"])
    return {"research": result}

def analyzer_node(state: AgentState):
    insights = analyze(state["research"])
    
    return {
        "insights": insights,
        "iterations": state["iterations"] + 1
    }


def writer_node(state: AgentState):
    report = write_report(state["topic"], state["insights"], state.get("language", "en"))
    return {"report": report}


# construção do grafo
def build_graph():
    graph = StateGraph(AgentState)

    graph.add_node("researcher", researcher_node)
    graph.add_node("analyzer", analyzer_node)
    graph.add_node("writer", writer_node)
    graph.add_node("reviewer", reviewer_node)

    graph.set_entry_point("researcher")

    graph.add_edge("researcher", "analyzer")
    graph.add_edge("analyzer", "writer")
    graph.add_edge("writer", "reviewer")

    # decisão condicional
    def review_decision(state: AgentState):
        if state["approved"]:
            return END
        
        if state["iterations"] >= MAX_ITERATIONS:
            return END
        
        return "analyzer"


    return graph.compile()