"""
Used to scrape emojipasta text from r/emojipasta.

Copyright (c) 2018 KPG, 2021 Luke Zhang
https://github.com/Kevinpgalligan/EmojipastaBot/tree/master/src/emojipasta/scraping
"""

import itertools

import scraper.utils as utils

commentsToScrape = 9000
emojipasta = "emojipasta"


def loadCommentsAndFlatten(submission):
    submission.comments.replace_more(limit=None)

    return submission.comments.list()


def generateComments(subreddit):
    return itertools.chain.from_iterable(
        map(loadCommentsAndFlatten, subreddit.hot(limit=None))
    )


def main():
    print("setting up reddit")
    reddit = utils.client.getReddit()
    file = open(utils.files.pathToCommentsFile, "w+", encoding="utf-8")
    commentsScraped = 0

    print("scraping comments")

    for comment in generateComments(reddit.subreddit(emojipasta)):
        file.write(comment.body)
        file.write("\n")

        commentsScraped += 1

        if commentsScraped >= commentsToScrape:
            break
        elif commentsScraped % 1000 == 0:
            print("scraped so far: " + str(commentsScraped))
        elif commentsScraped % 500 == 0:
            print("    scraped so far: " + str(commentsScraped))

    file.close()

    print("done scraping comments")


if __name__ == "__main__":
    main()
