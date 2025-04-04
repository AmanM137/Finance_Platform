import { useOpenAccount} from "@/features/accounts/hooks/use-open-account";

type props ={
    accountId: string;
    account: string;
}

export const AccountColumn = ({
    account,
    accountId
}:props)=>{
    const {onOpen: onOpenAccount} = useOpenAccount();

    const onClick = ()=>{
        onOpenAccount(accountId);
    };

    return(
        <div
        onClick = {onClick}
        className="flex items-center cursor-pointer hover:underline"
        >
            {account}
        </div>
    )
}