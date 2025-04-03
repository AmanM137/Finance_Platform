import {useNewTransaction} from "@/features/transactions/hooks/use-new-transaction";
import{
    Sheet,
    SheetHeader,
    SheetContent,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import {z} from "zod";
import { insertTransactionSchema} from "@/db/schema";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { Loader2 } from "lucide-react";

const formSchema = insertTransactionSchema.omit({
    id: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = ()=>{
    const {isOpen, onClose} = useNewTransaction();

    const createMutation =  useCreateTransaction();

    const categoryMutation = useCreateCategory();
    const categoryQuery = useGetCategories();

    const onCreateCategory = (name:string) => categoryMutation.mutate({
        name,
    });

    const categoryOptions = (categoryQuery.data ?? []).map((category)=>({
        label: category.name,
        value: category.id,
    }));

    const accountMutation = useCreateAccount();
    const accountsQuery = useGetAccounts();

    const onCreateAccount = (name:string) => accountMutation.mutate({
        name,
    });

    const accountOptions = (accountsQuery.data ?? []).map((account)=>({
        label: account.name,
        value: account.id,
    }));

    const isPending = 
    createMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

    const isLoading = 
    categoryQuery.isLoading ||
    accountsQuery.isLoading;


    const onSubmit = (values:FormValues)=>{

        createMutation.mutate(values,{
            onSuccess:()=>{
                onClose();
            },
        }); 
    }
    return(
        <Sheet open = {isOpen} onOpenChange={onClose}>
            <SheetContent className="py-4 px-6 max-w-md mx-auto">
                <SheetHeader className="px-1">
                    <SheetTitle>
                        New Transaction
                    </SheetTitle>
                    <SheetDescription>
                        Add a new transaction
                    </SheetDescription>
                </SheetHeader>
                {isLoading
                ?(
                    <div className="absolute insert-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                    </div>
                )
                : (
                    <TransactionForm 
                        onSubmit={onSubmit}
                        categoryOptions={categoryOptions}
                        accountOptions={accountOptions}
                        disabled = {isPending}
                        onCreateAccount = {onCreateAccount}
                        onCreateCategory = {onCreateCategory}
                    />
                 )
                }
            </SheetContent>
        </Sheet>
    )
};