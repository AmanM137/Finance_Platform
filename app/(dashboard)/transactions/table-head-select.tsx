import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";
import {cn} from "@/lib/utils";


type props ={
    columnIndex: number;
    selectedColumns: Record<string, string | null>;
    onChange:(
        columnIndex: number,
        value: string | null
    )=>void;
};

const options = [
    "amount",
    "date",
    "payee",
];

export const TableHeadSelect = ({
    columnIndex,
    selectedColumns,
    onChange,
}:props)=>{
    const currentSelection = selectedColumns[`column_${columnIndex}`];
    return(
        <div>
          <Select
          value ={currentSelection || ""}
          onValueChange = {(value)=>onChange(columnIndex,value)}
          >
            <SelectTrigger
            className={cn(
                "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
                currentSelection && "text-blue-500",
            )}
            >
                <SelectValue placeholder="skip" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="skip">Skip</SelectItem>
                {options.map((option, index) => {
                   const disabled =
                        Object.values(selectedColumns).includes(option) &&
                        selectedColumns[`column_${columnIndex}`] !== option;

                    return (
                        <SelectItem 
                           key={index}
                           value={option}
                           disabled={disabled}
                           className="capitalize"
                        >
                           {option}
                        </SelectItem>
                    );
                })}
            </SelectContent>
          </Select>  
        </div>
    );
}