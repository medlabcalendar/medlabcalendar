import React, { useEffect, useMemo, useState } from "react";

// O teu link de exportação direta em CSV (garante que a partilha está para "Qualquer pessoa com o link")
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1znquVF7ampa2eLq6fsbvetrT21HLSgh_fhXJfh7YjIQ/export?format=csv";

/* =========================
   1. PARSER DE CSV DINÂMICO
========================= */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      value += '"';
      i += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(value.trim());
      value = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") i += 1;
      row.push(value.trim());
      if (row.some((cell) => cell !== "")) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }
  if (value || row.length) {
    row.push(value.trim());
    if (row.some((cell) => cell !== "")) rows.push(row);
  }

  if (rows.length < 2) return [];

  // Normaliza os cabeçalhos para evitar problemas com espaços ou acentos
  const headers = rows[0].map((h) => h.toUpperCase().trim());

  return rows.slice(1).map((cells) => {
    const raw = {};
    headers.forEach((header, index) => {
      raw[header] = cells[index] || "";
    });

    // Mapeamento direto com as colunas reais da tua Google Sheet
    const isActive = raw["ATIVO?"] || raw["STATUS"] || "Sim";

    return {
      title: raw["TÍTULO"] || raw["TITULO"] || raw["EVENTO"] || "",
      date: raw["DATA"] || "",
      area: raw["ÁREA CIENTÍFICA"] || raw["AREA CIENTIFICA"] || "Geral",
      type: raw["TIPO/FORMATO"] || "Outro",
      organizer: raw["ORGANIZADOR"] || "",
      link: raw["LINK OFICIAL"] || raw["LINK"] || "",
      price: raw["CUSTO"] || raw["PREÇO"] || raw["PRECO"] || "",
      certificate: raw["CERTIFICADO"] || "",
      status: isActive.toLowerCase().trim()
    };
  }).filter((e) => e.title && e.status !== "não" && e.status !== "nao" && e.status !== "inativo"); 
}

/* =========================
   2. FUNÇÕES DE FILTRAGEM
========================= */
function getUniqueValues(events, key) {
  return [...new Set(events.map((e) => e[key]).filter(Boolean))].sort();
}

function applyFilters(events, { area, type, search }) {
  return events.filter((event) => {
    const matchArea = area === "Todas" || event.area === area;
    const matchType = type === "Todos" || event.type === type;

    const matchSearch =
      !search ||
      event.title?.toLowerCase().includes(search.toLowerCase()) ||
      event.area?.toLowerCase().includes(search.toLowerCase()) ||
      event.organizer?.toLowerCase().includes(search.toLowerCase()) ||
      event.type?.toLowerCase().includes(search.toLowerCase());

    return matchArea && matchType && matchSearch;
  });
}

/* =========================
   3. COMPONENTES DE INTERFACE (UI)
========================= */
function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Pesquisar por título, área ou organizador..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 w-full mb-4 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

function Filters({ categories, types, active, setActive }) {
  return (
    <div className="space-y-3 mb-6">
      {/* FILTRO: ÁREA CIENTÍFICA */}
      <div>
        <span className="text-xs font-semibold text-gray-500 block mb-1">Área Científica:</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive((p) => ({ ...p, area: c }))}
              className={`px-3 py-1 border text-sm rounded transition-colors ${
                active.area === c ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* FILTRO: TIPO / FORMATO */}
      <div>
        <span className="text-xs font-semibold text-gray-500 block mb-1">Formato:</span>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActive((p) => ({ ...p, type: t }))}
              className={`px-3 py-1 border text-sm rounded transition-colors ${
                active.type === t ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="border p-4 rounded-xl shadow-sm bg-white border-gray-200 hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-gray-900 text-base mb-2">{event.title}</h3>
        
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">{event.area}</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{event.type}</span>
          {event.certificate && (
            <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded font-medium">📜 Certificado: {event.certificate}</span>
          )}
        </div>

        <div className="text-sm space-y-1 text-gray-700 pt-2 border-t border-gray-100">
          <p>📅 <strong>Data:</strong> {event.date}</p>
          {event.organizer && <p>🏢 <strong>Organização:</strong> {event.organizer}</p>}
          <p>💰 <strong>Custo:</strong> {event.price || "Gratuito / Não especificado"}</p>
        </div>
      </div>

      {event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block text-center bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Inscrição / Mais Info
        </a>
      )}
    </div>
  );
}

/* =========================
   4. COMPONENTE PRINCIPAL
========================= */
export default function MainV2() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    area: "Todas",
    type: "Todos"
  });

  // Carregamento inicial dos dados diretamente do Google Sheets
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(SHEET_CSV_URL);
        if (!res.ok) throw new Error("Erro ao aceder ao Google Sheets");
        
        const csvText = await res.text();
        const parsed = parseCSV(csvText);
        setEvents(parsed);
      } catch (err) {
        console.error("Erro na sincronização dinâmica:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Extração de filtros 100% dinâmica baseada no conteúdo atual da tabela
  const categories = useMemo(() => ["Todas", ...getUniqueValues(events, "area")], [events]);
  const types = useMemo(() => ["Todos", ...getUniqueValues(events, "type")], [events]);

  // Aplicação combinada de pesquisa por input e botões de filtro
  const filteredEvents = useMemo(() => {
    return applyFilters(events, { ...filters, search });
  }, [events, filters, search]);

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500 animate-pulse font-medium text-base">
        🔬 A estabelecer ligação e a ler os dados da MedLab...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Caixa de Pesquisa */}
      <SearchBar value={search} onChange={setSearch} />
      
      {/* Filtros Gerados do Sheets */}
      <Filters
        categories={categories}
        types={types}
        active={filters}
        setActive={setFilters}
      />

      {/* Título com Contador Dinâmico */}
      <h2 className="font-bold text-lg text-gray-800 mb-4">
        Calendário de Eventos ({filteredEvents.length})
      </h2>
      
      {/* Grelha de Eventos */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, i) => <EventCard key={i} event={event} />)
        ) : (
          <p className="text-gray-500 text-sm col-span-2 py-8 text-center bg-gray-50 rounded-xl border border-dashed">
            Nenhum evento corresponde à pesquisa ou aos filtros selecionados.
          </p>
        )}
      </div>
    </div>
  );
}
