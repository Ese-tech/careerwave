# KI-API Integration (OpenAI)

## Endpunkt

**POST** `/ai/cover-letter`

- Authentifizierung: JWT erforderlich (wie bei anderen geschützten Endpunkten)
- Body:
  ```json
  {
    "jobTitle": "Softwareentwickler",
    "skills": ["TypeScript", "React", "Node.js"],
    "experience": "3 Jahre Berufserfahrung in der Webentwicklung."
  }
  ```
- Antwort:
  ```json
  {
    "success": true,
    "coverLetter": "Sehr geehrte Damen und Herren, ..."
  }
  ```

## .env
Fügen Sie Ihren OpenAI API Key hinzu:
```
OPENAI_API_KEY=sk-<your-openai-key-here>
```

## Hinweise
- Die KI generiert ein Anschreiben auf Deutsch und Englisch , zugeschnitten auf die Angaben im Request.
- Die Route ist durch den Auth-Guard geschützt.
- Die OpenAI-API wird über das npm-Paket `openai` angesprochen.

## Beispiel-Request (curl)
```bash
curl -X POST https://<host>/ai/cover-letter \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"jobTitle":"Softwareentwickler","skills":["TypeScript","React"],"experience":"3 Jahre Berufserfahrung"}'
```
