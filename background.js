const blockedSites = [
  "twitter.com",
  "reddit.com",
  "instagram.com",
  "x.com",
  "linkedin.com",
  "facebook.com",
  "youtube.com",
  "tiktok.com",
  "twitch.tv",
  "discord.com",
  "netflix.com",
  "hulu.com",
  "amazon.com",
  "dubizzle.com",
];
const redirectPage = "blocked.html";

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = new URL(details.url);

    const now = new Date();
    const minutesNow = now.getHours() * 60 + now.getMinutes();

    const start1 = 8 * 60 + 30; // 510
    const end1 = 9 * 60 + 30; // 570
    const isAllowed1 = minutesNow >= start1 && minutesNow < end1;

    const start2 = 18 * 60; // 1080
    const end2 = 19 * 60; // 1140
    const isAllowed2 = minutesNow >= start2 && minutesNow < end2;

    const isAllowedTime = isAllowed1 || isAllowed2;

    const redirectUrl = chrome.runtime.getURL(redirectPage);
    if (url.href.startsWith(redirectUrl)) {
      return;
    }

    const isBlockedSite = blockedSites.some((site) =>
      url.hostname.includes(site)
    );

    if (isBlockedSite && !isAllowedTime) {
      chrome.tabs.update(details.tabId, { url: redirectUrl });
    }
  },
  { urls: ["<all_urls>"], types: ["main_frame"] }
);
