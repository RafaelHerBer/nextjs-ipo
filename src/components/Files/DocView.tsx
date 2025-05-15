"use client"
import { Box, Flex, Separator, Text, Card, Button, TextArea, DropdownMenu} from "@radix-ui/themes"
import * as NativeContextMenu from "@radix-ui/react-context-menu"
import * as NativeDropdownMenu from "@radix-ui/react-dropdown-menu"
import { ContextMenu } from "@radix-ui/themes"
import { deleteFile, MemDocument, MemFileSystem, saveFileSystem } from "@/utils/files"
import { PencilIcon } from "lucide-react"
import React from "react"
import { ConfirmationDialog } from "../UtilityDialog"

type DocViewDysplayProps = {
    document: MemDocument
    path: string
    fileSystem: MemFileSystem
}
export const DocView:React.FC<DocViewDysplayProps> = ({document, path, fileSystem})=>{
    var name = document.name
    const [content, setContent] = React.useState(document.content)
    const [edit, setEdit] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [delDialogOpen, setDelDialogOpen] = React.useState(false)	
        
        
    const saveDocument = ()=>{
        document.content = content
        saveFileSystem(fileSystem);
    }
    const CMOpenSpace = ()=>{
        return(
        <>
            <ContextMenu.Item onClick={()=>{
                    setEdit(!edit);
                    if(edit){
                        //setOpenDialog(true)
                        saveDocument()
                    }
                }}><PencilIcon/>Edit</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item color="red" onClick={()=>setDelDialogOpen(true)}>
                Delete
            </ContextMenu.Item>
        </>
        )
    }
    var actualDate = new Date(document.date)
    var dateString = actualDate.getDate()+"/"+actualDate.getMonth()+"/"+actualDate.getFullYear()

    const DDMenuItems = ()=>{
        return(
            <Card>
	            <DropdownMenu.Item onClick={()=>{
                        setEdit(!edit);
                        if(edit){
                            //setOpenDialog(true)
                            saveDocument()
                        }
                    }}>
                    {edit?"Save Memory":"Edit"}
                    <PencilIcon size="16"/>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
	            <DropdownMenu.Item color="red" onClick={()=>{setDelDialogOpen(true)}}>
	            	Delete
	            </DropdownMenu.Item>
            </Card>
        )
    }
    return(
        <ContextMenu.Root>
        <ContextMenu.Trigger>
            <Flex width="100%" height="100%" direction="column">
                <Box width="100%" >
                    <Flex gap={"9"}>
                        <Text size={"6"}>{name}</Text>
                        <div/>
                        <Text size={"3"}>{dateString}</Text>
                    </Flex>
                </Box>
                <Separator size="4"/>
                <Box height="80%" asChild>
                    <TextArea disabled={!edit} value={content} onChange={(e)=>{setContent(e.target.value)}}></TextArea>
                </Box>
            </Flex>
        </ContextMenu.Trigger>
        <ConfirmationDialog actionString="Delete Folder" open={delDialogOpen} setOpen={setDelDialogOpen}
        action={()=>{
            deleteFile(document)
            window.location.href = "/Mis Archivos"
            }} cancelAction={()=>{}}/>
        <ConfirmationDialog actionString="save document" action={()=>saveDocument()} 
            cancelAction={()=>{setContent(document.content)}} open={openDialog} setOpen={setOpenDialog}/>
		<Box position="fixed"
            bottom="40px" right="40px">
             <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="soft" size="4">
                        Options
                        <DropdownMenu.TriggerIcon />
                    </Button>
                </DropdownMenu.Trigger>
                <NativeDropdownMenu.Content>
                    <DDMenuItems/>
                </NativeDropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
                       
        <NativeContextMenu.Content>
            <Card >
                <CMOpenSpace/>
            </Card>
		</NativeContextMenu.Content>
	    </ContextMenu.Root>
    )
}