import React, { useState } from 'react';

const useBooleanState = defaultValue => {
    const [state, setState] = useState(defaultValue);

    const toggle = () => setState(!state);

    return [state, toggle];
};

function Checkbox({ label }) {
    const [checked, toggleCheckbox] = useBooleanState(false);

    return (
        <>
            <input type="checkbox" checked={ checked }
                onClick={ toggleCheckbox } />
            <label>{ label }</label>
        </>
    );
}

export default Checkbox;
