"""
Used to access the data files.

Copyright (c) 2018 KPG, 2021 Luke Zhang
https://github.com/Kevinpgalligan/EmojipastaBot/tree/master/src/emojipasta/scraping
"""

from os import path

dataDirname = f"{path.dirname(__file__)}/../../data"
pathToCommentsFile = f"{dataDirname}/emojipasta-comments.txt"
pathToMappingsFile = f"{dataDirname}/emoji-mappings.json"
