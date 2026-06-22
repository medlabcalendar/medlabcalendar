import React, { useEffect, useMemo, useState } from "react";

/**
 * main-v2.jsx
 * Plataforma CMS dinâmica baseada em Google Sheets
 * Sem categorias fixas — tudo vem do Sheets
 */

/* =========================
   GOOGLE SHEETS FETCH
========================= */

async function fetchEventsFromSheets() {
  const res = await fetch("https://YOUR_GOOGLE_SHEETS_ENDPOINT_HERE");

  if (!res.ok) {
    throw new Error("Erro ao carregar Google Sheets");
  }

  return await res.json();
}

/* =========================
   PARSER (normalização leve)
========================= */

function parseEvents(data) {
  return data.map((item) => ({
    title: item.title?.trim(),
    area: item.area?.trim(),
    type: item.type?.trim(),
    modality: item.modality?.trim(),
    date: item.date,
    featured: item.featured === "Sim" || item.featured === true,
    status: item.status || "Ativo",
    image: item.image,
    price: item.price,
    tags: item.tags
      ? item.tags.split(",").map((t) => t.trim().toLowerCase())
      : [],
  }));
}

/* =========================
   HELPERS
========================= */

function getUniqueValues(events, key) {
  return [...new Set(events.map((e) => e[key]).filter(Boolean))].sort();
}

function applyFilters(events, { area, type, modality, search }) {
  return events
    .filter((event) => {
      const matchArea = area === "Todas" || event.area === area;
      const matchType = type === "Todos" || event.type === type;
      const matchModality =
        modality === "Todas" || event.modality === modality;

      const matchSearch =
        !search ||
        event.title?.toLowerCase().includes(search.toLowerCase()) ||
        event.area?.toLowerCase().includes(search.toLowerCase()) ||
        event.type?.toLowerCase().includes(search.toLowerCase()) ||
        event.tags?.some((t) => t.includes(search.toLowerCase()));

      const isActive = event.status !== "Inativo";

      return matchArea && matchType && matchModality && matchSearch && isActive;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

function getFeatured(events) {
  return events.filter((e) => e.featured && e.status !== "Inativo");
}

/* =========================
   UI COMPONENTS
========================= */

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Pesquisar eventos..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 w-full mb-4"
    />
  );
}

function Filters({ categories, types, modalities, active, setActive }) {
  return (
    <div className="space-y-2 mb-6">

      {/* ÁREA */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive((p) => ({ ...p, area: c }))}
            className={`px-3 py-1 border rounded ${
              active.area === c ? "bg-black text-white" : ""
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* TIPO */}
      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActive((p) => ({ ...p, type: t }))}
            className={`px-3 py-1 border rounded ${
              active.type === t ? "bg-black text-white" : ""
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* MODALIDADE */}
      <div className="flex flex-wrap gap-2">
        {modalities.map((m) => (
          <button
            key={m}
            onClick={() => setActive((p) => ({ ...p, modality: m }))}
            className={`px-3 py-1 border rounded ${
              active.modality === m ? "bg-black text-white" : ""
            }`}
          >
            {m}
          </button>
        ))}
      </div>

    </div>
  );
}

function EventCard({ event, featured }) {
  return (
    <div
      className={`border p-4 rounded ${
        featured ? "border-yellow-400" : ""
      }`}
    >
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-40 object-cover mb-2 rounded"
        />
      )}

      <h3 className="font-bold">{event.title}</h3>

      <p className="text-sm opacity-70">
        {event.area} • {event.type} • {event.modality}
      </p>

      <p className="text-sm mt-1">📅 {event.date}</p>

      {event.price && (
        <p className="text-sm mt-1">💰 {event.price}</p>
      )}
    </div>
  );
}

function FeaturedSection({ events }) {
  if (!events.length) return null;

  return (
    <div className="mb-8">
      <h2 className="font-bold mb-2">⭐ Destaques</h2>

      <div className="grid gap-3">
        {events.map((event, i) => (
          <EventCard key={i} event={event} featured />
        ))}
      </div>
    </div>
  );
}

/* =========================
   MAIN COMPONENT
========================= */

export default function MainV2() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    area: "Todas",
    type: "Todos",
    modality: "Todas",
  });

  /* LOAD DATA */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const data = await fetchEventsFromSheets();
        const parsed = parseEvents(data);

        setEvents(parsed);
      } catch (err) {
        console.error("Erro ao carregar eventos:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  /* FILTER OPTIONS (100% dinâmico) */
  const categories = useMemo(
    () => ["Todas", ...getUniqueValues(events, "area")],
    [events]
  );

  const types = useMemo(
    () => ["Todos", ...getUniqueValues(events, "type")],
    [events]
  );

  const modalities = useMemo(
    () => ["Todas", ...getUniqueValues(events, "modality")],
    [events]
  );

  /* FILTERED EVENTS */
  const filteredEvents = useMemo(() => {
    return applyFilters(events, { ...filters, search });
  }, [events, filters, search]);

  /* FEATURED */
  const featured = useMemo(() => {
    return getFeatured(events);
  }, [events]);

  if (loading) {
    return <div className="p-6">A carregar eventos...</div>;
  }

  return (
    <div className="p-6">

      {/* SEARCH */}
      <SearchBar value={search} onChange={setSearch} />

      {/* FILTERS */}
      <Filters
        categories={categories}
        types={types}
        modalities={modalities}
        active={filters}
        setActive={setFilters}
      />

      {/* FEATURED */}
      <FeaturedSection events={featured} />

      {/* EVENTS */}
      <div className="grid gap-3">
        {filteredEvents.map((event, i) => (
          <EventCard key={i} event={event} />
        ))}
      </div>
    </div>
  );
}
