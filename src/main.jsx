import React, { useEffect, useMemo, useState } from "react";

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1znquVF7ampa2eLq6fsbvetrT21HLSgh_fhXJfh7YjIQ/export?format=csv";

/* =========================
   PARSER DE CSV COMPLETO E SEGURO
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
      value += '"'; i += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(value.trim()); value = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") i += 1;
      row.push(value.trim());
      if (row.some((cell) => cell !== "")) rows.push(row);
      row = []; value = "";
    } else {
      value += char;
    }
  }
  if (value || row.length) {
    row.push(value.trim());
    if (row.some((cell) => cell !== "")) rows.push(row);
  }

  if (rows.length < 2) return [];

  // Limpa acentos, espaços e padroniza tudo em minúsculas
  const headers = rows[0].map((h) => 
    h.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
  );

  return rows.slice(1).map((cells) => {
    const raw = {};
    headers.forEach((header, index) => {
      raw[header] = cells[index] || "";
    });

    // Deteta se está ativo (se estiver vazio, assume "sim" por segurança)
    const statusVal = (raw["ativo?"] || raw["ativo"] || raw["status"] || "sim").toLowerCase().trim();

    return {
      title: raw["titulo"] || raw["evento"] || "",
      date: raw["data"] || "",
      area: raw["area cientifica"] || raw["area"] || "Geral",
      type: raw["tipo/formato"] || raw["formato"] || raw["tipo"] || "Outro",
      organizer: raw["organizador"] || "",
      link: raw["link oficial"] || raw["link"] || "",
      price: raw["custo"] || raw["preco"] || "",
      certificate: raw["certificado"] || "",
      status: statusVal
    };
  }).filter((e) => e.title && e.status !== "nao" && e.status !== "inativo"); 
}

/* =========================
   HELPERS
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
      event.organizer?.toLowerCase().includes(search.toLowerCase());

    return matchArea && matchType && matchSearch;
  });
}

/* =========================
   COMPONENTES UI
========================= */
function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Pesquisar por título, área ou organizador..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 w-full mb-4 rounded-md shadow-sm text-gray-800"
    />
  );
}

function Filters({ categories, types, active, setActive }) {
  return (
    <div className="space-y-3 mb-6">
      <div>
        <span className="text-xs font-semibold text-gray-500 block mb-1">Área Científica:</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive((p) => ({ ...p, area: c }))}
              className={`px-3 py-1 border text-sm rounded ${
                active.area === c ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-gray-500 block mb-1">Formato:</span>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActive((p) => ({ ...p, type: t }))}
              className={`px-3 py-1 border text-sm rounded ${
                active.type === t ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700"
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
    <div className="border p-4 rounded-xl shadow-sm bg-white border-gray-200 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-gray-900 text-base mb-2">{event.title}</h3>
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">{event.area}</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{event.type}</span>
          {event.certificate && <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded font-medium">📜 {event.certificate}</span>}
        </div>
        <div className="text-sm space-y-1 text-gray-700 pt-2 border-t border-gray-100">
          <p>📅 <strong>Data:</strong> {event.date}</p>
          {event.organizer && <p>🏢 <strong>Organização:</strong> {event.organizer}</p>}
          <p>💰 <strong>Custo:</strong> {event.price || "Gratuito"}</p>
        </div>
      </div>
      {event.link && (
        <a href={event.link} target="_blank" rel="noopener noreferrer" className="mt-4 block text-center bg-blue-600 text-white text-sm font-medium py-2 rounded-lg">
          Inscrição / Mais Info
        </a>
      )}
    </div>
  );
}

/* =========================
   COMPONENTE PRINCIPAL
========================= */
export default function MainV2() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ area: "Todas", type: "Todos" });

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(SHEET_CSV_URL);
        if (!res.ok) throw new Error("Erro de rede");
        const csvText = await res.text();
        const parsed = parseCSV(csvText);
        setEvents(parsed);
      } catch (err) {
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = useMemo(() => ["Todas", ...getUniqueValues(events, "area")], [events]);
  const types = useMemo(() => ["Todos", ...getUniqueValues(events, "type")], [events]);
  const filteredEvents = useMemo(() => applyFilters(events, { ...filters, search }), [events, filters, search]);

  if (loading) {
    return <div className="p-12 text-center text-gray-500 animate-pulse">🔬 A ler dados da MedLab...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <SearchBar value={search} onChange={setSearch} />
      <Filters categories={categories} types={types} active={filters} setActive={setFilters} />
      <h2 className="font-bold text-lg text-gray-800 mb-4">Calendário de Eventos ({filteredEvents.length})</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, i) => <EventCard key={i} event={event} />)
        ) : (
          <p className="text-gray-500 text-sm col-span-2 py-8 text-center bg-gray-50 rounded-xl border border-dashed">
            Nenhum evento ativo encontrado na Google Sheet. Garante que as linhas têm um título válido!
          </p>
        )}
      </div>
    </div>
  );
}
