import { AccountFilter } from "@/components/account-filter"
import { DateFilter } from "./date-filter"
import { Suspense } from "react"

export const Filters = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
            <Suspense>
                <AccountFilter />
                <DateFilter />
            </Suspense>
        </div>
    )
}