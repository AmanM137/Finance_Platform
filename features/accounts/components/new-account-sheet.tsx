import {useNewAccount} from "@/features/accounts/hooks/use-new-account";
import{
    Sheet,
    SheetHeader,
    SheetContent,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import {z} from "zod";
import { insertAccountSchema} from "@/db/schema";
import {AccountForm} from "@/features/accounts/components/account-form";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = ()=>{
    const {isOpen, onClose} = useNewAccount();

    const mutation = useCreateAccount();

    const onSubmit = (values:FormValues)=>{

        mutation.mutate(values,{
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
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm 
                onSubmit={onSubmit} 
                disabled={mutation.isPending}
                defaultValues={{
                    name: '',
                }}
                />
            </SheetContent>
        </Sheet>
    )
};