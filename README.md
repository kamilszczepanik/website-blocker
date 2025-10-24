# Simple Website Blocker

A minimal, no-UI Chrome extension that blocks specific websites all day, except during your defined "allowed" time windows.

This was built to avoid paying for simple focus apps that charge for this one feature.

## 🚀 How to Install

1.  **Download:** Clone this repository, or download it as a ZIP file and unzip it.
2.  **Open Extensions Page:** Open Google Chrome and go to `chrome://extensions`.
3.  **Enable Developer Mode:** Find the **Developer mode** toggle in the top-right corner and turn it **ON**.
4.  **Load the Extension:** Click the **"Load unpacked"** button.
5.  **Select Folder:** Select the `website-blocker` folder (the one you just downloaded/unzipped).

That's it\! The extension is now active.

## ⚙️ Default Settings

By default, the following settings are active:

  * **Allowed "Unblock" Windows:**

      * 8:30 AM – 9:30 AM
      * 6:00 PM – 7:00 PM

  * **Blocked Time:** All other times (22 hours a day).

  * **Default Blocked Websites:**

    ```
    twitter.com, reddit.com, instagram.com, x.com, 
    linkedin.com, facebook.com, youtube.com, tiktok.com, 
    twitch.tv, discord.com, netflix.com, hulu.com, 
    amazon.com, dubizzle.com
    ```

## 🔧 How to Customize

All customization is done by editing the `background.js` file in a text editor.

**After saving your changes**, you must go back to `chrome://extensions` and click the **Reload icon** (a small circular arrow) on the extension's card.

-----

### 1\. To Change Blocked Websites

Open `background.js` and add or remove sites from the `blockedSites` array at the top of the file.

```javascript
const blockedSites = [
  "twitter.com",
  "reddit.com",
  "instagram.com",
  // Add or remove any sites you want
];
```

-----

### 2\. To Change Allowed Times

Edit the time logic in `background.js`. The time is set in 24-hour format and calculated in **minutes since midnight**.

  * `8 * 60 + 30` = 8:30 AM
  * `18 * 60` = 6:00 PM (18:00)

<!-- end list -->

```javascript
    // --- Edit Your Times Here ---

    // Window 1: 8:30 AM (510) to 9:30 AM (570)
    const start1 = 8 * 60 + 30;
    const end1 = 9 * 60 + 30;
    const isAllowed1 = minutesNow >= start1 && minutesNow < end1;

    // Window 2: 6:00 PM (1080) to 7:00 PM (1140)
    const start2 = 18 * 60; 
    const end2 = 19 * 60;
    const isAllowed2 = minutesNow >= start2 && minutesNow < end2;

    // --- Don't forget to update the final check ---
    const isAllowedTime = isAllowed1 || isAllowed2;
```

To add a third window, just copy the `start/end/isAllowed` lines and add `|| isAllowed3` to the final line.

-----

### 3\. To Change the Block Page

You can edit the `blocked.html` file to change the text or style of the page that appears when a site is blocked.