import { MemFolder } from "@/utils/files"
import { Button, Dialog, Flex, TextField, Text } from "@radix-ui/themes"
import { TypeIcon } from "./TypeIcon"
import React from "react"

type FileCreationDialogProps = {
    type: string
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    create: (name:string, parentFolder:MemFolder)=>void,
    parentFolder: MemFolder,
}
export const FileCreationDialog:React.FC<FileCreationDialogProps> = ({type, open, setOpen,create,parentFolder})=>{
    
    const [fileName, setFileName] = React.useState("")	
    return (
    <Dialog.Root open={open}>	
        <Dialog.Content maxWidth="450px" onInteractOutside={()=>setOpen(false)}>
            <Dialog.Title>Create {type} <TypeIcon type={type}/></Dialog.Title>
            <Dialog.Description size="2" mb="4">
                Choose a name for the file
            </Dialog.Description>
        
            <Flex direction="column" gap="3">
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                        Name
                    </Text>
                    <TextField.Root value={fileName} onChange={(e)=>{setFileName(e.target.value)}}
                        defaultValue="Freja Johnsen"
                        placeholder="Enter your full name"
                    />
                </label>
            </Flex>
        
            <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button variant="soft" color="gray"
                        onClick={()=>{setOpen(false)}}>
                        Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button onClick={
                        ()=>{create(fileName,parentFolder);setOpen(false)}
                        }>Save</Button>
                </Dialog.Close>
            </Flex>
        </Dialog.Content>
    </Dialog.Root>
    )
}
type ConfirmationDialogProps = {
    actionString: string
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    action: ()=>void,
    cancelAction: ()=>void,
}
export const ConfirmationDialog:React.FC<ConfirmationDialogProps> = ({actionString, open, setOpen,action,cancelAction})=>{
    const [fileName, setFileName] = React.useState("")	
    return (
    <Dialog.Root open={open}>	
        <Dialog.Content maxWidth="450px" onInteractOutside={()=>setOpen(false)}>
            <Dialog.Title>Are you sure you want to {actionString}?</Dialog.Title>
            <Dialog.Description></Dialog.Description>
            <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button variant="soft" color="gray"
                        onClick={()=>{cancelAction();setOpen(false)}}>
                        Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button onClick={
                        ()=>{action();setOpen(false)}
                        }>{actionString}</Button>
                </Dialog.Close>
            </Flex>
        </Dialog.Content>
    </Dialog.Root>
    )
}