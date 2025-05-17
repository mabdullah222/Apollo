'use server'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import Link from "next/link"
  
const Icon= ({label,IconName,href}) => {
    return (
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger><Link href={href}><IconName size={30}></IconName></Link></TooltipTrigger>
            <TooltipContent>
            <p>{label}</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>

    )
}

export default Icon;