import { MemFolder } from "@/utils/files"
import { Button, Dialog, Flex, TextField, Text, Box } from "@radix-ui/themes"
import { TypeIcon } from "./TypeIcon"
import React from "react"

type FileCreationDialogProps = {
    type: string, displayType: string,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    create: (name:string, parentFolder:MemFolder)=>void,
    parentFolder: MemFolder,
}
export const FileCreationDialog:React.FC<FileCreationDialogProps> = ({type, open, setOpen,create,parentFolder,displayType})=>{
    
    const [fileName, setFileName] = React.useState("")	
    return (
    <Dialog.Root open={open}>	
        <Dialog.Content maxWidth="450px" onInteractOutside={()=>setOpen(false)}>
            <Dialog.Title>
                <Flex direction="row" align="center" justify="center" gap="4">
                    <Text>Crear: {displayType}</Text>
                    <TypeIcon type={type}/>
                </Flex>
            </Dialog.Title>
            
            <Dialog.Description size="2" mb="4">
                Elige un nombre para el archivo
            </Dialog.Description>
        
            <Flex direction="column" gap="3">
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                        Nombre
                    </Text>
                    <TextField.Root value={fileName} onChange={(e)=>{setFileName(e.target.value)}}
                        placeholder="Nombre del archivo"
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
                        Cancelar
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