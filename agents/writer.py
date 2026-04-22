from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()


def write_report(topic: str, insights: str, language: str = "en") -> str:
    if language == "pt":
        system_msg = """Você é um consultor estratégico sênior que escreve relatórios executivos detalhados para tomada de decisão.
Regras:
- Inclua dados quantitativos, estatísticas e números específicos sempre que disponíveis nos insights
- Use exemplos concretos de empresas e casos de uso
- Faça transições suaves entre seções
- Recomendações devem ser específicas e acionáveis, com passos claros
- A conclusão deve trazer insights novos, não repetir o que já foi dito"""
        structure = f"""Crie um relatório detalhado de inteligência de mercado.

Tema: {topic}

Use exatamente esta estrutura:

# {topic}

## Visão Geral
Contextualize o mercado com dados de tamanho, crescimento e relevância. Inclua números específicos.

## Principais Players
Para cada player, inclua: posição no mercado, diferencial competitivo e dados relevantes (receita, usuários, etc).

## Tendências de Mercado
Descreva cada tendência com evidências concretas e seu impacto no mercado. Conecte com os players mencionados.

## Oportunidades Estratégicas
Liste oportunidades específicas com estimativa de potencial e exemplos de quem já está explorando.

## Riscos e Barreiras
Detalhe cada risco com probabilidade de impacto e possíveis mitigações.

## Recomendações Estratégicas
Para cada recomendação, inclua: ação específica, prazo sugerido, recursos necessários e resultado esperado.

## Conclusão Executiva
Sintetize os principais achados e indique direções futuras para o mercado.

## Fontes
Liste os links utilizados

Baseie-se nos insights abaixo:
{insights}"""
    else:
        system_msg = """You are a senior strategic consultant who writes detailed executive reports for decision-making.
Rules:
- Include quantitative data, statistics, and specific numbers whenever available from the insights
- Use concrete examples of companies and use cases
- Create smooth transitions between sections
- Recommendations must be specific and actionable, with clear steps
- The conclusion should bring new insights, not just repeat what was already said"""
        structure = f"""Create a detailed market intelligence report.

Topic: {topic}

Use exactly this structure:

# {topic}

## Executive Overview
Contextualize the market with data on size, growth, and relevance. Include specific numbers.

## Key Players
For each player, include: market position, competitive advantage, and relevant data (revenue, users, etc).

## Market Trends
Describe each trend with concrete evidence and its market impact. Connect with the players mentioned above.

## Strategic Opportunities
List specific opportunities with estimated potential and examples of who is already exploring them.

## Risks and Barriers
Detail each risk with impact probability and possible mitigations.

## Strategic Recommendations
For each recommendation, include: specific action, suggested timeline, required resources, and expected outcome.

## Executive Conclusion
Synthesize key findings and indicate future directions for the market.

## Sources
List the links used

Base your report on the insights below:
{insights}"""
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": system_msg
            },
            {
                "role": "user",
                "content": structure
            }
        ]
    )

    return response.choices[0].message.content