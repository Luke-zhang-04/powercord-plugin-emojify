#!/bin/node

/**
 * Emojifier (standalone script)
 *
 * @license MIT
 * @copyright (c) 2020 oldpepper12, 2021 Luke Zhang
 * @see {@link https://github.com/oldpepper12/emojibot2/blob/master/docs/main.js}
 */

import {promises as fs} from "fs"

const data = JSON.parse(await fs.readFile("./data/emoji-mappings.json", "utf-8"))

const sample = (items) => items[Math.floor(Math.random() * items.length)]

function* range(start, stop, step = 1) {
    for (let i = stop ? start : 0; i < (stop ?? start); i += step) {
        yield i
    }

    return
}

const validChars = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "_",
    "-",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
]

const stripWord = (word) =>
    word
        .split("")
        .filter((c) => validChars.includes(c))
        .join("")
        .toLowerCase()

const emojifyLine = (text, lenProbabilities = [1, 1, 1, 1, 2, 2, 3]) =>
    text
        .split(" ")
        .map((word) => {
            const strippedWord = stripWord(word)

            if (strippedWord) {
                const emojiString = Array.from(range(sample(lenProbabilities)))
                    .map(() => sample(data[strippedWord] ?? []))
                    .join("")

                return word + emojiString + " "
            } else {
                return word + " "
            }
        })
        .join("")

const emojify = (text, lenProbabilities = [1, 1, 1, 1, 2, 2, 3]) =>
    text
        .split(/\n/g)
        .map((line) => emojifyLine(line, lenProbabilities))
        .join("\n")

console.log(emojify(process.argv.slice(2).join(" ")))
