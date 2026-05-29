export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Sobre
        </p>
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
          Sobre o MedLab Calendar
        </h2>

        <div className="space-y-5 text-lg leading-8 text-slate-700">
          <p>
            O MedLab Calendar é uma plataforma independente dedicada à divulgação
            de eventos científicos e formativos nas áreas da Medicina Laboratorial
            e disciplinas relacionadas.
          </p>

          <p>
            O objetivo é reunir, num único local, congressos, reuniões científicas,
            webinars, cursos, workshops e outras iniciativas relevantes para
            profissionais de saúde, cientistas laboratoriais, investigadores,
            estudantes e organizações do setor.
          </p>

          <p>As áreas abrangidas incluem:</p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Medicina Laboratorial',
              'Patologia Clínica',
              'Hematologia',
              'Microbiologia',
              'Genética Humana',
              'Imunologia e Autoimunidade',
              'Gestão da Qualidade',
              'Point-of-Care Testing',
              'Diagnóstico Molecular',
              'Medicina Transfusional',
            ].map((area) => (
              <div
                key={area}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-800"
              >
                {area}
              </div>
            ))}
          </div>

          <p>
            Os eventos são identificados através de fontes públicas, sociedades
            científicas, instituições académicas, organizações profissionais,
            entidades de saúde e submissões da comunidade.
          </p>

          <p>
            A missão do MedLab Calendar é facilitar o acesso à informação,
            promover a formação contínua e aumentar a visibilidade das iniciativas
            científicas da comunidade laboratorial.
          </p>
        </div>
      </div>
    </section>
  );
}
