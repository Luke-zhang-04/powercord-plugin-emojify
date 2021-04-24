/**
 * Powercord Plugin Emojifier
 *
 * @license MIT
 * @copyright (C) 2021 Luke Zhang
 */

import {React} from "powercord/webpack"
import {SwitchItem} from "powercord/components/settings"

interface Props {
    getSetting(name: string, def: boolean): boolean
    toggleSetting(name: string): void
}

interface State {
    emojifierEnabled: boolean
}

export default class Settings extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            emojifierEnabled: this.props.getSetting("emojifierEnabled", false),
        }
    }

    render = () => (
        <SwitchItem
            note="Auto owoify toggle."
            value={this.state.emojifierEnabled}
            onChange={() => {
                this.setState({emojifierEnabled: !this.state.emojifierEnabled})
                this.props.toggleSetting("emojifierEnabled")
            }}
        >
            Enable
        </SwitchItem>
    )
}
