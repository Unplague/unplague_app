import React, { FunctionComponent } from 'react';

type ProgressMeterProps = {
    value: number,
    highIsGood: boolean,
}

const ProgressMeter: FunctionComponent<ProgressMeterProps> = ({ value, highIsGood }: any) => {
    let colorClass;
    if (value > 0.75) {
        colorClass = highIsGood ? "good" : "danger";
    } else if (value > 0.4) {
        colorClass = "warning";
    } else {
        colorClass = highIsGood ? "danger" : "good";
    }

    return <progress className={`ProgressMeter ${colorClass}`} value={Math.round(value * 100)} max="100" data-label={(value * 100).toFixed(1) + " % "}></progress>  
}

export default ProgressMeter;