import * as React from "react";
import {format} from "date-fns";
import {Calendar1Icon, Calendar as calendarIcon} from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";

import {cn} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

type props ={
    value?: Date;
    onChange?: SelectSingleEventHandler;
    disabled?: boolean;
};

export const DatePicker = ({
    value,
    onChange,
    disabled,
}:props)=>{
    return(
    <Popover>
        <PopoverTrigger asChild>
            <Button
            disabled={disabled}
            variant ="outline"
            className={cn(
                "w-full justify-start text-left font-normal",
                !value && "text-muted-foreground",
            )}
            >
              <Calendar1Icon className="size-4 mr-2"/>
              {value? format(value,"PPP"):<span>Pick a date</span>}
            </Button>
        </PopoverTrigger>
        <PopoverContent>
            <Calendar
            mode ="single"
            selected = {value}
            onSelect ={onChange}
            disabled ={disabled}
            initialFocus
            />
        </PopoverContent>
    </Popover>
    );
};