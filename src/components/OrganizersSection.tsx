const formUrl = process.env.NEXT_PUBLIC_EVENT_SUBMISSION_FORM_URL || '#';
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'medlabcalendar@gmail.com';

export default function OrganizersSection() {
  return (
    <section id="organizers" className="py-20 px-6 bg-slate-50">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Para Organizadores
        </p>

        <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
          Divulgue gratuitamente o seu evento
        </h2>

        <div className="space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Organiza um congresso, webinar, curso, workshop ou reunião científica?
          </p>

          <p>
            O MedLab Calendar disponibiliza gratuitamente a divulgação de eventos
            relacionados com a Medicina Laboratorial e áreas afins.
          </p>

          <p>Podem ser submetidos eventos promovidos por:</p>

          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Sociedades científicas',
              'Instituições académicas',
              'Hospitais e unidades de saúde',
              'Organizações profissionais',
              'Empresas do setor da saúde e diagnóstico',
            ].map((item) => (
              <li key={item} className="rounded-xl bg-slate-50 px-4 py-3 text-base font-medium text-slate-800">
                {item}
              </li>
            ))}
          </ul>

          <p>
            Todos os eventos são revistos antes da publicação para garantir a sua
            relevância e exatidão. A submissão é gratuita e não garante publicação automática.
          </p>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              Sugerir Evento
            </a>

            <a
              href={`mailto:${contactEmail}`}
              className="text-base font-medium text-slate-700 underline underline-offset-4 hover:text-slate-950"
            >
              {contactEmail}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
