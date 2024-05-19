import random
import groq

client = groq.Groq(
    api_key="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"
)

random_words=["animals", "hobbies", "technology", "travelling", "pets", "ocean"]

def generate_prompt():
    chat_completion = client.chat.completions.create(
        messages=[
        {
            "role": "system",
            "content": "You are an Ice Breaker bot that helps create prompts for an ice breaker chat bot game. Your task is to type out prompts such as 'What is your favorite color?' and then the user would respond with their favorite color. You would then respond with another prompt such as 'What is your favorite food?' and then the user would respond with their favorite food.  Ask a question related to " + random_words[random.randint(0,len(random_words) - 1)] + "."
        }
        ],
        model="llama3-8b-8192",

        )
    prompt = chat_completion.choices[0].message.content

        
    return(prompt)