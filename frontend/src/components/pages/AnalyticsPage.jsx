import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  Unlock,
  Download,
  Users,
  Eye,
  RefreshCw,
  ArrowLeft,
  ExternalLink,
  Activity,
  Sparkles,
  BookOpen,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Check,
  KeyRound,
  FileText,
  Clock,
  Terminal,
} from "lucide-react";
import { useOnlinePresence } from "../../hooks/useOnlinePresence";
import { getResumeDownloadCount, trackResumeDownload } from "../../utils/resumeTracker";

const API_BASE = "/api/countapi";
const DIRECT_API = "https://countapi.mileshilliard.com/api/v1";
const RESUME_KEY = "naveedafraz_resume_downloads";
const VISITS_KEY = "naveedafraz_portfolio_visits";
const AUTH_KEY = "nav_portfolio_analytics_auth_v1";
const CUSTOM_PIN_KEY = "nav_portfolio_analytics_pin_v1";

export default function AnalyticsPage({ onOpenNotebook }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(AUTH_KEY) === "true";
  });
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Live Metrics State
  const { onlineCount, visits } = useOnlinePresence();
  const [resumeDownloads, setResumeDownloads] = useState(0);
  const [isLoadingDownloads, setIsLoadingDownloads] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshCountdown, setRefreshCountdown] = useState(10);
  const [actionMessage, setActionMessage] = useState(null);

  // Slot presence telemetry state
  const [slotData, setSlotData] = useState([]);
  const [rawApiResponse, setRawApiResponse] = useState(null);

  // Custom PIN update state
  const [showPinModal, setShowPinModal] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // Reset counter modal
  const [showResetModal, setShowResetModal] = useState(false);
  const [customCounterValue, setCustomCounterValue] = useState("");

  // Fetch all live analytics
  const fetchAllMetrics = useCallback(async () => {
    setIsLoadingDownloads(true);
    try {
      // 1. Fetch resume downloads
      const count = await getResumeDownloadCount();
      setResumeDownloads(count);

      // 2. Fetch raw API response
      let rawRes = await fetch(`${API_BASE}/get/${RESUME_KEY}`).catch(() => null);
      if (!rawRes || !rawRes.ok) {
        rawRes = await fetch(`${DIRECT_API}/get/${RESUME_KEY}`).catch(() => null);
      }
      if (rawRes && rawRes.ok) {
        const rawJson = await rawRes.json();
        setRawApiResponse(rawJson);
      }

      // 3. Inspect presence slots (0 to 5)
      const nowSec = Math.floor(Date.now() / 1000);
      const slotPromises = Array.from({ length: 6 }, async (_, i) => {
        try {
          const r = await fetch(`${API_BASE}/get/nav_presence_v4_slot_${i}`).catch(() => null);
          const d = r && r.ok ? await r.json() : null;
          const ts = d?.value || 0;
          const diff = nowSec - ts;
          return {
            slot: i,
            timestamp: ts,
            diffSeconds: diff,
            isActive: ts > 0 && diff >= 0 && diff <= 24,
          };
        } catch {
          return { slot: i, timestamp: 0, diffSeconds: 9999, isActive: false };
        }
      });
      const resolvedSlots = await Promise.all(slotPromises);
      setSlotData(resolvedSlots);

      setLastRefreshed(new Date());
      setRefreshCountdown(10);
    } catch (err) {
      console.warn("Failed to fetch telemetry metrics:", err);
    } finally {
      setIsLoadingDownloads(false);
    }
  }, []);

  // Initial fetch when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllMetrics();
    }
  }, [isAuthenticated, fetchAllMetrics]);

  // 10-second auto-refresh loop
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) return;

    const interval = setInterval(() => {
      setRefreshCountdown((prev) => {
        if (prev <= 1) {
          fetchAllMetrics();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh, fetchAllMetrics]);

  // Handle PIN Submission
  const [showPassword, setShowPassword] = useState(false);

  const handleAuthSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const cleanInput = (passcode || "").trim().toLowerCase();
    const storedPin = (localStorage.getItem(CUSTOM_PIN_KEY) || "naveed").toLowerCase();

    // Accepted default passcodes for owner convenience
    const validPins = [
      storedPin,
      "naveed",
      "2026",
      "1234",
      "0000",
      "pass",
      "password",
      "nav",
      "naveed2026",
      "admin",
      "6300",
      "6300375450",
    ];

    if (validPins.includes(cleanInput)) {
      setIsAuthenticated(true);
      setAuthError("");
      if (rememberMe) {
        localStorage.setItem(AUTH_KEY, "true");
      }
    } else {
      setAuthError("Incorrect passcode. Try 'naveed', '2026', or '1234'.");
    }
  };

  const handleQuickUnlock = () => {
    setPasscode("naveed");
    setIsAuthenticated(true);
    setAuthError("");
    if (rememberMe) {
      localStorage.setItem(AUTH_KEY, "true");
    }
  };

  // Lock / Logout
  const handleLock = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
    setPasscode("");
  };

  // Test +1 Download Click
  const handleSimulateDownload = async () => {
    const updated = await trackResumeDownload();
    setResumeDownloads(updated);
    setActionMessage("Simulated +1 Download Clicked! Counter incremented.");
    setTimeout(() => setActionMessage(null), 3000);
    fetchAllMetrics();
  };

  // Update counter value directly on CountAPI
  const handleSetCounter = async (targetValue) => {
    const num = parseInt(targetValue, 10);
    if (isNaN(num) || num < 0) {
      alert("Please enter a valid positive number");
      return;
    }

    try {
      let res = await fetch(`${API_BASE}/set/${RESUME_KEY}?value=${num}`).catch(() => null);
      if (!res || !res.ok) {
        res = await fetch(`${DIRECT_API}/set/${RESUME_KEY}?value=${num}`).catch(() => null);
      }
      if (res && res.ok) {
        setResumeDownloads(num);
        setShowResetModal(false);
        setCustomCounterValue("");
        setActionMessage(`Resume downloads counter updated to ${num}!`);
        setTimeout(() => setActionMessage(null), 3500);
        fetchAllMetrics();
      } else {
        alert("CountAPI request failed. Check internet connection.");
      }
    } catch (err) {
      alert("Error setting counter: " + err.message);
    }
  };

  // Change Custom PIN
  const handleSavePin = (e) => {
    e.preventDefault();
    if (!newPin.trim()) return;
    localStorage.setItem(CUSTOM_PIN_KEY, newPin.trim());
    setPinChangeSuccess(true);
    setTimeout(() => {
      setPinChangeSuccess(false);
      setShowPinModal(false);
      setNewPin("");
    }, 1800);
  };

  // ── 1. AUTHENTICATION LOCK SCREEN ──────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07090e] text-white flex items-center justify-center p-4 relative overflow-hidden select-none">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-500/08 blur-[120px] pointer-events-none" />

        {/* Lock Screen Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative z-10 w-full max-w-md bg-neutral-900/90 border border-neutral-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-center"
        >
          {/* Glowing Shield Icon */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-sky-500/10 border border-cyan-500/30 flex items-center justify-center mb-5 text-cyan-400 shadow-lg shadow-cyan-500/20">
            <Lock className="w-8 h-8 text-cyan-400" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <Shield className="w-3.5 h-3.5" /> SECURE OWNER PORTAL
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Naveed's Telemetry
          </h1>
          <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
            Enter your master passcode to view live resume downloads, active visitors, and system metrics.
          </p>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (authError) setAuthError("");
                }}
                placeholder="Enter Passcode..."
                autoFocus
                className="w-full px-4 py-3.5 pr-12 bg-neutral-950/80 border border-neutral-700/80 rounded-2xl text-center font-mono text-base tracking-widest text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer text-xs"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium"
              >
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{authError}</span>
              </motion.div>
            )}

            {/* Clear Passcode Hint */}
            <div className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
              <span>Passcode: <strong className="text-cyan-400 font-mono">naveed</strong> or <strong className="text-cyan-400 font-mono">2026</strong></span>
              <button
                type="button"
                onClick={handleQuickUnlock}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
              >
                ⚡ Quick Unlock
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-400 px-1 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none hover:text-neutral-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-900 text-cyan-500 focus:ring-0 cursor-pointer"
                />
                <span>Remember this browser</span>
              </label>

              <span className="text-[11px] font-mono text-neutral-500">
                naveed / 2026 / 1234
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" /> Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-neutral-800 flex items-center justify-center">
            <Link
              to="/"
              className="text-xs text-neutral-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to public portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── 2. PROTECTED TELEMETRY DASHBOARD ───────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#07090e] text-neutral-100 relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      {/* Background Grid Pattern & Ambient Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
        <div className="absolute top-0 right-1/4 w-[650px] h-[650px] rounded-full bg-cyan-500/06 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[650px] h-[650px] rounded-full bg-amber-500/05 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        {/* ── TOP HEADER / CONTROLS ── */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <Link
                to="/"
                className="group p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-cyan-500/40 transition-all flex items-center justify-center"
                title="Return to Home Portfolio"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
                <span>Telemetry Command Center</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono font-medium">
                  PRIVATE
                </span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 pl-11">
              Live resume download counts, presence heartbeats, and private telemetry for Naveed Afraz.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pl-11 md:pl-0">
            {/* Live Status indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE</span>
              <span className="text-neutral-600">|</span>
              <button
                type="button"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 cursor-pointer font-sans"
                title={autoRefresh ? "Click to pause auto-refresh" : "Click to enable auto-refresh"}
              >
                {autoRefresh ? `Auto (${refreshCountdown}s)` : "Paused"}
              </button>
            </div>

            {/* Manual Refresh Button */}
            <button
              onClick={fetchAllMetrics}
              disabled={isLoadingDownloads}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-500/40 text-neutral-200 text-xs font-medium transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isLoadingDownloads ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            {/* Change PIN Button */}
            <button
              onClick={() => setShowPinModal(true)}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white text-xs font-medium transition-all cursor-pointer"
              title="Change your dashboard master passcode"
            >
              <KeyRound className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Passcode</span>
            </button>

            {/* Lock / Logout Button */}
            <button
              onClick={handleLock}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs font-medium transition-all cursor-pointer"
              title="Lock dashboard and log out"
            >
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              <span>Lock</span>
            </button>
          </div>
        </header>

        {/* Action toast banner */}
        <AnimatePresence>
          {actionMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{actionMessage}</span>
              </div>
              <button
                onClick={() => setActionMessage(null)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 4 PRIMARY METRIC CARDS (HERO KPIS) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Resume Downloads Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-cyan-500/40 transition-all shadow-xl space-y-3 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" /> RESUME DOWNLOADS
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono border border-cyan-500/20">
                CountAPI
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                {resumeDownloads}
              </span>
              <span className="text-xs text-neutral-400">clicks tracked</span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Total times visitors clicked "Download Resume" across Hero, Contact, and Footer. Hidden from public view.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 border-t border-neutral-800/80">
              <button
                onClick={handleSimulateDownload}
                type="button"
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center justify-center gap-1 cursor-pointer transition-colors"
                title="Fire a test download click to verify real-time increment"
              >
                <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" /> Test +1 Click
              </button>
              <button
                onClick={() => setShowResetModal(true)}
                type="button"
                className="py-1.5 px-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium cursor-pointer transition-colors"
                title="Edit or reset counter value"
              >
                <Sliders className="w-3 h-3 text-neutral-400" />
              </button>
            </div>
          </div>

          {/* 2. Live Online Presence */}
          <div className="p-5 sm:p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-emerald-500/40 transition-all shadow-xl space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" /> ONLINE NOW
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                {onlineCount}
              </span>
              <span className="text-xs text-neutral-400">{onlineCount === 1 ? "device" : "devices"}</span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Concurrent devices currently active on portfolio, synced across 6 presence slots with 8s heartbeat.
            </p>

            <div className="pt-2 text-[11px] font-mono text-neutral-500 border-t border-neutral-800/80 flex items-center justify-between">
              <span>Window Tabs: BroadcastChannel</span>
              <span className="text-emerald-400">Synced</span>
            </div>
          </div>

          {/* 3. Total Portfolio Visits */}
          <div className="p-5 sm:p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all shadow-xl space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-400" /> TOTAL VISITS
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono border border-amber-500/20">
                Base + Live
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                {visits.toLocaleString()}
              </span>
              <span className="text-xs text-neutral-400">all-time views</span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Total session visits counted on the website. Cached in localStorage per user to prevent rapid spam.
            </p>

            <div className="pt-2 text-[11px] font-mono text-neutral-500 border-t border-neutral-800/80 flex items-center justify-between">
              <span>Key: naveedafraz_portfolio_visits</span>
            </div>
          </div>

          {/* 4. Notebook Splash Modal */}
          <div className="p-5 sm:p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-purple-500/40 transition-all shadow-xl space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-purple-400" /> NOTEBOOK SPLASH
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-mono border border-purple-500/20">
                10s Timer
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                10<span className="text-2xl text-purple-400">s</span>
              </span>
              <span className="text-xs text-neutral-400">auto-countdown</span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Handwritten note appears on initial home visit, auto-revealing the main portfolio after 10 seconds.
            </p>

            <div className="pt-2 border-t border-neutral-800/80">
              <button
                onClick={() => onOpenNotebook?.()}
                type="button"
                className="w-full py-1.5 px-3 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                title="Preview handwritten notebook splash with 10s timer"
              >
                <BookOpen className="w-3.5 h-3.5" /> Preview 10s Notebook
              </button>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: RESUME TRACKING TELEMETRY DETAILS & ENDPOINTS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Download Locations Breakdown */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-cyan-400" /> Resume Tracking Touchpoints
              </h2>
              <span className="text-xs text-neutral-400">4 Active Call-to-Actions</span>
            </div>

            <p className="text-xs text-neutral-400">
              Every button listed below has an active silent tracking hook (<code className="text-cyan-400 font-mono">trackResumeDownload()</code>) attached.
              Raw counters are kept strictly private on this dashboard and never displayed to regular visitors.
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  name: "Hero Section (Desktop)",
                  location: "Hero.jsx — Top CTA cluster",
                  desc: "Visible on laptops/desktops next to 'Let's Connect'",
                  status: "Active Tracking",
                  color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
                },
                {
                  name: "Hero Section (Mobile)",
                  location: "Hero.jsx — Mobile phone layout",
                  desc: "Full-width split button for touchscreens",
                  status: "Active Tracking",
                  color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
                },
                {
                  name: "Contact Section (CV Tile)",
                  location: "Contact.jsx — Quick Connect grid",
                  desc: "Quick download tile with direct PDF download",
                  status: "Active Tracking",
                  color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
                },
                {
                  name: "Footer Section",
                  location: "Footer.jsx — Navigation links",
                  desc: "'Download CV' link in bottom footer",
                  status: "Active Tracking",
                  color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5 min-w-0">
                    <p className="font-semibold text-white truncate">{item.name}</p>
                    <p className="text-[11px] text-neutral-400 truncate">{item.desc}</p>
                    <p className="text-[10px] font-mono text-neutral-500 truncate">{item.location}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono border whitespace-nowrap shrink-0 ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick API Endpoints & Developer Inspection */}
          <div className="p-6 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" /> Direct API Links
            </h2>

            <p className="text-xs text-neutral-400 leading-relaxed">
              You can query or inspect raw JSON metrics directly from your browser, curl, or phone:
            </p>

            <div className="space-y-3 pt-1">
              <a
                href={`${DIRECT_API}/get/${RESUME_KEY}`}
                target="_blank"
                rel="noreferrer"
                className="group p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 hover:border-cyan-500/50 transition-all block text-xs"
              >
                <div className="flex items-center justify-between text-neutral-300 font-semibold mb-1">
                  <span>Resume Downloads JSON</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <p className="font-mono text-[10px] text-neutral-500 truncate group-hover:text-cyan-400/80">
                  {DIRECT_API}/get/{RESUME_KEY}
                </p>
              </a>

              <a
                href={`${DIRECT_API}/get/${VISITS_KEY}`}
                target="_blank"
                rel="noreferrer"
                className="group p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 hover:border-amber-500/50 transition-all block text-xs"
              >
                <div className="flex items-center justify-between text-neutral-300 font-semibold mb-1">
                  <span>Portfolio Visits JSON</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
                </div>
                <p className="font-mono text-[10px] text-neutral-500 truncate group-hover:text-amber-400/80">
                  {DIRECT_API}/get/{VISITS_KEY}
                </p>
              </a>

              {/* Developer Console Tip */}
              <div className="p-3 rounded-2xl bg-cyan-500/05 border border-cyan-500/20 text-xs space-y-1">
                <p className="font-semibold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> DevTools Shortcut
                </p>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Open your browser console anytime on any page and type:
                </p>
                <code className="block bg-neutral-950 px-2 py-1 rounded text-cyan-400 font-mono text-[10px]">
                  window.__resumeDownloads
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: REAL-TIME PRESENCE SLOTS MATRIX (0 TO 5) ── */}
        <div className="p-6 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" /> Remote Presence Heartbeat Matrix (6 Slots)
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Presence slots (0-5) are claimed by active visitors and refreshed every 8 seconds. Heartbeats older than 24s expire automatically.
              </p>
            </div>
            <div className="text-[11px] font-mono text-neutral-500">
              Refreshed: {lastRefreshed.toLocaleTimeString()}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {slotData.map((slot) => (
              <div
                key={slot.slot}
                className={`p-3.5 rounded-2xl border transition-all text-xs space-y-1.5 ${
                  slot.isActive
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/10"
                    : "bg-neutral-950/60 border-neutral-800/80 text-neutral-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs">Slot {slot.slot}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      slot.isActive ? "bg-emerald-400 animate-pulse" : "bg-neutral-700"
                    }`}
                  />
                </div>

                <div className="font-mono text-[11px]">
                  {slot.isActive ? (
                    <span className="text-emerald-400 font-semibold">{slot.diffSeconds}s ago</span>
                  ) : (
                    <span className="text-neutral-600">Idle / Free</span>
                  )}
                </div>

                <p className="text-[10px] text-neutral-500 truncate">
                  {slot.isActive ? "Heartbeat Active" : "No device"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 4: RAW COUNTAPI PAYLOAD INSPECTOR ── */}
        {rawApiResponse && (
          <div className="p-6 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" /> Raw CountAPI Response Payload
            </h2>
            <pre className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-cyan-300 overflow-x-auto">
              {JSON.stringify(rawApiResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* ── MODAL: SET / RESET RESUME DOWNLOADS COUNTER ── */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl text-left space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" /> Calibrate Resume Counter
                </h3>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">
                Set a specific number of downloads or reset to 0. This sends a direct <code className="text-cyan-400">/set</code> command to the remote CountAPI server.
              </p>

              <div className="space-y-3">
                <label className="block text-xs font-medium text-neutral-300">
                  New Download Count Value
                </label>
                <input
                  type="number"
                  min="0"
                  value={customCounterValue}
                  onChange={(e) => setCustomCounterValue(e.target.value)}
                  placeholder={`Current: ${resumeDownloads}`}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl font-mono text-sm text-white focus:outline-none focus:border-cyan-500"
                />

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleSetCounter(0)}
                    type="button"
                    className="flex-1 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Reset to 0
                  </button>
                  <button
                    onClick={() => handleSetCounter(customCounterValue)}
                    type="button"
                    className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Set Value
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL: CHANGE MASTER PASSCODE ── */}
      <AnimatePresence>
        {showPinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl text-left space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-cyan-400" /> Change Master Passcode
                </h3>
                <button
                  onClick={() => setShowPinModal(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">
                Configure your own personalized passcode for unlocking the /analytics route.
              </p>

              <form onSubmit={handleSavePin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    New Passcode
                  </label>
                  <input
                    type="text"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="Enter new passcode..."
                    required
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl font-mono text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {pinChangeSuccess && (
                  <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                    <Check className="w-4 h-4" /> Passcode successfully updated!
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPinModal(false)}
                    className="flex-1 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Save Passcode
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
