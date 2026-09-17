import { useState, useEffect } from "react";

const BASE_VISITS = 5000;
const API_BASE = "https://countapi.mileshilliard.com/api/v1";
const NUM_SLOTS = 6;
const HEARTBEAT_INTERVAL_MS = 8000;
const STALE_THRESHOLD_SEC = 24;

// ── 1. WINDOW-WIDE UNIQUE TAB ID ───────────────────────────────────────────
// Guarantees that components within the SAME window (e.g. NotebookModal and Footer)
// are NEVER counted as two separate tabs.
const TAB_ID =
  typeof window !== "undefined"
    ? window.__portfolio_tab_id ||
      (window.__portfolio_tab_id = "tab_" + Math.random().toString(36).substring(2, 9))
    : "ssr";

// ── 2. MODULE-LEVEL SINGLETON STORE ─────────────────────────────────────────
// All components in the window share ONE presence loop, ONE network interval,
// and ONE synchronized state.
let globalState = {
  onlineCount: 1,
  visits: BASE_VISITS + 11,
};
const subscribers = new Set();

function emitChange() {
  subscribers.forEach((callback) => callback(globalState));
}

let isInitialized = false;
let mySlotIndex = -1;

function initPresenceService() {
  if (isInitialized || typeof window === "undefined") return;
  isInitialized = true;

  // Restore cached visits
  try {
    const savedVisits = localStorage.getItem("portfolio_visits_v2");
    if (savedVisits) {
      globalState.visits = parseInt(savedVisits, 10);
    }
  } catch {}

  // Local Multi-Tab Tracking (Different tabs in the same browser)
  const localTabs = new Map();
  localTabs.set(TAB_ID, Date.now());
  let channel = null;

  try {
    if ("BroadcastChannel" in window) {
      channel = new BroadcastChannel("portfolio_presence_sync_v4");
      channel.onmessage = (event) => {
        if (!event?.data) return;
        const { type, sender } = event.data;
        if (sender === TAB_ID) return; // NEVER count self

        if (type === "ping") {
          localTabs.set(sender, Date.now());
          channel.postMessage({ type: "pong", sender: TAB_ID });
          recalculateLocal();
        } else if (type === "pong") {
          localTabs.set(sender, Date.now());
          recalculateLocal();
        } else if (type === "leave") {
          localTabs.delete(sender);
          recalculateLocal();
        }
      };

      channel.postMessage({ type: "ping", sender: TAB_ID });
    }
  } catch {}

  const recalculateLocal = () => {
    const now = Date.now();
    for (const [id, lastSeen] of localTabs.entries()) {
      if (id !== TAB_ID && now - lastSeen > 18000) {
        localTabs.delete(id);
      }
    }
  };

  // Remote Device Presence (Slots 0..5 with live timestamps)
  // Retrieve or claim a slot index (persisted per browser session)
  const savedSlot = sessionStorage.getItem("portfolio_slot_v4");
  if (savedSlot !== null) {
    mySlotIndex = parseInt(savedSlot, 10);
  }

  const claimOrHeartbeat = async () => {
    try {
      const nowSec = Math.floor(Date.now() / 1000);

      // Fetch all slots in parallel to inspect live occupancy
      const slotPromises = Array.from({ length: NUM_SLOTS }, (_, i) =>
        fetch(`${API_BASE}/get/nav_presence_v4_slot_${i}`)
          .then((r) => r.json())
          .catch(() => ({ value: 0 }))
      );

      const slotResults = await Promise.all(slotPromises);

      // If we don't have a valid slot yet, find the first available/stale slot
      if (mySlotIndex < 0 || mySlotIndex >= NUM_SLOTS) {
        let bestSlot = -1;
        for (let i = 0; i < NUM_SLOTS; i++) {
          const ts = slotResults[i]?.value || 0;
          if (nowSec - ts > STALE_THRESHOLD_SEC || ts === 0) {
            bestSlot = i;
            break;
          }
        }
        mySlotIndex = bestSlot >= 0 ? bestSlot : 0;
        try {
          sessionStorage.setItem("portfolio_slot_v4", mySlotIndex.toString());
        } catch {}
      }

      // Send heartbeat to our slot
      fetch(`${API_BASE}/set/nav_presence_v4_slot_${mySlotIndex}?value=${nowSec}`).catch(() => {});

      // Calculate how many devices are currently active (< 24s old)
      let activeRemote = 0;
      slotResults.forEach((res, i) => {
        const ts = i === mySlotIndex ? nowSec : res?.value || 0;
        const diff = nowSec - ts;
        if (diff >= 0 && diff <= STALE_THRESHOLD_SEC) {
          activeRemote++;
        }
      });

      recalculateLocal();
      const finalCount = Math.max(localTabs.size, activeRemote, 1);

      if (globalState.onlineCount !== finalCount) {
        globalState.onlineCount = finalCount;
        emitChange();
      }
    } catch {
      // Offline fallback
      recalculateLocal();
      const finalCount = Math.max(localTabs.size, 1);
      if (globalState.onlineCount !== finalCount) {
        globalState.onlineCount = finalCount;
        emitChange();
      }
    }
  };

  // Sync Total Visits
  const syncVisits = () => {
    try {
      const hasCounted = sessionStorage.getItem("portfolio_visited_session");
      const endpoint = hasCounted
        ? `${API_BASE}/get/naveedafraz_portfolio_visits`
        : `${API_BASE}/hit/naveedafraz_portfolio_visits`;

      fetch(endpoint)
        .then((r) => r.json())
        .then((data) => {
          if (data && typeof data.value === "number") {
            const total = BASE_VISITS + data.value;
            globalState.visits = total;
            emitChange();
            try {
              localStorage.setItem("portfolio_visits_v2", total.toString());
              sessionStorage.setItem("portfolio_visited_session", "true");
            } catch {}
          }
        })
        .catch(() => {});
    } catch {}
  };

  // Run initial sync
  claimOrHeartbeat();
  syncVisits();

  // Polling interval
  const intervalId = setInterval(() => {
    if (channel) {
      channel.postMessage({ type: "ping", sender: TAB_ID });
    }
    claimOrHeartbeat();
  }, HEARTBEAT_INTERVAL_MS);

  // Immediate sync on focus / visibility change
  const onFocus = () => {
    if (document.visibilityState === "visible") {
      if (channel) channel.postMessage({ type: "ping", sender: TAB_ID });
      claimOrHeartbeat();
    }
  };
  window.addEventListener("focus", onFocus);
  document.addEventListener("visibilitychange", onFocus);

  // Clean release on tab close
  window.addEventListener("beforeunload", () => {
    if (channel) {
      try {
        channel.postMessage({ type: "leave", sender: TAB_ID });
        channel.close();
      } catch {}
    }
    if (mySlotIndex >= 0) {
      try {
        fetch(`${API_BASE}/set/nav_presence_v4_slot_${mySlotIndex}?value=0`, {
          keepalive: true,
          method: "GET",
        });
      } catch {}
    }
  });
}

// ── 3. HOOK FOR REACT COMPONENTS ────────────────────────────────────────────
export function useOnlinePresence() {
  const [state, setState] = useState(globalState);

  useEffect(() => {
    initPresenceService();

    const handleUpdate = (newState) => {
      setState({ ...newState });
    };

    subscribers.add(handleUpdate);
    // Sync immediate state upon component mount
    setState({ ...globalState });

    return () => {
      subscribers.delete(handleUpdate);
    };
  }, []);

  return state;
}
