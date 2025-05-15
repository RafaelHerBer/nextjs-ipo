"use client"
import { Box, Flex, Separator, Text, Card, Button, TextArea, DropdownMenu} from "@radix-ui/themes"
import * as NativeContextMenu from "@radix-ui/react-context-menu"
import * as NativeDropdownMenu from "@radix-ui/react-dropdown-menu"
import { ContextMenu } from "@radix-ui/themes"
import { deleteFile, MemFileSystem, MemMemory, saveFileSystem } from "@/utils/files"
import { ArrowDownIcon, ArrowUpIcon, BrainIcon, PencilIcon } from "lucide-react"
import React from "react"
import { ConfirmationDialog } from "../UtilityDialog"
import BrainInterface from "../BrainInterFace"

type MemViewDysplayProps = {
    memory: MemMemory
    path: string
    fileSystem: MemFileSystem
}
export const MemView:React.FC<MemViewDysplayProps> = ({memory, path, fileSystem})=>{
    var name = memory.name
    const [description, setDescription] = React.useState(memory.description)
    const [edit, setEdit] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [openInterface, setOpenInterface] = React.useState(false)
    const [delDialogOpen, setDelDialogOpen] = React.useState(false)	
    
    const saveMemory = ()=>{
        memory.description = description
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
            <ContextMenu.Item color="red" onClick={()=>setDelDialogOpen(true)}>
                Delete
            </ContextMenu.Item>
        </>
        )
    }
    const DDMenuItems = ()=>{
        return(
            <Card>
	            <DropdownMenu.Item onClick={()=>{
                        setEdit(!edit);
                        if(edit){
                            setOpenDialog(true)
                        }
                    }}>
                    {edit?"Save Memory":"Edit"}
                    <PencilIcon size="16"/>
                </DropdownMenu.Item>
	            <DropdownMenu.Item onClick={()=>{
                    setOpenInterface(true);memory.date=new Date();
                    setDescription("Descripción Por defecto");
                    saveMemory();
                }}>Scan Memory <BrainIcon size="16"/><ArrowDownIcon size="16"/></DropdownMenu.Item>
	            <DropdownMenu.Item onClick={()=>setOpenInterface(true)}>Remember Memory <BrainIcon size="16"/><ArrowUpIcon size="16"/></DropdownMenu.Item>
                <DropdownMenu.Separator />
	            <DropdownMenu.Item color="red" onClick={()=>{setDelDialogOpen(true)}}>
	            	Delete
	            </DropdownMenu.Item>
            </Card>
        )
    }
    
    var actualDate = new Date(memory.date)
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
                    <TextArea disabled={!edit} value={description} onChange={(e)=>{setDescription(e.target.value)}}></TextArea>
                </Box>
            </Flex>
        </ContextMenu.Trigger>
        <ConfirmationDialog actionString="Delete Folder" open={delDialogOpen} setOpen={setDelDialogOpen}
            action={()=>{
            deleteFile(memory)
            window.location.href = "/Mis Archivos"
            }} cancelAction={()=>{}}/>
        <ConfirmationDialog actionString="save memory" action={()=>saveMemory()} 
            cancelAction={()=>{setDescription(memory.description)}} open={openDialog} setOpen={setOpenDialog}/>
		<BrainInterface isActive={openInterface} setIsActive={setOpenInterface}/>
        <Box position="fixed"
            bottom="40px" right="40px">
            <DropdownMenu.Root>
	            <DropdownMenu.Trigger>
	            	<Button variant="soft" size="4">
	            		Options
	            		<DropdownMenu.TriggerIcon />
	            	</Button>
	            </DropdownMenu.Trigger>
	            <NativeDropdownMenu.Content >
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