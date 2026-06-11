-- MedLabCalendar: adicionar formação IFCC
-- Ficheiro SQL para aplicar na base de dados PostgreSQL usada pelo site.
-- Fonte: captura de ecrã WorkCast/IFCC fornecida pela utilizadora.
-- Nota de horário: 13:00 CEST = 12:00 em Portugal continental/WEST = 11:00 UTC.
-- Duração assumida: 1 hora. Ajustar endTime se necessário.

BEGIN;

WITH
creator AS (
  INSERT INTO "Account" ("id", "email", "name")
  VALUES (
    '11111111-1111-4111-8111-111111111111',
    'sousa.madalenag@gmail.com',
    'Madalena Sousa'
  )
  ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name"
  RETURNING "id"
),
category AS (
  INSERT INTO "Category" ("id", "title")
  VALUES (
    '22222222-2222-4222-8222-222222222222',
    'Webinar'
  )
  ON CONFLICT ("title") DO UPDATE SET "title" = EXCLUDED."title"
  RETURNING "id"
),
location AS (
  INSERT INTO "Location" ("id", "title", "roomId", "maxSeating")
  VALUES (
    '33333333-3333-4333-8333-333333333333',
    'Online',
    NULL,
    NULL
  )
  ON CONFLICT ("title") DO UPDATE SET "title" = EXCLUDED."title"
  RETURNING "id"
)
INSERT INTO "Event" (
  "id",
  "creatorId",
  "title",
  "categoryId",
  "locationId",
  "startTime",
  "endTime",
  "allDay",
  "exclusivity",
  "minAttendence",
  "maxAttendence",
  "minAge",
  "description",
  "specialNotes",
  "reqMaterials",
  "pending",
  "approved",
  "discordEventId",
  "googleCalendarEventId"
)
SELECT
  '44444444-4444-4444-8444-444444444444',
  creator."id",
  'Laboratory investigation of sudden death',
  category."id",
  location."id",
  '2026-06-12T11:00:00.000Z'::timestamptz,
  '2026-06-12T12:00:00.000Z'::timestamptz,
  FALSE,
  0,
  0,
  1000,
  NULL,
  'IFCC Webinars Live Series 2026. Webinar sobre investigação laboratorial da morte súbita, incluindo genómica da morte súbita cardíaca, doenças arritmogénicas e integração de métodos modernos de diagnóstico. Entidade: IFCC - International Federation of Clinical Chemistry and Laboratory Medicine. Patrocinado por Siemens Healthineers e Boston Children''s Hospital.',
  'Inscrição: https://workcast.com/register?cpak=3567192543128456 | Data apresentada: June 12, 2026; EDT 7:00 AM, CEST 1:00 PM, CST 7:00 PM.',
  NULL,
  FALSE,
  TRUE,
  NULL,
  NULL
FROM creator, category, location
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "startTime" = EXCLUDED."startTime",
  "endTime" = EXCLUDED."endTime",
  "description" = EXCLUDED."description",
  "specialNotes" = EXCLUDED."specialNotes",
  "pending" = EXCLUDED."pending",
  "approved" = EXCLUDED."approved";

COMMIT;
