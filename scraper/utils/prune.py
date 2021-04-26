"""
Used to prune the emojis map to create a smaller JSON file

Copyright (c) 2018 KPG, 2021 Luke Zhang
https://github.com/Kevinpgalligan/EmojipastaBot/tree/master/src/emojipasta/scraping
"""

from collections import defaultdict
from math import gcd
from functools import reduce
from typing import Generator


CountDict = dict[str, int]


def countItems(items: list[str]) -> CountDict:
    """Count the occurences of items in a list"""
    countedItems: CountDict = {}

    for item in items:
        countedItems[item] = countedItems.get(item, 0) + 1

    return countedItems


def deleteInsignificantEmojis(countDict: CountDict) -> None:
    mostOccurences = max(map(lambda val: val, countDict.values()))

    if mostOccurences > 15:
        for key, occurences in countDict.items():
            if mostOccurences * 0.1 > occurences:
                countDict[key] = 0


def pruneList(items: list[str]) -> Generator[str, None, None]:
    """
    Prune list items by reducing the number of items while retaining their ratio
    E.g [1, 1, 1, 1, 2, 2] -> [1, 1, 2]
    """
    count = countItems(items)

    deleteInsignificantEmojis(count)

    divisor = reduce(gcd, count.values())

    for emoji, occurences in count.items():
        for _ in range(occurences // divisor):
            yield emoji


def pruneMappings(map: defaultdict[str, list[str]]) -> None:
    """Prune emoji map"""
    for word, emojis in map.items():
        map[word] = list(pruneList(emojis))
