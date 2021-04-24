"""
Used to access the data files.
"""

from os import path

dataDirname = f"{path.dirname(__file__)}/../../data"
pathToCommentsFile = f"{dataDirname}/emojipasta-comments.txt"
pathToMappingsFile = f"{dataDirname}/emoji-mappings.json"
