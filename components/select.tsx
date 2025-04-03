"use client"

import { useMemo} from "react";
import {SingleValue} from "react-select";
import CreatableSelect from "react-select/creatable";

type props = {
    onChange:(value?:string)=>void;
    onCreate?:(value:string)=>void;
    options?:{label:string; value:string}[];
    value?: string | null | undefined;
    disabled?: boolean;
    placeholder?: string;
};

export const Select = ({
    onChange,
    onCreate,
    options =[],
    value,
    disabled,
    placeholder,
}:props)=>{
    const onSelect =(
        option:SingleValue<{label:string; value:string}>
    )=>{
        onChange(option?.value);
    };

    const formattedValue = useMemo(()=>{
        return options.find((option)=>option.value===value);

    },[options, value]);

    return(
        <CreatableSelect 
        isDisabled={disabled}
        placeholder={placeholder}
        className="text-sm h-10"
        styles={{
            control:(base)=>({
                ...base,
                borderColor: "#e2e8f0",
                ":hover":{
                    borderColor:"#e2e8f0",
                },
            })
        }}
        options={options}
        value={formattedValue}
        onChange={onSelect}
        onCreateOption={onCreate}
        />
    );
}