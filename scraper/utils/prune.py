"""
Used to prune the emojis map to create a smaller JSON file

Copyright (c) 2018 KPG, 2021 Luke Zhang
https://github.com/Kevinpgalligan/EmojipastaBot/tree/master/src/emojipasta/scraping
"""

from collections import defaultdict
from math import gcd
from functools import reduce
from typing import Generator


def countItems(items: list[str]) -> dict[str, int]:
    countedItems: dict[str, int] = {}

    for item in items:
        countedItems[item] = countedItems.get(item, 0) + 1

    return countedItems


def pruneList(items: list[str]) -> Generator[str, None, None]:
    count = countItems(items)
    divisor = reduce(gcd, count.values())

    for emoji, occurences in count.items():
        for _ in range(occurences // divisor):
            yield emoji


def pruneMappings(map: defaultdict[str, list[str]]) -> None:
    for word, emojis in map.items():
        map[word] = list(pruneList(emojis))
