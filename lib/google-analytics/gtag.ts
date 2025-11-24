export const GA_TRACKING_ID = "G-QWXZ0HN734";

export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = (action: string, params: Record<string, unknown>) => {
  window.gtag("event", action, params);
};
