/**
 * Emojifier
 *
 * @license MIT
 * @copyright (c) 2020 oldpepper12, 2021 Luke Zhang
 * @see {@link https://github.com/oldpepper12/emojibot2/blob/master/docs/main.js}
 */

import data from "../../data/emoji-mappings.json"

const sample = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)] as T

function* range(start: number, stop?: number, step = 1): Generator<number, void, void> {
    for (let i = stop ? start : 0; i < (stop ?? start); i += step) {
        yield i
    }

    return
}

// prettier-ignore
const validChars = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1',
    '2', '3', '4', '5', '6', '7', '8', '9', '0',
    '_', '-', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
    'Z'
  ]

const stripWord = (word: string): string =>
    word
        .split("")
        .filter((c) => validChars.includes(c))
        .join("")
        .toLowerCase()

const emojifyLine = (text: string, len_probabilities = [1, 1, 1, 1, 2, 2, 3]): string =>
    text
        .split(" ")
        .map((word) => {
            const strippedWord = stripWord(word)

            if (strippedWord) {
                let emoji_string = ""

                for (let _ of Array.from(range(sample(len_probabilities)))) {
                    emoji_string += sample(data[strippedWord])
                }

                return word + emoji_string + " "
            } else {
                return word + " "
            }
        })
        .join("")

export const emojify = (text: string, len_probabilities = [1, 1, 1, 1, 2, 2, 3]) =>
    text
        .split(/\n/g)
        .map((line) => emojifyLine(line, len_probabilities))
        .join("\n")

export default emojify
