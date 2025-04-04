"use client"

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadButton } from "./upload-button";
import { useState } from "react";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

enum VARIANTS {
    LIST ="LIST",
    IMPORT = "IMPORT",
};

const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors:[],
    meta:{},
};

const TransactionPage = () =>{
    const [variant , setVariant] = useState<VARIANTS>(VARIANTS.LIST);


    const newTransaction = useNewTransaction();
    const transactionQuery = useGetTransactions();
    const transactions = transactionQuery.data || [];
    const deleteTransactions = useBulkDeleteTransactions();
    const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending;

    if(transactionQuery.isLoading){
        return(
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                <CardHeader>
                    <Skeleton className="h-8 w-48"/>
                </CardHeader>
                <CardContent>
                    <div className="h-[500px] w-full flex items-center justify-center">
                        <Loader2 className="size-6 text-slate-300 animate-spin"/>
                    </div>
                </CardContent>
                </Card>
            </div>
        )
    }

    if(variant === VARIANTS.IMPORT){
        return(
            <>
            <div>
                This is a import screen
            </div>
            </>
        );
    }

    return(
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between w-full">
                    <CardTitle className="text-xl line-clamp-1">
                       Transaction History
                    </CardTitle>
                    <Button onClick={newTransaction.onOpen} size="sm">
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                    <UploadButton onUpload ={()=>{}} />
                </CardHeader>
                <CardContent>
                   <DataTable 
                     filterKey="payee" 
                     columns={columns} 
                     data={transactions} 
                     onDelete={(rows) => {
                        const ids = rows.map((r) => r.original.id); 
                        deleteTransactions.mutate({ids});
                    }}
                     disabled = {isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default TransactionPage;