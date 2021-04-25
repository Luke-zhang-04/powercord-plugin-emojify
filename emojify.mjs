#!/bin/node

/**
 * Emojifier (standalone script)
 *
 * @license MIT
 * @copyright (c) 2020 oldpepper12, 2021 Luke Zhang
 * @see {@link https://github.com/oldpepper12/emojibot2/blob/master/docs/main.js}
 */

import {promises as fs} from "fs"
import didyoumean from "didyoumean"

didyoumean.threshold = 0.7

const data = JSON.parse(await fs.readFile("./data/emoji-mappings.json", "utf-8"))

const sample = (items) => items[Math.floor(Math.random() * items.length)]

function* range(start, stop, step = 1) {
    for (let i = stop ? start : 0; i < (stop ?? start); i += step) {
        yield i
    }

    return
}

const stripWord = (word) =>
    word
        .split("")
        .filter((char) => /[A-z]|-|_/u.test(char))
        .join("")
        .toLowerCase()

const getFuzzyString = (key) => {
    const result = didyoumean(key, Object.keys(data))

    return result instanceof Array ? result[0] : result
}

const emojifyLine = (
    text,
    shouldUseFuzzyWordMatch = false,
    lenProbabilities = [1, 1, 1, 1, 2, 2, 3],
) =>
    text
        .split(" ")
        .map((word) => {
            const strippedWord = stripWord(word)

            if (strippedWord) {
                const emojiString = Array.from(range(sample(lenProbabilities)))
                    .map(() => {
                        let emojis = data[strippedWord]

                        if (emojis === undefined && shouldUseFuzzyWordMatch) {
                            const fuzzyWord = getFuzzyString(strippedWord)

                            if (fuzzyWord && fuzzyWord !== strippedWord) {
                                emojis = data[fuzzyWord]
                            }
                        }

                        return sample(emojis ?? [])
                    })
                    .join("")

                return word + emojiString + " "
            } else {
                return word + " "
            }
        })
        .join("")

const emojify = (
    text,
    shouldUseFuzzyWordMatch = false,
    lenProbabilities = [1, 1, 1, 1, 2, 2, 3],
) =>
    text
        .split(/\n/g)
        .map((line) => emojifyLine(line, shouldUseFuzzyWordMatch, lenProbabilities))
        .join("\n")

console.log(emojify(process.argv.slice(2).join(" ")))
