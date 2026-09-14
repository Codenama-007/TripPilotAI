# TripPilot — Project Structure

## Repository Layout

```
TripPilotAI/
├── client-server/     # Next.js 16 frontend (deployed on Netlify)
└── models/            # FastAPI + LangGraph backend (deployed on Render)
```

These are two independently deployed services connected only via HTTP — the frontend calls the backend through `NEXT_PUBLIC_API_URL`.

---

## Frontend — `client-server/`

```
client-server/
├── app/
│   ├── page.tsx                      # Landing page ("/")
│   ├── layout.tsx                    # Root layout, wraps app in ClerkProvider
│   ├── sign-in/[[...sign-in]]/       # Clerk hosted sign-in page
│   ├── sign-up/[[...sign-up]]/       # Clerk hosted sign-up page
│   └── main/page.tsx                 # Authenticated app shell (sidebar + chat)
├── components/
│   ├── Navbar.tsx                    # Landing nav, Sign In / Sign Up buttons
│   ├── HeroSection.tsx               # Landing hero
│   ├── FeatureSection.tsx            # Landing features
│   ├── Footer.tsx                    # Landing footer
│   ├── AppSidebar.tsx                # Conversation list, New Chat, UserButton, Logout
│   ├── ChatComponent.tsx             # Chat window: message list + input + send
│   └── ui/                           # shadcn/ui primitives (button, input, sidebar, etc.)
├── lib/
│   ├── api.ts                        # All backend HTTP calls (single source of truth)
│   └── utils.ts                      # shadcn's `cn()` helper
├── proxy.ts                          # Route protection (Next.js 16's middleware.ts equivalent)
└── .env.local                        # NEXT_PUBLIC_API_URL, Clerk keys (not committed)
```

### Data flow: sending a chat message

```
ChatComponent.sendMessage()
  → lib/api.ts: sendChatMessage(message, threadId)
    → POST {NEXT_PUBLIC_API_URL}/chat
      → FastAPI backend (models/)
```

### Route protection

`proxy.ts` runs on every request and checks Clerk auth state:
- Signed-in user visiting `/` → redirected to `/main`
- Signed-out user visiting `/main` → redirected to sign-in
- `/`, `/sign-in`, `/sign-up` are the only public routes

---

## Backend — `models/`

```
models/
├── agents/                # One file per LangGraph node
│   ├── travel_planner_agent.py   # Extracts origin/destination/duration/mode/budget
│   ├── flight_agent.py
│   ├── train_agent.py
│   ├── hotel_agent.py
│   ├── destination_agent.py
│   ├── location_agent.py
│   ├── iternary_agent.py         # Drafts day-by-day plan
│   └── final_agent.py            # Produces final consolidated recommendation
├── tools/                 # External data-fetching functions, called by agents
│   ├── tavily_tool.py            # Generic web search (used by most tools below)
│   ├── flight_tool.py            # Flight search (via Tavily)
│   ├── train_tool.py             # Train search (via Tavily)
│   ├── destination_tool.py       # Destination research (via Tavily)
│   └── location_tool.py          # Hotel-area/attraction research (via Tavily)
├── state.py                # TravelState — shared schema passed between all agents
├── routers.py               # information_router, travel_mode_router (conditional edges)
├── llm.py                   # Single shared LLM instance (currently Groq)
├── graph.py                 # Builds and compiles the LangGraph StateGraph
├── main.py                  # FastAPI app — /chat, /conversations, /health endpoints
├── db.py                    # MongoDB Atlas connection (conversations + messages collections)
└── .env                     # MONGODB_URI, TAVILY_API_KEY, GROQ_API_KEY (not committed)
```

### Data flow: one chat turn

```
POST /chat {message, thread_id}
  → app_graph.stream(...)
    Travel Planner
      → (missing info?) → END, ask user
      → (complete?) → Travel Mode Router
                        → Flight Agent  or  Train Agent
                          → Hotel Agent
                            → Destination Agent
                              → Location Agent
                                → Iternary Agent
                                  → Final Agent
                                    → END
  → reply saved to MongoDB `messages` collection
  → conversation `updated_at` bumped, auto-titled on first message
  → { reply } returned to frontend
```

### Persistence

- **`conversations` collection** — one doc per chat thread: `thread_id`, `user_id`, `title`, `created_at`, `updated_at`.
- **`messages` collection** — one doc per turn: `thread_id`, `user_message`, `assistant_reply`, `created_at`.
- **LangGraph checkpointer** — separately persists each thread's internal `TravelState` (origin, destination, etc.) to MongoDB via `langgraph-checkpoint-mongodb`, so agent memory survives backend restarts.

### Adding a new agent (pattern to follow)

1. Create `agents/new_agent.py` — takes `state: TravelState`, returns a partial state update dict + an `AIMessage`.
2. Register it in `graph.py`: `graph.add_node("New Agent", new_agent)`.
3. Wire it into the edge chain with `graph.add_edge(...)` or `graph.add_conditional_edges(...)`.
4. If it needs external data, add a corresponding file in `tools/` rather than calling an API directly from the agent.
