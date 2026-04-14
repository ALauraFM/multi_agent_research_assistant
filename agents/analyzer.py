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
                "content": "Você é um analista de mercado especializado em extrair insights estratégicos a partir de dados brutos. Seja objetivo, estruturado e evite redundância."
            },
            {
                "role": "user",
                "content": f"""
Analise o conteúdo abaixo e produza:

1. Principais tendências (bullet points)
2. Principais atores/empresas mencionados
3. Oportunidades identificadas
4. Riscos ou desafios

Conteúdo:
{content}
"""
            }
        ]
    )
    return response.choices[0].message.content
