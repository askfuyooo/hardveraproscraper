# HardverAproScraper

A monitoring tool that watches HardverApró listings and sends notifications to Discord when new items are posted.

## What it does

hardveraproscraper monitors a specific HardverApró listing page for new advertisements. When you first run it, it saves the current state of all listings. After that, it checks every 10 minutes for any new listings that weren't there before, and automatically sends them to your Discord channel via webhook.

Perfect for tracking hard-to-find items without constantly refreshing the page!

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/askfuyooo/hardveraproscraper.git
   cd hardveraproscraper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Rename the example file:
   ```bash
   mv .env.example .env
   ```
   
   Edit `.env` and fill in:
   - `DISCORD_WEBHOOK_URL` - Your Discord webhook URL (create one in Discord server settings)
   - `HARDVERAPRO_URL` - The HardverApró listing page you want to monitor (e.g., `https://hardverapro.hu/aprok/.../index.html`)
   - `STATE_FILE` - (Optional) File to store last known listings (default: `.state.json`, automatically generated)
   - `ENCODING` - (Optional) File encoding (default: `utf-8`)

4. **Run the app**
   ```bash
   npm start
   ```

## How it works

- **First run**: Captures the current state of all listings and saves it
- **Subsequent runs**: Checks every 10 minutes for new listings
- **Notifications**: Sends new listings to your Discord channel immediately

**Tip**: Delete state file (for example `.state.json`) or set its content to `[]` to monitor a new page

## Requirements

- Node.js v25.6.1 or newer (developed with v25.6.1)
- npm 11.9.0 or newer (developed with 11.9.0)
- A Discord webhook URL
- A HardverApró listing URL to monitor
- Internet connection for scraping HardverApró

## Disclaimer

This tool is intended for **personal use and educational purposes only**. By using this software, you agree to:
- Respect HardverApró's terms of service and robots.txt
- Use reasonable request intervals (default: 10 minutes)
- Take full responsibility for your use of this tool

The author is not responsible for any misuse or violations of third-party terms of service.

**Note:** This project is not affiliated with, endorsed by, or related to HardverApró, Discord, or their respective organizations. It is an independent third-party tool.

## License

MIT

## Feedback & Issues

Found a bug? Have a feature idea? Feel free to open an issue on GitHub or contact the author.

---

Made with ❤️ by Fuyooo