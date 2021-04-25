/**
 * Powercord Plugin Emojifier
 *
 * @license MIT
 * @copyright (C) 2021 Luke Zhang
 */

import type {Plugin} from "powercord/entities"
import {React} from "powercord/webpack"
import {SwitchItem} from "powercord/components/settings"

interface Props extends RenderProps {
    main: Plugin
}

interface State {
    emojifierEnabled: boolean
    shouldUseFuzzyWordMatch: boolean
}

export default class Settings extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props)

        this.state = {
            emojifierEnabled: this.props.getSetting("emojifierEnabled", false),
            shouldUseFuzzyWordMatch: this.props.getSetting("shouldUseFuzzyWordMatch", false),
        }
    }

    public render = () => (
        <>
            <SwitchItem
                note="Auto emojify toggle."
                value={this.state.emojifierEnabled}
                onChange={() => {
                    this.setState({emojifierEnabled: !this.state.emojifierEnabled})
                    this.props.toggleSetting("emojifierEnabled")
                }}
            >
                Enable
            </SwitchItem>
            <SwitchItem
                note="Match words with fuzzy word match."
                value={this.state.shouldUseFuzzyWordMatch}
                onChange={() => {
                    this.setState({shouldUseFuzzyWordMatch: !this.state.shouldUseFuzzyWordMatch})
                    this.props.toggleSetting("shouldUseFuzzyWordMatch")
                }}
            >
                Use fuzzy word match
            </SwitchItem>
        </>
    )
}
