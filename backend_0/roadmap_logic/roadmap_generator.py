# backend/roadmap_logic/roadmap_generator.py

import json
from roadmap_logic.deepseek_api import ask_deepseek  # Clean 🔥

def create_prompt(answers: dict) -> str:
    return f"""
You are a career counselor and expert learning roadmap planner.

User details:
- Domain of Interest: {answers['q0']}
- Skill Level: {answers['q1']} 
- Study Time Weekly: {answers['q2']} hours
- Final Goal: {answers['q3']}
- Timeline: {answers['q4']}
- Preferred Language: {answers['q5']}
- Preferred Framework: {answers['q6']}
- Prior Programming Knowledge: {answers['q7']}
- Project Enthusiasm Level: {answers['q8']}
- Wants Certification: {answers['q9']}

Task:
Create a customized, detailed, and realistic learning roadmap based only on the main domain: {answers['q0']}.

Guidelines:
- Expand deeply (Beginner → Intermediate → Advanced).
- Minimum 7 modules.
- 4-5 chapters per module.
- Mini-project for each chapter.
- High-quality resources (YouTube/docs/books).
- Adjust difficulty based on skill and timeline.
- Strong focus on {answers['q0']} topics.
- Respect {answers['q2']} study hours per week.
- Focus on using {answers['q5']} and {answers['q6']}.
- Include certification preparation if needed.

STRICT RULE:
ONLY output a valid JSON object like:

STRICT INSTRUCTION:
- Only output a pure JSON object.
- DO NOT include <think> tags, explanations, or markdown formatting (e.g., code fences like ```).
- The output must begin directly with {{ and end with }}.
- If the output is not valid JSON, the server will fail.


{{
  "roadmap": [
    {{
      "module": "Module Name",
      "chapters": [
        {{
          "chapter_title": "Chapter Name",
          "duration": "1-2 weeks",
          "description": "Brief description",
          "goal": "Goal description",
          "resources": ["URL1", "URL2"],
          "mini_project": "Mini project idea"
        }}
      ]
    }}
  ]
}}

ABSOLUTELY NO OTHER TEXT OR COMMENT.
ONLY JSON — OTHERWISE THE SERVER WILL FAIL IMMEDIATELY.
"""

# def generate_roadmap(answers: dict) -> dict:
#     prompt = create_prompt(answers)
#     response_content = ask_deepseek(prompt)

#     # Try parsing JSON safely
#     try:
#         roadmap_json = json.loads(response_content)
#     except json.JSONDecodeError as e:
#         raise ValueError(f"Error parsing roadmap JSON: {e}")

#     return roadmap_json

def generate_roadmap(answers: dict) -> dict:
    prompt = create_prompt(answers)
    response_content = ask_deepseek(prompt)

    # TEMPORARY: Print raw model output
    print("\n\n========= RAW MODEL OUTPUT =========\n")
    print(response_content)
    print("\n=====================================\n")

    # Don't even parse yet
    return {"raw_response": response_content}
