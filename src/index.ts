/**
 * Powercord Plugin Emojifier
 *
 * @license MIT
 * @copyright (C) 2021 Luke Zhang
 */

import {React, getModule} from "powercord/webpack"
import {inject, uninject} from "powercord/injector"
import {Plugin} from "powercord/entities"
import Settings from "./components/Settings"
import emojify from "./emojify"

export default class Emojify extends Plugin {
    public startPlugin = async (): Promise<void> => {
        powercord.api.settings.registerSettings(this.entityID, {
            category: this.entityID,
            label: "Emojifier",
            render: (props) =>
                React.createElement(Settings, {
                    main: this,
                    ...props,
                }),
        })

        const parentThis = this // For some reason this has to be done
        const messageEvents = await getModule(["sendMessage"])

        inject(
            "emojifierSend",
            messageEvents,
            "sendMessage",
            (args) => {
                if (parentThis.settings.get("emojifierEnabled", false)) {
                    let text = args[1]?.content ?? ""

                    text = emojify(text, parentThis.settings.get("shouldUseFuzzyWordMatch", false))
                    ;(args[1] ??= {content: ""}).content = text
                }

                return args
            },
            true,
        )

        powercord.api.commands.registerCommand({
            command: "emojify",
            description: "emojify your message",
            usage: "{c} [ text ]",
            executor: (args) => ({
                send: true,
                result: emojify(
                    args.join(" "),
                    parentThis.settings.get("shouldUseFuzzyWordMatch", false),
                ),
            }),
        })

        powercord.api.commands.registerCommand({
            command: "toggleEmojify",
            description: `emojify all of your messages`,
            executor: () => {
                let emojifierAutoToggle = this.settings.get("emojifierEnabled", false)

                this.settings.set("emojifierEnabled", !emojifierAutoToggle)
            },
        })
    }

    public pluginWillUnload = (): void => {
        powercord.api.settings.unregisterSettings(this.entityID)
        uninject("emojifierSend")
        powercord.api.commands.unregisterCommand("toggleEmojify")
        powercord.api.commands.unregisterCommand("emojify")
    }
}
