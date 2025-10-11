import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyA9exfLt-fflQ2WkICyAJyuiV1EqdAZJ_I",
});

/* async function main() {
   const response = await ai.models.generateContent({
     model: "gemini-2.0-flash",
     contents: "Explain how AI works",
   });
   console.log(response.text);
 }

 await main();
*/


export async function codereviewer(code) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: code,
    config: {
      systemInstruction:
        "You are a senior software engineer reviewing code written by a junior developer. Your review should be detailed, constructive, and professional. Focus on identifying logical errors, code smells, performance bottlenecks, and potential bugs. Also, suggest improvements for code readability, structure, and best practices. If the code is correct, still point out any opportunities for optimization or cleaner implementation. Use a helpful and mentoring tone as if guiding a junior developer in a real-world code review scenario.",
    },
  });
  const review = response.text;
  return review
}
