import dailyUtterances from '../src/daily-utterances.json';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const knownEvents = new Set([
  'session_started', 'utterance_shown', 'daily_utterance_shown', 'daily_utterance_deferred',
  'detail_opened', 'external_link_click', 'sulky_shown', 'sulky_check',
  'manual_location_changed', 'return_guidance_started', 'return_warning_shown',
  'train_changed', 'station_returned', 'session_finished', 'gps_fix', 'gps_error',
  'shared_area_entered', 'shared_area_exited', 'shared_area_utterance_due',
  'exploration_area_enter', 'exploration_area_exit', 'exploration_start',
  'spot_discovered', 'spot_utterance_shown', 'debug_manual',
]);

type Payload = Record<string, any>;

function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
}

function supabaseConfig() {
  const baseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!baseUrl || !serviceKey) return null;
  return {
    baseUrl: `${baseUrl}/rest/v1`,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
    },
  };
}

async function dbRequest(path: string, init: RequestInit = {}, ignoreConflict = false) {
  const config = supabaseConfig();
  if (!config) throw new Error('Supabase is not configured');
  const response = await fetch(`${config.baseUrl}/${path}`, {
    ...init,
    headers: { ...config.headers, ...init.headers },
    cache: 'no-store',
  });
  if (ignoreConflict && response.status === 409) return response;
  if (!response.ok) {
    const details = await response.text();
    console.error('Supabase request failed', response.status, details);
    throw new Error('Database request failed');
  }
  return response;
}

function csvCell(value: unknown) {
  const text = typeof value === 'string' ? value : value == null ? '' : JSON.stringify(value);
  return `"${text.replaceAll('"', '""')}"`;
}

async function getAdminCsv(request: Request) {
  const token = process.env.ADMIN_TOKEN;
  const requestedToken = new URL(request.url).searchParams.get('token');
  if (!token || requestedToken !== token) return new Response('Not found', { status: 404 });
  const rows: Payload[] = [];
  for (let offset = 0; ; offset += 1000) {
    const response = await dbRequest(
      `event_logs?select=*&order=id.asc&limit=1000&offset=${offset}`,
    );
    const batch = await response.json() as Payload[];
    rows.push(...batch);
    if (batch.length < 1000) break;
  }
  const headers = rows.length
    ? Object.keys(rows[0])
    : ['id', 'visitor_id', 'session_id', 'event_type', 'timestamp'];
  const csv = [
    headers.map(csvCell).join(','),
    ...rows.map(row => headers.map(header => csvCell(row[header])).join(',')),
  ].join('\r\n');
  return new Response(`\uFEFF${csv}\r\n`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="ooe-events.csv"',
      'Cache-Control': 'no-store',
    },
  });
}

export async function GET(request: Request) {
  const pathname = new URL(request.url).pathname;
  if (pathname === '/api/health') {
    const now = new Date();
    const tourDate = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(now);
    return json({ ok: true, server_time: now.toISOString(), tour_date: tourDate });
  }
  if (pathname === '/api/daily-utterances') {
    return json(dailyUtterances.filter(item => item.enabled));
  }
  if (pathname === '/api/admin/events.csv') {
    try {
      return await getAdminCsv(request);
    } catch {
      return json({ error: 'Event export is unavailable.' }, 503);
    }
  }
  return json({ error: 'Not found' }, 404);
}

export async function POST(request: Request) {
  const pathname = new URL(request.url).pathname;
  if (pathname !== '/api/sessions' && pathname !== '/api/events') {
    return json({ error: 'Not found' }, 404);
  }

  let body: Payload;
  try {
    body = await request.json() as Payload;
  } catch {
    return json({ error: 'A valid JSON body is required.' }, 400);
  }

  if (!uuidPattern.test(body?.session_id || '') || !uuidPattern.test(body?.visitor_id || '')) {
    return json({ error: 'Valid visitor_id and session_id are required.' }, 400);
  }

  try {
    const query = new URLSearchParams({
      select: 'visitor_id',
      session_id: `eq.${body.session_id}`,
      limit: '1',
    });
    const ownerResponse = await dbRequest(`sessions?${query}`);
    const owners = await ownerResponse.json() as Array<{ visitor_id: string | null }>;
    const owner = owners[0];
    if (owner?.visitor_id && owner.visitor_id !== body.visitor_id) {
      return json({ error: 'This visitor does not own the session.' }, 403);
    }

    if (pathname === '/api/sessions') {
      if (!body.route_id) return json({ error: 'route_id is required.' }, 400);
      if (!owner) {
        await dbRequest('sessions?on_conflict=session_id', {
          method: 'POST',
          headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
          body: JSON.stringify({
            session_id: body.session_id,
            visitor_id: body.visitor_id,
            route_id: body.route_id,
            train_time: body.train_time ?? null,
            train_direction: body.train_direction ?? null,
            started_at: body.started_at ?? new Date().toISOString(),
            status: 'active',
          }),
        });
      } else if (!owner.visitor_id) {
        await dbRequest(`sessions?session_id=eq.${encodeURIComponent(body.session_id)}&visitor_id=is.null`, {
          method: 'PATCH',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify({ visitor_id: body.visitor_id }),
        });
      }
      return json({ ok: true });
    }

    if (!body.event_type) return json({ error: 'event_type is required.' }, 400);
    if (!knownEvents.has(body.event_type)) return json({ error: 'Unsupported event_type.' }, 400);
    if (owner && !owner.visitor_id) {
      await dbRequest(`sessions?session_id=eq.${encodeURIComponent(body.session_id)}&visitor_id=is.null`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ visitor_id: body.visitor_id }),
      });
    }
    const timestamp = body.timestamp || body.clicked_at || new Date().toISOString();
    await dbRequest('event_logs', {
      method: 'POST',
      headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
      body: JSON.stringify({
        visitor_id: body.visitor_id,
        session_id: body.session_id,
        event_type: body.event_type,
        timestamp,
        spot_id: body.spot_id ?? null,
        topic_id: body.topic_id ?? null,
        emotion: body.emotion ?? null,
        utterance_id: body.utterance_id ?? body.daily_utterance_id ?? null,
        candidate_emotions: body.candidate_emotions ?? [],
        selection_weights: body.selection_weights ?? {},
        notification_played: body.notification_played == null ? null : Boolean(body.notification_played),
        arrival_method: body.arrival_method ?? null,
        payload: body,
      }),
    }, true);

    if (body.event_type === 'train_changed') {
      await dbRequest(`sessions?session_id=eq.${encodeURIComponent(body.session_id)}&visitor_id=eq.${encodeURIComponent(body.visitor_id)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({
          train_time: body.new_train ?? null,
          train_direction: body.train_direction ?? null,
        }),
      });
    }
    if (body.event_type === 'session_finished') {
      await dbRequest(`sessions?session_id=eq.${encodeURIComponent(body.session_id)}&visitor_id=eq.${encodeURIComponent(body.visitor_id)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ status: 'ended', finished_at: body.finished_at ?? timestamp }),
      });
    }
    return json({ ok: true });
  } catch {
    return json({ error: 'The database is unavailable or not configured.' }, 503);
  }
}

export async function PUT() {
  return json({ error: 'Method not allowed.' }, 405);
}

export async function DELETE() {
  return json({ error: 'Method not allowed.' }, 405);
}
