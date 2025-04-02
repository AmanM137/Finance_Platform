import {useNewCategory} from "@/features/categories/hooks/use-new-category";
import{
    Sheet,
    SheetHeader,
    SheetContent,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import {z} from "zod";
import { insertCategoriesSchema} from "@/db/schema";
import { CategoryForm} from "@/features/categories/components/category-form";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

const formSchema = insertCategoriesSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = ()=>{
    const {isOpen, onClose} = useNewCategory();

    const mutation = useCreateCategory();

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
                        New Category
                    </SheetTitle>
                    <SheetDescription>
                        Create a new category to organize your transactions.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm 
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