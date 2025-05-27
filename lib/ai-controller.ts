export async function handleAICommand(command, context) {
  const response = await fetch(process.env.AI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, context }),
  });
  return response.json();
}