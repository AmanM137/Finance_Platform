"use client"

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
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { Suspense } from "react";

const CategoriesPage = () => {
    const newCategory = useNewCategory();
    const categoryQuery = useGetCategories();
    const categories = categoryQuery.data || [];
    const deleteCategories = useBulkDeleteCategories();
    const isDisabled = categoryQuery.isLoading || deleteCategories.isPending;

    if (categoryQuery.isLoading) {
        return (
                <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                    <Card className="border-none drop-shadow-sm">
                        <CardHeader>
                            <Skeleton className="h-8 w-48" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-[500px] w-full flex items-center justify-center">
                                <Loader2 className="size-6 text-slate-300 animate-spin" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
        )
    }
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between w-full">
                    <CardTitle className="text-xl line-clamp-1">
                        Categories Page
                    </CardTitle>
                    <Button onClick={newCategory.onOpen} size="sm">
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        filterKey="name"
                        columns={columns}
                        data={categories}
                        onDelete={(rows) => {
                            const ids = rows.map((r) => r.original.id);
                            deleteCategories.mutate({ ids });
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default CategoriesPage;