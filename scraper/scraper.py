"""
Used to scrape emojipasta text from r/emojipasta.
"""

import sys
import itertools

import scraper.utils as utils

commentsToScrape = 6000
emojipasta = "emojipasta"


def loadCommentsAndFlatten(submission):
    submission.comments.replace_more(limit=None)
    return submission.comments.list()


def generateComments(subreddit):
    return itertools.chain.from_iterable(
        map(loadCommentsAndFlatten, subreddit.hot(limit=None))
    )


def main():
    reddit = utils.client.getReddit(sys.argv)

    print(reddit)

    file = open(utils.files.pathToCommentsFile, "w+", encoding="utf-8")

    commentsScraped = 0
    for comment in generateComments(reddit.subreddit(emojipasta)):
        file.write(comment.body)
        file.write("\n")
        commentsScraped += 1
        if commentsScraped >= commentsToScrape:
            break
        elif commentsScraped % 1000 == 0:
            print("scraped so far: " + str(commentsScraped))

    file.close()


if __name__ == "__main__":
    main()
