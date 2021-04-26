# Powercord-plugin-emojify

[Source](https://github.com/Luke-zhang-04/powercord-plugin-emojify)

Emojify😞 your😏👈 Discord📞🕹 messages📨📨 to🙅 annoy everyone👦 else🤔

## Disclaimer

I cannot and do not take responsibility for any of the words and emojis in any of the files listed in `data/`. These are scraped from Reddit without filters and WILL contain _questionable_ language. It's Reddit, what did you expect?

## Installation

```bash
cd /opt/powercord/src/Powercord/plugins # Move into the plugins folder

git clone --single-branch --branch release https://github.com/Luke-zhang-04/powercord-plugin-emojify.git
```

## Credits

This "project" is basically just a bunch of exisitng open source projects put together to make a Powercord plugin.

-   See [emojifier](https://github.com/Luke-zhang-04/powercord-plugin-emojify/blob/master/src/emojify/README.md)
-   See [scraper](https://github.com/Luke-zhang-04/powercord-plugin-emojify/blob/master/scraper/README.md)

## Details

-   Anything in Python is the Reddit Scraper courtesy of [Reddit Emojipasta Bot](https://github.com/Kevinpgalligan/EmojipastaBot/tree/master/src/emojipasta/scraping)
    -   This includes `__main__.py` and anything in `scraper`
-   Anything in TypeScript and JavaScript are from another Reddit Emojifier Bot, the [emojibot2 Web Tool](https://github.com/oldpepper12/emojibot2/blob/master/docs/main.js)
    -   This includes anything in `src`
-   `emojify.mjs` is a standalone script that will emojify any input from argv
