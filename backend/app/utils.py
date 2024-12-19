import json
import google.generativeai as genai
from typing import Dict


GEMINI_API_KEY = "AIzaSyBaTJzmdp4ftlGAGY_zEfn2ye3Mlr9F3rk"
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is not set!")
genai.configure(api_key=GEMINI_API_KEY)


def generate_creative_summary_via_gemini(pdf_uri: str, title: str) -> Dict:
    """
    Generates a detailed and creative summary along with key concepts a user will learn
    from the paper based on the PDF content using Gemini API.
    """
    prompt = f"""
    Based on the research paper titled '{title}' available at the link below:
    {pdf_uri}

    Perform the following tasks:
    1. Write a summary in 1 to 2 paragraphs that highlights:
       - What the paper is about,
       - Topics covered,
       - Key learnings and other important points.
       The goal is to excite and invite readers to explore the paper. Write in a creative, detailed manner
       with storytelling, emphasizing learning, benefits, and potential impacts. Avoid starting sentences or 
       paragraphs with generic phrases like "This paper discusses..." or "The study highlights...". Use compelling 
       and meaningful language to draw the reader's attention immediately.
       Examples of strong openings include:
       - "A groundbreaking approach to..."
       - "The authors delve into..."
       - "Exploring a novel perspective on..."

    2. List 4-5 engaging, one-line sentences that summarize key concepts a reader will learn from this paper.
       Each concept should:
       - Be clear, specific, and informative.
       - Avoid starting with generic phrases like "This paper discusses..." or "The study highlights...".
       - Use impactful language that excites the reader about the topic.
       Examples:
       - "Learn how neural networks can mimic human decision-making."
       - "Discover the potential of renewable energy to combat climate change."
       - "Understand the role of quantum mechanics in modern computing."

    Return the results as a JSON object with the fields:
    - "creative_summary" (string): The 1-2 paragraph summary.
    - "concepts_learned" (array of strings): The list of 4-5 one-line concepts.
    """
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    result = model.generate_content(
        [prompt, pdf_uri],
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
            response_schema={
                "type": "object",
                "properties": {
                    "creative_summary": {"type": "string"},
                    "concepts_learned": {"type": "array", "items": {"type": "string"}},
                },
                "required": ["creative_summary", "concepts_learned"],
            },
        ),
    )
    if result.candidates:
        json_data = json.loads(result.candidates[0].content.parts[0].text)
        return json_data
    return {"creative_summary": "No summary generated.", "concepts_learned": []}
