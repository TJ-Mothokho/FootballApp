import { useState, useRef, useEffect, useCallback } from "react";
import Dashboard from "./pages/Dashboard";
import Competitions from "./pages/Competitions";
import Seasons from "./pages/Seasons";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Matches from "./pages/Matches";
import TeamMatchStats from "./pages/TeamMatchStats";
import PlayerMatchStats from "./pages/PlayerMatchStats";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { searchAll, fetchCompetitions, fetchSeasons } from "./services/api";
import { useQuery } from "./hooks/useApi";
import type { SearchResultDTO } from "./imports";

// The API has no notifications endpoint, so the panel intentionally remains empty rather than displaying fake activity.
const notifications: { id: string; text: string; time: string; read: boolean }[] = [];

type Page = "dashboard" | "competitions" | "seasons" | "teams" | "players" | "matches" | "match-detail" |
  "team-match-stats" | "player-match-stats" | "reports" | "settings";

const navItems: { id: Page | string; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "◻" },
  { id: "competitions", label: "Competitions", icon: "🏆" },
  { id: "seasons", label: "Seasons", icon: "📅" },
  { id: "teams", label: "Teams", icon: "🏟" },
  { id: "players", label: "Players", icon: "👤" },
  { id: "matches", label: "Matches", icon: "⚽" },
  { id: "team-match-stats", label: "Team Stats", icon: "📊" },
  { id: "player-match-stats", label: "Player Stats", icon: "📈" },
  { id: "reports", label: "Reports", icon: "📄" },
];

// Group SearchResultDTO[] by type
function groupSearchResults(results: SearchResultDTO[]) {
  const groups: Record<string, SearchResultDTO[]> = {};
  results.forEach(r => {
    const key = r.type ?? "Other";
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  });
  return Object.entries(groups);
}

function pageForType(type: string): Page {
  const map: Record<string, Page> = {
    Team: "teams", Player: "players", Match: "matches",
    Competition: "competitions", Season: "seasons",
  };
  return map[type] ?? "dashboard";
}

function SearchOverlay({ onClose, onNavigate }: { onClose: () => void; onNavigate: (page: string, id?: string) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultDTO[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null!);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const data = await searchAll(query);
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(timerRef.current);
  }, [query]);

  const grouped = groupSearchResults(results);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <span className="text-muted-foreground">🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search teams, players, matches…"
            className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground outline-none"
          />
          <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">ESC</kbd>
        </div>
        {searching && (
          <div className="px-4 py-4 text-xs text-muted-foreground">Searching…</div>
        )}
        {!searching && query.length > 1 && results.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">No results for "{query}"</div>
        )}
        {!searching && query.length <= 1 && (
          <div className="px-4 py-4 text-xs text-muted-foreground">Start typing to search across teams, players, matches, and competitions.</div>
        )}
        {grouped.map(([type, items]) => (
          <div key={type} className="py-1">
            <div className="px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{type}s</div>
            {items.slice(0, 5).map(item => (
              <button
                key={item.id}
                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                onClick={() => { onNavigate(pageForType(item.type), item.id); onClose(); }}
              >
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [competitionId, setCompetitionId] = useState("");
  const [seasonId, setSeasonId] = useState("");
  const competitions = useQuery(fetchCompetitions);
  const seasons = useQuery(fetchSeasons);
  const competition = (competitions.data ?? []).find(item => item.id === competitionId)?.name ?? "No competition selected";
  const season = (seasons.data ?? []).find(item => item.id === seasonId)?.name ?? "No season selected";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (!competitionId && competitions.data?.[0]) setCompetitionId(competitions.data[0].id);
  }, [competitionId, competitions.data]);

  useEffect(() => {
    if (!seasonId && seasons.data?.[0]) setSeasonId(seasons.data[0].id);
  }, [seasonId, seasons.data]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") { setSearchOpen(false); setNotifOpen(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const navigate = useCallback((p: string, id?: string) => {
    setPage(p as Page);
    setSelectedId(id);
  }, []);

  const unread = notifications.filter(n => !n.read).length;

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard onNavigate={navigate} />;
      case "competitions": return <Competitions onNavigate={navigate} />;
      case "seasons": return <Seasons onNavigate={navigate} />;
      case "teams": return <Teams onNavigate={navigate} />;
      case "players": return <Players onNavigate={navigate} selectedId={selectedId} />;
      case "matches": case "match-detail": return <Matches onNavigate={navigate} />;
      case "team-match-stats": return <TeamMatchStats onNavigate={navigate} initialMatchId={selectedId} />;
      case "player-match-stats": return <PlayerMatchStats onNavigate={navigate} initialMatchId={selectedId} />;
      case "reports": return <Reports />;
      case "settings": return <Settings darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />;
      default: return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} onNavigate={navigate} />}

      {/* Sidebar */}
      <aside
        className="flex flex-col bg-card border-r border-border transition-all duration-200 flex-shrink-0"
        style={{ width: sidebarCollapsed ? 56 : 220 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-3 py-3.5 border-b border-border min-h-[52px]">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">FI</div>
          {!sidebarCollapsed && (
            <div className="overflow-hidden">
              <span className="text-sm font-bold text-foreground font-display whitespace-nowrap">Football Intelligence</span>
            </div>
          )}
        </div>

        {/* Context pill */}
        {!sidebarCollapsed && (
          <div className="px-3 py-2 border-b border-border">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Context</p>
            <p className="text-xs font-semibold text-foreground">{competition}</p>
            <p className="text-xs text-primary font-mono">{season}</p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2 scrollbar-hide">
          {navItems.map(item => {
            const isActive = page === item.id || (item.id === "matches" && page === "match-detail");
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors rounded-md mx-1 my-0.5 ${
                  sidebarCollapsed ? "justify-center" : ""
                } ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                style={{ width: sidebarCollapsed ? 40 : "calc(100% - 8px)" }}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Settings + collapse */}
        <div className="border-t border-border py-2">
          <button
            onClick={() => navigate("settings")}
            title={sidebarCollapsed ? "Settings" : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-md mx-1 ${
              sidebarCollapsed ? "justify-center" : ""
            } ${page === "settings" ? "text-primary bg-primary/10" : ""}`}
            style={{ width: sidebarCollapsed ? 40 : "calc(100% - 8px)" }}
          >
            <span className="text-base">⚙</span>
            {!sidebarCollapsed && <span>Settings</span>}
          </button>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-md mx-1 ${sidebarCollapsed ? "justify-center" : ""}`}
            style={{ width: sidebarCollapsed ? 40 : "calc(100% - 8px)" }}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span>{sidebarCollapsed ? "→" : "←"}</span>
            {!sidebarCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-[52px] border-b border-border bg-card flex items-center gap-3 px-4 flex-shrink-0">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-muted-foreground text-sm hover:text-foreground transition-colors flex-1 max-w-xs"
          >
            <span>🔍</span>
            <span className="text-xs">Search…</span>
            <kbd className="ml-auto text-[10px] bg-background border border-border px-1 rounded font-mono">⌘K</kbd>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <select
              value={competitionId}
              onChange={e => setCompetitionId(e.target.value)}
              disabled={competitions.loading}
              className="text-xs bg-muted border border-border rounded-md px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-60"
            >
              {(competitions.data ?? []).length === 0 && <option value="">No competitions</option>}
              {(competitions.data ?? []).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
            <select
              value={seasonId}
              onChange={e => setSeasonId(e.target.value)}
              disabled={seasons.loading}
              className="text-xs bg-muted border border-border rounded-md px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono disabled:opacity-60"
            >
              {(seasons.data ?? []).length === 0 && <option value="">No seasons</option>}
              {(seasons.data ?? []).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Toggle dark mode"
            >
              {darkMode ? "☀" : "◑"}
            </button>

            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative"
              >
                🔔
                {unread > 0 && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-10 w-72 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
                  <div className="px-3 py-2 border-b border-border text-xs font-semibold text-foreground">Notifications</div>
                  {notifications.length === 0 ? <p className="px-3 py-5 text-center text-xs text-muted-foreground">No notifications available.</p> : notifications.map(n => (
                    <div key={n.id} className={`px-3 py-2.5 border-b border-border last:border-0 ${!n.read ? "bg-accent/30" : ""}`}>
                      <p className="text-xs text-foreground">{n.text}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold cursor-pointer">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-5 py-5">
            {page === "dashboard" && (
              <div className="mb-5">
                <h1 className="text-xl font-bold text-foreground font-display">Football Intelligence</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm text-muted-foreground">{competition}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-sm font-mono text-primary font-medium">{season}</span>
                </div>
              </div>
            )}
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}
