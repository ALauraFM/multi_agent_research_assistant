from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()

def write_report(topic: str, insights: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "Você é um redator técnico profissional. Gere relatórios claros, bem estruturados e com linguagem analítica."
            },
            {
                "role": "user",
                "content": f"""
Crie um relatório em Markdown com base no tema e nos insights abaixo.

Tema: {topic}

Estrutura obrigatória:

# {topic}

## Introdução
Explique o contexto do tema.

## Principais Tendências
Liste e explique as tendências.

## Análise de Mercado
Aprofunde os insights.

## Oportunidades
Descreva oportunidades relevantes.

## Riscos e Desafios
Aponte possíveis problemas.

## Conclusão
Resumo estratégico final.

Insights:
{insights}
"""
            }
        ]
    )
    return response.choices[0].message.content

