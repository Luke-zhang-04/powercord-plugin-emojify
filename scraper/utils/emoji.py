"""
Common emoji code.

Copyright (c) 2018 KPG, 2021 Luke Zhang
https://github.com/Kevinpgalligan/EmojipastaBot/tree/master/src/emojipasta/scraping
"""

import emoji

EMOJIS = set(
    emoji.emojize(emoji_code) for emoji_code in emoji.UNICODE_EMOJI["en"].values()
)


def isEmoji(c):
    return c in EMOJIS
