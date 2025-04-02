import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import {
    Sheet,
    SheetHeader,
    SheetContent,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { z } from "zod";
import { insertCategoriesSchema } from "@/db/schema";
import { CategoryForm } from "@/features/categories/components/category-form";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";
import { Loader2 } from "lucide-react";

const formSchema = insertCategoriesSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditCategorySheet = () => {
    const { isOpen, onClose, id } = useOpenCategory();

    const [ConfirmationDialog , confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this category."
    );

    const categoryQuery = useGetCategory(id);
    const editMutation= useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);

    const isPending = editMutation.isPending || deleteMutation.isPending;

    const isLoading = categoryQuery.isLoading;

    const onSubmit = (values: FormValues) => {

        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const onDelete = async()=>{
        const ok = await confirm();

        if(ok){
            deleteMutation.mutate(undefined,{
                onSuccess:()=>{
                    onClose();
                }
            });
        }
    };

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name
    } : {
        name: ""
    }

    return (
        <>
        <ConfirmationDialog />
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="py-4 px-6 max-w-md mx-auto">
                <SheetHeader className="px-1">
                    <SheetTitle>
                        Edit Category
                    </SheetTitle>
                    <SheetDescription>
                        Edit an existing category.
                    </SheetDescription>
                </SheetHeader>
                {isLoading
                    ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <CategoryForm
                            id={id}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            defaultValues={defaultValues}
                            onDelete={onDelete}
                        />
                    )
                }
            </SheetContent>
        </Sheet>
        </>
    )
};