# Google Forms — Submissão de Eventos

1. Cria um Google Form com estes campos:
   - Nome do evento *
   - Entidade organizadora *
   - Tipo de evento *
   - Data de início *
   - Data de fim
   - Formato *
   - Local
   - Área científica *
   - Website oficial *
   - Descrição
   - Nome do contacto
   - Email do contacto *

2. Nas respostas do Google Forms, ativa as notificações por email para:

   medlabcalendar@gmail.com

3. Copia o link público do formulário.

4. No Vercel, vai a:

   Project Settings → Environment Variables

5. Adiciona:

   VITE_EVENT_SUBMISSION_FORM_URL=https://forms.gle/O_TEU_LINK

6. Faz Redeploy.

Enquanto não configurares a variável, o botão usa o placeholder:

https://forms.gle/COLOCA_AQUI_O_LINK_DO_GOOGLE_FORM
