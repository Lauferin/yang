import './yang-table.styles.css';

const YangTable = ({ size, yang, missingValue }) => {
    console.log(yang);
    return (
        <div className="yang-div">
            <table className="yang-table">
                <tbody>
                    { 
                    (yang.length) ?
                    yang[0].map((row, i) => (
                        <tr key={i}>
                            {
                            row.map((col, j) => (
                                <td style={{height:'23px',width:'23px'}}key={i*10+j}>{(col!==missingValue) ? col : ' '}</td>
                            ))
                            }
                        </tr>
                    ))
                    : <tr><td style={{width:'200px', height:'200px'}}>Yang Table!</td></tr>
                    }

                </tbody>
            </table>

            {/* {
            yang[0].map((row, i) => (
                <span key={i}>
                    {
                    row.map((col, j) => (
                        <div key={i*10+j} style={{gridColumn:`${i+1}`, gridRow:`${j+1}`}}> a{col}a </div>
                    ))
                    }
                </span>
            ))
            } */}
            
        </div>
    )
}

export default YangTable;

// style={{gridColumn:`1`, gridRow:`${hourBegin}`}}

/* <table>
<tbody>
<tr><td></td><td></td><td></td></tr>
{
yang.map((row, i) => (
    <tr key={i}>
        {
        row.map((col, j) => (
            <td key={10+i*10+j}>a{col} a {j} b {i}</td>
        ))
        }
    </tr>
))
}
</tbody>      
</table> */
