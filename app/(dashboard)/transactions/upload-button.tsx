import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCSVReader } from "react-papaparse";

type Props = {
  onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader
    onUploadAccepted={onUpload}
    >
      {({ getRootProps }: any) => (
        <div {...getRootProps()}>
          <Button size="sm" className="w-full lg:w-auto">
            <Upload className="size-4 mr-2" />
            Import
          </Button>
        </div>
      )}
    </CSVReader>
  );
};
