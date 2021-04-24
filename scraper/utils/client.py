"""
Shared code for creating the praw reddit client using
user-provided credentials (from the command line).
"""

import praw
import os
import sys


def getReddit():
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
