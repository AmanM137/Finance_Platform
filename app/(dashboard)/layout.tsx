import {Header} from "@/components/header";

type props ={
    children : React.ReactNode;
};

const DashboardLayout =({children}:props) =>{
    return(
        <>
            <Header />
            <div className="px-3 lg:px-14">
                {children}
            </div>
        </>
    );
};

export default DashboardLayout;