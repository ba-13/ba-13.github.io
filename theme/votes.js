// Talks to Supabase over plain fetch. Nothing is stored on the visitor's device
// until they click, and the page never contacts Supabase before the button scrolls into view.

const SESSION_KEY = "vote-session";
const EXPIRY_MARGIN_SECONDS = 60;

const button = document.querySelector(".vote");
const label = button.querySelector(".vote-count");
const { url, key, slug } = button.dataset;

let count = 0;
let voted = false;

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function saveSession(session) {
  try {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  } catch {}
  return session;
}

async function auth(path, body) {
  const response = await fetch(`${url}/auth/v1/${path}`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Auth failed: ${response.status}`);
  const { access_token, refresh_token, expires_in } = await response.json();
  return saveSession({
    access_token,
    refresh_token,
    expires_at: Date.now() / 1000 + expires_in,
  });
}

async function currentSession() {
  const session = loadSession();
  if (!session) return null;
  if (session.expires_at > Date.now() / 1000 + EXPIRY_MARGIN_SECONDS) return session;
  try {
    return await auth("token?grant_type=refresh_token", {
      refresh_token: session.refresh_token,
    });
  } catch {
    return saveSession(null);
  }
}

async function rest(path, options = {}, session = null) {
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      "Content-Type": "application/json",
      ...(session && { Authorization: `Bearer ${session.access_token}` }),
      ...options.headers,
    },
  });
  // 409 means this guest already voted, which is the state we wanted
  if (!response.ok && response.status !== 409) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response;
}

const votesPath = `votes?post_slug=eq.${encodeURIComponent(slug)}`;

function render() {
  label.textContent = count;
  button.setAttribute("aria-pressed", voted);
}

async function load() {
  const response = await rest("rpc/vote_count", {
    method: "POST",
    body: JSON.stringify({ slug }),
  });
  count = await response.json();
  const session = await currentSession();
  if (session) {
    const own = await rest(`${votesPath}&select=post_slug`, {}, session);
    voted = (await own.json()).length > 0;
  }
  render();
  button.classList.add("ready");
}

async function toggle() {
  const wasVoted = voted;
  voted = !wasVoted;
  count += wasVoted ? -1 : 1;
  button.disabled = true;
  button.title = "";
  render();
  try {
    const session = (await currentSession()) ?? (await auth("signup", {}));
    if (wasVoted) {
      await rest(votesPath, { method: "DELETE" }, session);
    } else {
      await rest(
        "votes",
        {
          method: "POST",
          headers: { Prefer: "return=minimal" },
          body: JSON.stringify({ post_slug: slug }),
        },
        session,
      );
    }
  } catch {
    voted = wasVoted;
    count += wasVoted ? 1 : -1;
    button.title = "Couldn't save your vote, please try again";
    render();
  }
  button.disabled = false;
}

button.addEventListener("click", toggle);

new IntersectionObserver((entries, observer) => {
  if (!entries.some((entry) => entry.isIntersecting)) return;
  observer.disconnect();
  // If Supabase is down or paused the button simply stays hidden
  load().catch(() => {});
}).observe(button);
