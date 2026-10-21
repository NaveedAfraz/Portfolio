import { useState, useEffect } from "react";

const API_BASE = "/api/countapi";
const DIRECT_API = "https://countapi.mileshilliard.com/api/v1";
const KEY_NAME = "naveedafraz_resume_downloads";
const LOCAL_STORAGE_KEY = "portfolio_resume_downloads_cache";

// Module-level singleton state
let cachedCount = 0;
const subscribers = new Set();
let isInitialized = false;

// Restore initial cached count from localStorage
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      cachedCount = parseInt(saved, 10) || 0;
    }
  } catch {}
}

function notifySubscribers(newCount) {
  cachedCount = newCount;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, newCount.toString());
      window.__resumeDownloads = newCount;
    } catch {}
  }
  subscribers.forEach((callback) => {
    try {
      callback(newCount);
    } catch {}
  });
}

/**
 * Fetch the latest live count of resume downloads from CountAPI.
 */
export async function getResumeDownloadCount() {
  try {
    // 1. Try local/Vercel proxy rewrite first
    let res = await fetch(`${API_BASE}/get/${KEY_NAME}`).catch(() => null);

    // 2. Fallback to direct CountAPI endpoint if proxy fails
    if (!res || !res.ok) {
      res = await fetch(`${DIRECT_API}/get/${KEY_NAME}`).catch(() => null);
    }

    if (res && res.ok) {
      const data = await res.json();
      if (typeof data?.value === "number") {
        notifySubscribers(data.value);
        return data.value;
      }
    }
  } catch (err) {
    console.warn("[ResumeTracker] Could not fetch download count:", err);
  }
  return cachedCount;
}

/**
 * Track a resume download click:
 * - Optimistically increments local and cached count
 * - Fires remote increment to CountAPI
 * - Dispatches Vercel Analytics custom event if available
 * - Updates window.__resumeDownloads for developer console inspection
 */
export async function trackResumeDownload() {
  const optimisticCount = cachedCount + 1;
  notifySubscribers(optimisticCount);

  // Send Vercel Analytics custom event if available
  try {
    if (typeof window !== "undefined" && window.va) {
      window.va("event", { name: "resume_download" });
    }
  } catch {}

  console.log(
    `%c[ResumeTracker] Resume download click recorded! (Total: ${optimisticCount})`,
    "color: #06b6d4; font-weight: bold;"
  );

  try {
    // 1. Try local/Vercel proxy
    let res = await fetch(`${API_BASE}/hit/${KEY_NAME}`).catch(() => null);

    // 2. Fallback to direct CountAPI
    if (!res || !res.ok) {
      res = await fetch(`${DIRECT_API}/hit/${KEY_NAME}`).catch(() => null);
    }

    if (res && res.ok) {
      const data = await res.json();
      if (typeof data?.value === "number") {
        notifySubscribers(data.value);
        return data.value;
      }
    }
  } catch (err) {
    console.warn("[ResumeTracker] Remote increment failed:", err);
  }

  return optimisticCount;
}

/**
 * React hook to access live download count and tracker function in any component.
 */
export function useResumeDownloads() {
  const [downloadCount, setDownloadCount] = useState(cachedCount);

  useEffect(() => {
    // Expose developer helpers in browser DevTools
    if (typeof window !== "undefined") {
      window.__resumeDownloads = cachedCount;
      window.__getResumeDownloads = async () => {
        const live = await getResumeDownloadCount();
        console.log(`📄 Total Resume Downloads: ${live}`);
        return live;
      };
    }

    const handleUpdate = (count) => {
      setDownloadCount(count);
    };

    subscribers.add(handleUpdate);

    // Fetch live on initial mount
    if (!isInitialized) {
      isInitialized = true;
      getResumeDownloadCount().then((val) => {
        setDownloadCount(val);
      });
    }

    return () => {
      subscribers.delete(handleUpdate);
    };
  }, []);

  return {
    downloadCount,
    trackResumeDownload,
  };
}
