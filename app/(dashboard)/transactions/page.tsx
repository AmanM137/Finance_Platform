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
import { ImportCard } from "./import-card";
import { useState } from "react";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import {transactions as transactionSchema} from "@/db/schema";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { toast } from "sonner";

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
    const [AccountDialog , confirm] = useSelectAccount();
    const [variant , setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS)=>{
        setVariant(VARIANTS.IMPORT);
        setImportResults(results);
    };

    const onCancelImport = ()=>{
        setVariant(VARIANTS.LIST);
        setImportResults(INITIAL_IMPORT_RESULTS);
    };


    const newTransaction = useNewTransaction();
    const transactionQuery = useGetTransactions();
    const createTransaction = useBulkCreateTransactions();
    const deleteTransaction = useBulkDeleteTransactions();
    const transactions = transactionQuery.data || [];
    console.log("transaction query"+transactionQuery);
    console.log("transaction"+transactions);
    
    const deleteTransactions = useBulkDeleteTransactions();
    const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending;

    const onSubmitImport = async(
        values: typeof transactionSchema.$inferInsert[],
    )=>{
        const accountId = await confirm();

        if(!accountId){
            return toast.error("Please select an account to continue");
        }

        const data = values.map((value)=>({
            ...value,
            accountId: accountId as string,
        }));

        createTransaction.mutate(data,{
            onSuccess: ()=>{
                onCancelImport();
            },
        });
    };

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
            <AccountDialog />
            <ImportCard 
            data = {importResults.data}
            onCancel = {onCancelImport}
            onSubmit = {onSubmitImport}
            />
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
                    <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                        <Button 
                        onClick={newTransaction.onOpen} 
                        size="sm"
                        className="w-full lg:w-auto"
                        >
                            <Plus className="size-4 mr-2" />
                            Add new
                        </Button>
                        <UploadButton onUpload ={onUpload} />
                    </div>
                </CardHeader>
                <CardContent>
                   <DataTable 
                     filterKey="payee" 
                     columns={columns} 
                     data={transactions}
                     onDelete={(row) => {
                     const ids = row.map((r) => r.original.id); 
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