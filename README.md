# MedLab Calendar — atualização

Este pacote inclui ficheiros prontos para adicionar ao projeto no GitHub:

- `src/data/events.ts` — inclui os 2 eventos da SPH adicionados.
- `src/components/AboutSection.tsx` — nova secção “Sobre”.
- `src/components/OrganizersSection.tsx` — nova secção “Para Organizadores” com email visível e botão para Google Forms.
- `.env.local.example` — variável para o link do Google Form.
- `GOOGLE_FORM_FIELDS.md` — campos recomendados para criar o formulário.

Depois de copiares os ficheiros, adiciona o link do Google Form em Vercel:

```env
NEXT_PUBLIC_EVENT_SUBMISSION_FORM_URL=https://forms.gle/O_TEU_LINK
```

E faz redeploy.
