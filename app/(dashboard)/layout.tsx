import {Header} from "@/components/header";
import { QueryProviders } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";

type props ={
    children : React.ReactNode;
};

const DashboardLayout =({children}:props) =>{
    return(
        <>
            <Header />
            <div className="px-3 lg:px-14">
                <QueryProviders>
                    <SheetProvider />
                    {children}
                </QueryProviders>
            </div>
        </>
    );
};

export default DashboardLayout;