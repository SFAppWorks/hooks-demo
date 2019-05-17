import React, { Fragment } from 'react';

class Checkbox extends React.PureComponent {
    state = {
        checked: false,
    };

    toggleCheckbox = () => {
        this.setState({
            checked: !this.state.checked,
        })
    }

    render() {
        const { label } = this.props;
        const { checked } = this.state;

        return (
            <>
                <input type="checkbox" checked={ checked }
                    onClick={ this.toggleCheckbox } />
                <label>{ label }</label>
            </>
        );
    }
}

export default Checkbox;
