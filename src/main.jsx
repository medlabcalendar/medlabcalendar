import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  CalendarDays,
  Search,
  ExternalLink,
  Microscope,
  Filter,
  CheckCircle2,
  HeartHandshake,
  ClipboardList,
  Download,
  Archive,
  ChevronLeft,
  ChevronRight,
  Dna,
  Droplets,
  ShieldCheck,
  FlaskConical,
  Ambulance,
  BarChart3,
  Lightbulb,
  TestTube2
} from 'lucide-react'
import './styles.css'

const contactEmail = 'medlabcalendar@gmail.com'
const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc22SEwuG9LJnLsQ0tgRrJA9zx2Fsr7cZ6iA9g06qRnemOxVw/viewform'

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNMDWDdFpEBXYUUKpw87IYCdmy_Y6bTGKzpKpDuundPcyfxvEZZ9SvSzQ_rTb2TZMk0z-T6b5Yzs4f/pub?output=csv'

const fallbackEvents = [
  {
    "title": "9º Encontro Nacional de Diagnóstico Pré-Natal",
    "date": "2026/06/12 - 2026/06/13",
    "category": "Genética"
  }
]

const CATEGORIES = {
  'Todos': { icon: Filter, color: 'var(--text-secondary)' },
  'Genética': { icon: Dna, color: '#6366f1' },
  'Bioquímica Clínica': { icon: Droplets, color: '#3b82f6' },
  'Hematologia': { icon: ShieldCheck, color: '#ef4444' },
  'Coagulação e Hemostase': { icon: ClipboardList, color: '#f59e0b' },
  'Microbiologia': { icon: FlaskConical, color: '#10b981' },
  'Anatomia Patológica': { icon: Microscope, color: '#8b5cf6' },
  'Biologia Molecular': { icon: TestTube2, color: '#ec4899' },
  'Toxicologia': { icon: BarChart3, color: '#f97316' },
  'Bioestatística': { icon: BarChart3, color: '#14b8a6' },
  'Imunologia': { icon: HeartHandshake, color: '#a855f7' },
  'Urgência': { icon: Ambulance, color: '#f43f5e' },
  'Inovação': { icon: Lightbulb, color: '#eab308' },
  'Medicina Laboratorial': { icon: Archive, color: '#6b7280' }
}

function normalizeText(str) {
  if (!str) return ''
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function normalizeCategory(category) {
  if (!category) return 'Medicina Laboratorial'
  const normalized = normalizeText(category)

  if (normalized.startsWith('area cientifica')) {
    const cleanRemainder = normalized.replace('area cientifica', '').trim()
    if (cleanRemainder) return normalizeCategory(cleanRemainder)
  }

  if (normalized.includes('anatomia')) return 'Anatomia Patológica'
  if (normalized.includes('biologia molecular')) return 'Biologia Molecular'
  if (normalized.includes('bioestatistica') || normalized.includes('investigacao')) return 'Bioestatística'
  if (normalized.includes('toxicologia')) return 'Toxicologia'
  if (normalized.includes('bioquimica') && normalized.includes('urgencia')) return 'Urgência'
  if (normalized.includes('urgencia')) return 'Urgência'
  if (normalized.includes('bioquimica')) return 'Bioquímica Clínica'
  if (normalized.includes('nefrologia')) return 'Bioquímica Clínica'
  if (normalized.includes('neurologia')) return 'Bioquímica Clínica'
  if (normalized.includes('genetica') && normalized.includes('inovacao')) return 'Inovação'
  if (normalized.includes('genetica')) return 'Genética'
  
  if (normalized.includes('coagulacao') || normalized.includes('hemostase')) return 'Coagulação e Hemostase'
  if (normalized.includes('hematologia') || normalized.includes('mieloma') || normalized.includes('oncologia')) return 'Hematologia'
  
  if (normalized.includes('microbiologia') || normalized.includes('infec') || normalized.includes('fungal') || normalized.includes('rubeola')) return 'Microbiologia'
  if (normalized.includes('qualidade') || normalized.includes('pre-analitica') || normalized.includes('poct') || normalized.includes('urinalise')) return 'Qualidade'
  
  if (normalized.includes('imunologia') || normalized.includes('imuno')) return 'Imunologia'
  
  if (normalized.includes('medicina laboratorial')) return 'Medicina Laboratorial'
  if (normalized.includes('inovacao') || normalized.includes('inteligencia artificial')) return 'Inovação'

  return 'Medicina Laboratorial'
}

function parseCSV(text) {
  if (!text) return []
  const lines = text.split(/\r?\n/)
  if (lines.length <= 1) return []

  const headers = lines[0].split(',').map(h => normalizeText(h.trim().replace(/^"|"$/g, '')))
  const result = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || []
    const cells = []
    let currentCell = ''
    let inQuotes = false

    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        cells.push(currentCell.trim().replace(/^"|"$/g, ''))
        currentCell = ''
      } else {
        currentCell += char
      }
    }
    cells.push(currentCell.trim().replace(/^"|"$/g, ''))

    const raw = {}
    headers.forEach((header, index) => {
      raw[header] = cells[index] || ''
    })

    if (!raw.titulo && !raw.title && !raw.nome) continue

    result.push({
      title: raw.titulo || raw.title || raw.nome || 'Evento sem título',
      date: raw.data || raw.date || 'Data não disponível',
      category: normalizeCategory(raw.categoria || raw.category || raw.area || ''),
      organizer: raw.organizador || raw.organization || raw.promotor || 'Não especificado',
      format: raw.formato || raw.format || 'Não especificado',
      location: raw.local || raw.location || 'Não especificado',
      cost: raw.custo || raw.price || 'Não especificado',
      certificate: raw.certificado || raw.certificate || 'Não especificado',
      link: raw.link || raw.url || raw.website || ''
    })
  }

  return result
}

function SuggestEventLink({ children }) {
  return (
    <a href={googleFormUrl} target=\"_blank\" rel=\"noopener noreferrer\" className=\"action-link\">
      {children}
    </a>
  )
}

function Button({ children, variant = 'primary', size = 'default', onClick, className = '' }) {
  const baseStyle = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  return (
    <button className={`${baseStyle} btn-${variant} btn-size-${size} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

function App() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then(response => {
        if (!response.ok) throw new Error('Não foi possível carregar os dados')
        return response.text()
      })
      .then(csvText => {
        const parsed = parseCSV(csvText)
        setEvents(parsed.length > 0 ? parsed : fallbackEvents)
        setLoading(false)
      })
      .catch(err => {
        console.error('Erro ao procurar CSV, a usar fallback:', err)
        setEvents(fallbackEvents)
        setLoading(false)
      })
  }, [])

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch =
        normalizeText(event.title).includes(normalizeText(searchTerm)) ||
        normalizeText(event.organizer).includes(normalizeText(searchTerm)) ||
        normalizeText(event.location).includes(normalizeText(searchTerm))

      const matchesCategory = selectedCategory === 'Todos' || event.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [events, searchTerm, selectedCategory])

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  
  const currentEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredEvents.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredEvents, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])

  return (
    <div className=\"app-container\">
      <header className=\"header\">
        <div className=\"container header-content\">
          <div className=\"logo-section\">
            <CalendarDays className=\"logo-icon\" size={32} />
            <div>
              <h1 className=\"site-title\">MedLab Calendar</h1>
              <p className=\"site-subtitle\">Calendário de Formações e Eventos de Medicina Laboratorial</p>
            </div>
          </div>
          <div className=\"header-actions\">
            <SuggestEventLink>
              <Button variant=\"primary\">
                <ExternalLink size={16} style={{ marginRight: '8px' }} />
                Sugerir Evento
              </Button>
            </SuggestEventLink>
          </div>
        </div>
      </header>

      <main className=\"container main-content\">
        <section className=\"search-filter-section\">
          <div className=\"search-container\">
            <Search className=\"search-icon\" size={20} />
            <input
              type=\"text\"
              placeholder=\"Pesquisar por título, organizador, palavra-chave...\"
              className=\"search-input\"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className=\"categories-grid\">
            {Object.entries(CATEGORIES).map(([name, config]) => {
              const IconComponent = config.icon
              const isSelected = selectedCategory === name
              return (
                <button
                  key={name}
                  onClick={() => setSelectedCategory(name)}
                  className={`category-tag ${isSelected ? 'active' : ''}`}
                  style={{ '--tag-color': config.color }}
                >
                  <IconComponent size={16} />
                  <span>{name}</span>
                </button>
              )
            })}
          </div>
        </section>

        <section className=\"events-section\">
          <div className=\"section-header\">
            <h2 className=\"section-title\">
              {selectedCategory === 'Todos' ? 'Todos os Eventos' : `Eventos de ${selectedCategory}`}
              <span className=\"count-badge\">{filteredEvents.length}</span>
            </h2>
          </div>

          {loading ? (
            <div className=\"loading-state\">A carregar eventos...</div>
          ) : currentEvents.length === 0 ? (
            <div className=\"empty-state\">
              <p>Nenhum evento encontrado para os critérios selecionados.</p>
            </div>
          ) : (
            <>
              <div className=\"events-grid\">
                {currentEvents.map((event, index) => {
                  const catConfig = CATEGORIES[event.category] || CATEGORIES['Medicina Laboratorial']
                  const CatIcon = catConfig.icon

                  return (
                    <article key={index} className=\"event-card\">
                      <div className=\"card-header\">
                        <span className=\"card-category\" style={{ backgroundColor: `${catConfig.color}15`, color: catConfig.color }}>
                          <CatIcon size={14} style={{ marginRight: '4px' }} />
                          {event.category}
                        </span>
                        <span className=\"card-date\">{event.date}</span>
                      </div>
                      <h3 className=\"card-title\">{event.title}</h3>
                      <p className=\"card-organizer\"><strong>Organizador:</strong> {event.organizer}</p>
                      <div className=\"card-details-grid\">
                        <div><strong>Formato:</strong> {event.format}</div>
                        <div><strong>Local:</strong> {event.location}</div>
                        <div><strong>Custo:</strong> {event.cost}</div>
                        <div><strong>Certificado:</strong> {event.certificate}</div>
                      </div>
                      {event.link && (
                        <div className=\"card-actions\">
                          <a href={event.link} target=\"_blank\" rel=\"noopener noreferrer\" className=\"visit-button\">
                            Ver página do evento <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                          </a>
                        </div>
                      )}
                    </article>
                  )
                })}
              </div>

              {totalPages > 1 && (
                <div className=\"pagination\">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className=\"pagination-button\"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className=\"pagination-info\">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className=\"pagination-button\"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <section className=\"info-section\">
          <div className=\"info-grid\">
            <div className=\"info-copy\">
              <h2>Divulgue os seus cursos e reuniões científicas relevantes.</h2>
              <p>O MedLab Calendar aceita sugestões de eventos de sociedades científicas, universidades, hospitais, laboratórios, empresas e outras entidades com formação relevante para a medicina laboratorial.</p>
            </div>
            <div className=\"organizers-copy\">
              <p><strong>Informação recomendada:</strong> título, data, organizador, área, formato, local, custo, certificado e link oficial.</p>
              <p><strong>Email:</strong> <a className=\"inline-link\" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
              <p><strong>Importante:</strong> a plataforma atua apenas como serviço de curadoria e divulgação. Os eventos pertencem às respetivas entidades organizadoras.</p>
              <SuggestEventLink><Button>Submeter evento</Button></SuggestEventLink>
            </div>
          </div>
        </section>
      </main>

      <footer className=\"footer\">
        <div className=\"container footer-content\">
          <div>
            <p>© 2026 MedLab Calendar. Curadoria independente de formação laboratorial.</p>
            <p>Os eventos apresentados são da responsabilidade das entidades organizadoras. O MedLab Calendar atua apenas como plataforma de divulgação.</p>
          </div>
          <p>Contacto: <a className=\"inline-link\" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
        </div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
