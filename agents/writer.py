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
                "content": "Você é um consultor estratégico que escreve relatórios executivos para tomada de decisão."
            },
            {
                "role": "user",
                "content": f"""
Crie um relatório de inteligência de mercado.

Tema: {topic}

Use exatamente esta estrutura:

# {topic}

## Visão Geral
...

## Principais Players
...

## Tendências de Mercado
...

## Oportunidades Estratégicas
...

## Riscos e Barreiras
...

## Recomendações Estratégicas
...

## Conclusão Executiva
...

## Fontes
Liste os links utilizados

Baseie-se nos insights abaixo:
{insights}
"""
            }
        ]
    )

    return response.choices[0].message.content