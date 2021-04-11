import React, { useState } from 'react';

const CreateTable = ({onCreate}) => {

    const [sizeBox, updateSize] = useState(6);
    const [missingBox, updateMissing] = useState(5);

    const changeSizeBox = (event) => {
        if (parseInt(event.target.value)>10 || !typeof event.target.value === 'number')
            updateSize(10);
        else
            updateSize(event.target.value);
        // console.log(sizeBox)
    }
    const changeMissingBox = (event) => {
        if (parseInt(event.target.value) > parseInt(sizeBox*sizeBox)) {
            updateMissing(sizeBox*sizeBox);
        }
        else if (parseInt(event.target.value) < 0) {
            updateMissing(0);
        }
        else
            updateMissing(event.target.value);
    }

    return (
        <div>
            <div>
                <h4>Create table</h4>
            </div>
            <table>
                <tbody>
                <tr>
                    <td>The size:</td>
                    <td><input type="number" value={sizeBox} onChange={changeSizeBox} min={1} max={10} /></td>
                </tr>
                <tr>
                    <td>Missing:</td>
                    <td><input type="number" value={missingBox} onChange={changeMissingBox} min={0} max={sizeBox*sizeBox}/></td>
                </tr>
                <tr>
                    <td colSpan={2}><input type="button" value="create!" onClick={()=>onCreate(sizeBox,missingBox)}/></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

// Size: <input type="text" value={sizeBox} onChange={(e) => updateSize(e.target.value)} />

export default CreateTable;