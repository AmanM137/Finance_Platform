import { Upload} from "lucide-react";
import { Button} from "@/components/ui/button";
import {useCSVReader} from "react-papaparse";

type props ={
    onUpload: (results:any)=>void;
}

export const UploadButton = ({onUpload}:props)=>{
    const {CSVReader} = useCSVReader();
    // add a paywall
    return(
        <CSVReader>
            {({getRootProps}:any)=>{
                <Button
                size="sm"
                className="w-full lg:w-auto"
                >
                    <Upload className="size-4 mr-2" />
                    Import
                </Button>
            }}
        </CSVReader>
    );
};