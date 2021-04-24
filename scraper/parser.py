"""
Used to parse the r/emojipasta comments and form
word-emoji associations.

Copyright (c) 2018 KPG, 2021 Luke Zhang
https://github.com/Kevinpgalligan/EmojipastaBot/tree/master/src/emojipasta/scraping
"""

import io
import json
import re
from collections import defaultdict
from typing import Callable, Tuple, Union

import scraper.utils as utils

maxWordLen = 20  # Longest word to include


def isValidWord(word: str) -> bool:
    return len(word) < maxWordLen and bool(re.match("^[A-z]+$", word, flags=re.UNICODE))


class TokenType:
    EMOJIS = 0
    WORD = 1


class Token:
    def __init__(self, tokenType: int, raw: str):
        self.tokenType = tokenType
        self.raw = raw


TokenData = Tuple[Token, int]


def parseSpecificToken(
    line: str, index: int, tokenType: int, isPartOfTokenFn: Callable[[str], bool]
) -> TokenData:
    newIndex = index

    while newIndex < len(line) and isPartOfTokenFn(line[newIndex]):
        newIndex += 1

    return Token(tokenType, line[index:newIndex].lower()), newIndex


def parseWord(line: str, index: int) -> TokenData:
    return parseSpecificToken(line, index, TokenType.WORD, str.isalnum)


def parseEmoji(line: str, index: int) -> TokenData:
    return parseSpecificToken(line, index, TokenType.EMOJIS, utils.emoji.isEmoji)


def parseToken(line: str, index: int) -> Tuple[Union[None, Token], int]:
    if index >= len(line):
        return None, index
    elif utils.emoji.isEmoji(line[index]):
        return parseEmoji(line, index)
    else:
        return parseWord(line, index)


def skipIrrelevantCharacters(line: str, index: int) -> int:
    while (
        index < len(line)
        and not line[index].isalnum()
        and not utils.emoji.isEmoji(line[index])
    ):
        index += 1

    return index


def tokenize(line: str) -> list[Token]:
    tokens: list[Token] = []
    index = 0

    while index < len(line):
        index = skipIrrelevantCharacters(line, index)
        token, index = parseToken(line, index)

        if token is not None:
            tokens.append(token)

    return tokens


def findNearestWord(i: int, tokens: list[Token]) -> Union[str, None]:
    """
    First try to go back, since that's likely the most relevant word to the emoji.
    This is some pretty "unpythonic" code, but you do what you gotta do.
    """
    j = i - 1

    while j >= 0:
        if tokens[j].tokenType == TokenType.WORD:
            return tokens[j].raw
        j -= 1

    j = i + 1

    while j < len(tokens):
        if tokens[j].tokenType == TokenType.WORD:
            return tokens[j].raw
        j += 1

    return None


def main():
    emojiMappings = defaultdict(list)

    print("Creating mappings...")
    with open(utils.files.pathToCommentsFile, "r", encoding="utf-8") as comments_file:
        for line in comments_file:
            tokens = tokenize(line)

            for i, token in enumerate(tokens):
                if token.tokenType == TokenType.EMOJIS:
                    nearestWord = findNearestWord(i, tokens)

                    if nearestWord is not None and isValidWord(nearestWord):
                        emojiMappings[nearestWord].extend(list(token.raw))

    print("Writing mappings to file...")
    with io.open(utils.files.pathToMappingsFile, "w", encoding="utf-8") as mappingsFile:
        json.dump(emojiMappings, mappingsFile, ensure_ascii=False)


if __name__ == "__main__":
    main()
