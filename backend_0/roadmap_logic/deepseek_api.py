# backend/roadmap_logic/deepseek_api.py

import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

# Initialize Groq / DeepSeek / other LLM client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def ask_deepseek(prompt: str) -> str:
    """
    Sends a prompt to the LLM and returns the response text.
    """
    try:
        response = client.chat.completions.create(
            model="deepseek-r1-distill-llama-70b",  # or "deepseek-coder" etc (your model)
            messages=[
                {"role": "system", "content": "You are an expert roadmap builder."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=2048
        )
        content = response.choices[0].message.content
        return content

    except Exception as e:
        raise RuntimeError(f"DeepSeek API call failed: {e}")
