# Configuração do formulário de submissão

1. Cria um Google Form para submissão de eventos.
2. Copia o link público do formulário.
3. No Vercel, adiciona a variável de ambiente:

```text
VITE_EVENT_SUBMISSION_FORM_URL=https://forms.gle/O_TEU_LINK
```

4. Faz redeploy do projeto.

O botão "Sugerir evento" passa a abrir o formulário numa nova aba.
