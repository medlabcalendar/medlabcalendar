# MedLab Calendar

Calendário de formação para profissionais de laboratório.

## Atualização final

Inclui:
- Secção "Sobre"
- Secção "Para Organizadores"
- Email visível: medlabcalendar@gmail.com
- Botão "Sugerir evento" funcional
- Ligação preparada para Google Forms via variável `VITE_GOOGLE_FORM_URL`
- Ficheiro `.env.example`
- Eventos da Sociedade Portuguesa de Hematologia (SPH):
  - Reunião Anual da SPH 2026
  - Programa de Formação Avançada em Hematologia

## Google Forms

Para usar Google Forms:

1. Cria um Google Form.
2. Copia o link público.
3. Na Vercel, vai a **Settings > Environment Variables**.
4. Cria a variável:

```txt
VITE_GOOGLE_FORM_URL=https://forms.gle/O_TEU_LINK
```

5. Faz redeploy do projeto.

Se a variável não estiver definida, o botão "Sugerir evento" abre um email pré-preenchido para `medlabcalendar@gmail.com`.
