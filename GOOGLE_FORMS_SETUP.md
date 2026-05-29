# Google Forms — Submissão de eventos

O botão **Sugerir evento** está preparado para abrir um Google Form.

## Como ativar

1. Cria um Google Form.
2. Copia o link público do formulário.
3. No Vercel, vai a **Project > Settings > Environment Variables**.
4. Adiciona:

```text
VITE_EVENT_SUBMISSION_FORM_URL=https://forms.gle/O_TEU_LINK
```

5. Faz **Redeploy**.

## Nota

Se esta variável ainda não existir, o botão abre um email para:

```text
medlabcalendar@gmail.com
```
