"use client"
import { Box, Flex, Separator, Text, Container, Card, Dialog, TextField, Button, TextArea} from "@radix-ui/themes"
import * as NativeContextMenu from "@radix-ui/react-context-menu"
import { ContextMenu } from "@radix-ui/themes"
import { MemDocument, MemFolder, MemMemory, saveFileSystem } from "@/utils/files"
import { FileCard, FolderCard } from "../FileCards"
import { BrainIcon, Cone, FileIcon, FolderIcon, PencilIcon, Plus } from "lucide-react"
import React from "react"
import { ConfirmationDialog, FileCreationDialog } from "../UtilityDialog"

type DocViewDysplayProps = {
    document: MemDocument
    path: string
    fileSystem: MemFolder
}
export const DocView:React.FC<DocViewDysplayProps> = ({document, path, fileSystem})=>{
    var name = document.name
    const [content, setContent] = React.useState(document.content)
    const [edit, setEdit] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    
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
                        setOpenDialog(true)
                    }
                }}><PencilIcon/>Edit</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item color="red">
                Delete
            </ContextMenu.Item>
        </>
        )
    }
    var actualDate = new Date(document.date)
    var dateString = actualDate.getDate()+"/"+actualDate.getMonth()+"/"+actualDate.getFullYear()

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
        <ConfirmationDialog actionString="save document" action={()=>saveDocument()} 
            cancelAction={()=>{setContent(document.content)}} open={openDialog} setOpen={setOpenDialog}/>
		<Box position="fixed"
            bottom="40px" right="40px">
            <Button size="4" variant="soft" onClick={()=>{
                    setEdit(!edit);
                    if(edit){
                        setOpenDialog(true)
                    }
                }}>
                <Text >{edit?"Save Document":"Edit"}</Text>
            </Button>
        </Box>
        <NativeContextMenu.Content>
            <Card >
                <CMOpenSpace/>
            </Card>
		</NativeContextMenu.Content>
	    </ContextMenu.Root>
    )
}