declare module "powercord/webpack" {
    export const React: typeof import("react")
}

declare module "powercord/components/settings" {
    export const SwitchItem: typeof import("react").Component
}

declare module "didyoumean/didYouMean-1.2.1.min.js" {
    const mod: typeof import("didyoumean")

    export = mod
}
