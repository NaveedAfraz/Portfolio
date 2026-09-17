import { useState, useEffect } from "react";

const BASE_VISITS = 5000;
const SLOT_DURATION_MS = 40000; // 40 seconds per presence window
const API_BASE = "https://countapi.mileshilliard.com/api/v1";

export function useOnlinePresence() {
  const [onlineCount, setOnlineCount] = useState(() => {
    try {
      const cached = sessionStorage.getItem("portfolio_cached_online");
      return cached ? Math.max(1, parseInt(cached, 10)) : 1;
    } catch {
      return 1;
    }
  });

  const [visits, setVisits] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_visits_v2");
      return saved ? parseInt(saved, 10) : BASE_VISITS + 8;
    } catch {
      return BASE_VISITS + 8;
    }
  });

  useEffect(() => {
    let isMounted = true;
    let localTabs = 1;

    // --- 1. LOCAL MULTI-TAB PRESENCE (Instant 0ms sync on same browser/device) ---
    const tabId = "tab_" + Math.random().toString(36).substring(2, 9);
    const activeTabs = new Map();
    activeTabs.set(tabId, Date.now());

    let channel = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel("portfolio_presence_sync");
        channel.onmessage = (event) => {
          if (!isMounted || !event?.data) return;
          const { type, sender } = event.data;
          if (type === "ping") {
            activeTabs.set(sender, Date.now());
            channel.postMessage({ type: "pong", sender: tabId });
            updateCount();
          } else if (type === "pong") {
            activeTabs.set(sender, Date.now());
            updateCount();
          } else if (type === "leave") {
            activeTabs.delete(sender);
            updateCount();
          }
        };

        channel.postMessage({ type: "ping", sender: tabId });
      }
    } catch {
      // BroadcastChannel unavailable
    }

    const cleanStaleTabs = () => {
      const now = Date.now();
      for (const [id, lastSeen] of activeTabs.entries()) {
        if (id !== tabId && now - lastSeen > 14000) {
          activeTabs.delete(id);
        }
      }
      localTabs = Math.max(1, activeTabs.size);
    };

    // --- 2. REMOTE MULTI-DEVICE PRESENCE (Sync across Phones, Laptops, PCs) ---
    let latestRemoteCount = 1;

    const updateCount = () => {
      cleanStaleTabs();
      const combined = Math.max(localTabs, latestRemoteCount, 1);
      if (isMounted) {
        setOnlineCount(combined);
        try {
          sessionStorage.setItem("portfolio_cached_online", combined.toString());
        } catch {
          // ignore
        }
      }
    };

    const syncRemotePresence = async () => {
      try {
        const currentSlot = Math.floor(Date.now() / SLOT_DURATION_MS);
        const lastHitSlot = sessionStorage.getItem("portfolio_pres_hit_slot");

        let currentVal = 1;
        let prevVal = 0;

        if (lastHitSlot !== currentSlot.toString()) {
          // Register heartbeat for new slot
          const hitRes = await fetch(`${API_BASE}/hit/naveed_pres_v3_${currentSlot}`);
          const hitData = await hitRes.json();
          if (hitData && typeof hitData.value === "number") {
            currentVal = hitData.value;
            sessionStorage.setItem("portfolio_pres_hit_slot", currentSlot.toString());
          }
        } else {
          // Already registered this slot, read current tally
          const getRes = await fetch(`${API_BASE}/get/naveed_pres_v3_${currentSlot}`);
          const getData = await getRes.json();
          if (getData && typeof getData.value === "number") {
            currentVal = getData.value;
          }
        }

        // Also check previous slot to avoid drop-off during slot boundaries
        const prevRes = await fetch(`${API_BASE}/get/naveed_pres_v3_${currentSlot - 1}`);
        const prevData = await prevRes.json();
        if (prevData && typeof prevData.value === "number") {
          prevVal = prevData.value;
        }

        latestRemoteCount = Math.max(currentVal, prevVal, 1);
        updateCount();
      } catch {
        // Fallback to localTabs
        updateCount();
      }
    };

    // --- 3. TOTAL VISITS SYNC ---
    const syncTotalVisits = () => {
      try {
        const hasCountedSession = sessionStorage.getItem("portfolio_visited_session");
        const endpoint = hasCountedSession
          ? `${API_BASE}/get/naveedafraz_portfolio_visits`
          : `${API_BASE}/hit/naveedafraz_portfolio_visits`;

        fetch(endpoint)
          .then((res) => res.json())
          .then((data) => {
            if (isMounted && data && typeof data.value === "number") {
              const total = BASE_VISITS + data.value;
              setVisits(total);
              localStorage.setItem("portfolio_visits_v2", total.toString());
              sessionStorage.setItem("portfolio_visited_session", "true");
            }
          })
          .catch(() => {});
      } catch {}
    };

    // Initial sync
    syncRemotePresence();
    syncTotalVisits();

    // Heartbeat every 12 seconds for fast live detection
    const interval = setInterval(() => {
      if (channel) {
        channel.postMessage({ type: "ping", sender: tabId });
      }
      syncRemotePresence();
    }, 12000);

    // Sync immediately on focus or visibility change (e.g. unlocking phone or switching tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (channel) channel.postMessage({ type: "ping", sender: tabId });
        syncRemotePresence();
      }
    };

    window.addEventListener("focus", handleVisibilityChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener("focus", handleVisibilityChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (channel) {
        try {
          channel.postMessage({ type: "leave", sender: tabId });
          channel.close();
        } catch {}
      }
    };
  }, []);

  return { onlineCount, visits };
}
