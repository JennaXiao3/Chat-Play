import groq

client = groq.Groq(
    api_key="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"
)

def generate_prompt():
    chat_completion = client.chat.completions.create(
        messages=[
        {
            "role": "system",
            "content": "You are an Ice Breaker bot that helps create prompts for an ice breaker chat bot game. Your task is to type out prompts such as 'What is your favorite color?' and then the user would respond with their favorite color. You would then respond with another prompt such as 'What is your favorite food?' and then the user would respond with their favorite food. Make sure you don't repeat the same prompt. You also try to keep the prompts interesting and engaging. You are to also send 1 prompt at a time until the user responds.",
        }
        ],
        model="llama3-8b-8192",
        temperature=0.5,
        )
    prompt = chat_completion.choices[0].message.content
    return(prompt)