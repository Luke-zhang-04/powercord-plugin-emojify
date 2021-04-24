"""
Shared code for creating the praw reddit client using user-provided credentials (from the command line).

Copyright (c) 2018 KPG, 2021 Luke Zhang
https://github.com/Kevinpgalligan/EmojipastaBot/tree/master/src/emojipasta/scraping
"""

import praw
import os
import sys


def getReddit() -> praw.Reddit:
    client_id, client_secret, user_agent = (
        os.getenv("CLIENT_ID"),
        os.getenv("CLIENT_SECRET"),
        os.getenv("USER_AGENT"),
    )

    if not client_id or not client_secret or not user_agent:
        print("client_id, client_secret, and user_agent")

        sys.exit(1)

    return praw.Reddit(
        read_only=True,
        client_id=client_id,
        client_secret=client_secret,
        user_agent=user_agent,
    )
