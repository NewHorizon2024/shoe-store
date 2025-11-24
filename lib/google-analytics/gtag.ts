/* eslint-disable @typescript-eslint/no-explicit-any */
export const GA_TRACKING_ID = "G-QWXZ0HN734";

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = (action: string, params: Record<string, any>) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
};
