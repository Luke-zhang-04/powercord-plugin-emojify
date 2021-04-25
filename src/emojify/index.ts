/**
 * Emojifier
 *
 * @license MIT
 * @copyright (c) 2020 oldpepper12, 2021 Luke Zhang
 * @see {@link https://github.com/oldpepper12/emojibot2/blob/master/docs/main.js}
 */

import data from "../../data/emoji-mappings.json"
import didyoumean from "didyoumean/didYouMean-1.2.1.min.js"

didyoumean.threshold = 0.7

const sample = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)] as T

function* range(start: number, stop?: number, step = 1): Generator<number, void, void> {
    for (let i = stop ? start : 0; i < (stop ?? start); i += step) {
        yield i
    }

    return
}

const stripWord = (word: string): string =>
    word
        .split("")
        .filter((char) => /[A-z]|-|_/u.test(char))
        .join("")
        .toLowerCase()

const getFuzzyString = (key: string): string | undefined => {
    const result = didyoumean(key, Object.keys(data))

    return result instanceof Array ? result[0] : result
}

const emojifyLine = (
    text: string,
    shouldUseFuzzyWordMatch = false,
    lenProbabilities = [1, 1, 1, 1, 2, 2, 3],
): string =>
    text
        .split(" ")
        .map((word) => {
            const strippedWord = stripWord(word)

            if (strippedWord) {
                const emojiString = Array.from(range(sample(lenProbabilities)))
                    .map(() => {
                        let emojis = (data as {[key: string]: string[]})[strippedWord]

                        if (emojis === undefined && shouldUseFuzzyWordMatch) {
                            const fuzzyWord = getFuzzyString(strippedWord)

                            if (fuzzyWord && fuzzyWord !== strippedWord) {
                                emojis = (data as {[key: string]: string[]})[fuzzyWord]
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

export const emojify = (
    text: string,
    shouldUseFuzzyWordMatch = false,
    lenProbabilities = [1, 1, 1, 1, 2, 2, 3],
) =>
    text
        .split(/\n/g)
        .map((line) => emojifyLine(line, shouldUseFuzzyWordMatch, lenProbabilities))
        .join("\n")

export default emojify
