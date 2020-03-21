import React, { FunctionComponent } from 'react';

type RegionButtonrops = {
    name: string,
    onClick: Function,
    selected: Boolean,
}

const RegionButton: FunctionComponent<RegionButtonrops> = ({ name, selected, onClick }: any) => (
    <button onClick={onClick}>{name} {selected ? "selected" : "no"}</button>  
)

export default RegionButton;