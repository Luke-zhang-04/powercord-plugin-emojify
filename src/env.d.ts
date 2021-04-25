type MessageEvents = unknown

declare module "powercord/webpack" {
    export const React: typeof import("react")

    export const getModule: (modules: string[]) => MessageEvents
}

declare module "powercord/injector" {
    export const inject: (
        name: string,
        events: MessageEvents,
        action: string,
        callback: (args: {content: string}[]) => void,
        randomBoolean: boolean,
    ) => void

    export const uninject: (name: string) => void
}

declare module "powercord/entities" {
    export class Plugin {
        public entityID: string

        public startPlugin?: () => void

        public pluginWillUnload?: () => void

        public settings: {
            get: <T>(name: string, defaultValue: T) => T
            get: <T>(name: string, defaultValue?: T) => T | undefined
            set: <T>(name: string, val: T) => void
        }
    }
}

declare module "powercord/components/settings" {
    export const SwitchItem: typeof import("react").Component
}

declare module "didyoumean/didYouMean-1.2.1.min.js" {
    const mod: typeof import("didyoumean")

    export = mod
}

declare interface RenderProps {
    settings: {[key: string]: unknown}
    getSetting: <T>(name: string, defaultValue: T) => T
    getSetting: <T>(name: string, defaultValue?: T) => T | undefined
    toggleSetting: <T>(name: string, defaultValue?: T) => void
    updateSetting: <T>(name: string, value: T) => void
}

declare const powercord: {
    api: {
        commands: {
            registerCommand: (config: {
                command: string
                description?: string
                usage?: string
                executor: (args: string[]) => ({send: boolean; result: string} | void)
            }) => void
            unregisterCommand: (name: string) => void
        }
        settings: {
            registerSettings: (
                entityID: string,
                config: {
                    category: string
                    label: string
                    render: (props: RenderProps) => typeof import("react").ReactNode
                },
            ) => void
            unregisterSettings: (entityID: string) => void
        }
    }
}
