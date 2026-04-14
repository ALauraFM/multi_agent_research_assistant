from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()


def analyze(content: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "Você é um analista de inteligência de mercado focado em negócios e estratégia."
            },
            {
                "role": "user",
                "content": f"""
Analise os dados abaixo e produza uma análise estruturada.

Inclua:

1. Tendências de mercado (bullet points)
2. Principais empresas/players (com breve descrição)
3. Oportunidades de negócio (com explicação)
4. Riscos e barreiras (com explicação)

Seja direto, analítico e evite repetir informações.

Dados:
{content}
"""
            }
        ]
    )

    return response.choices[0].message.content