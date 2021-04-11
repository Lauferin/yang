import React, { useState } from 'react';

const InsertValue = ({ onInsert, size, missing, yang }) => {
console.log(missing)
    const [insertBox, updateInsert] = useState(50);

    const disabled = (parseInt(missing) === 0) ? "disabled" : "";

    const changeInsertBox = (event) => {
        updateInsert(event.target.value);
    }


    return (
        <div>
            <div>
                <h4>Insert value</h4>
            </div>
            <div>Value: <input type="number" value={insertBox} onChange={changeInsertBox} disabled={disabled} min={1} max={100} /></div>
            <div><input type="button" value="update" onClick={()=>onInsert(yang,insertBox,missing)} disabled={disabled} /></div>
        </div>
    )
}

export default InsertValue;