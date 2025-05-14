"use client"
import { CaretLeftIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import { useRouter } from "next/navigation"

export const BackButton = ()=>{

    const router = useRouter()
    return (
        <Button variant="ghost" style={{width:"25px",height:"25px"}} 
        onClick={()=>router.back()}>
            <CaretLeftIcon style={{width:"24px",height:"24px"}}/> 
        </Button>
    )
}