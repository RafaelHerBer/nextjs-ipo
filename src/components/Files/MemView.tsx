"use client"
import { Box, Flex, Separator, Text, Container, Card, Dialog, TextField, Button, TextArea, DropdownMenu} from "@radix-ui/themes"
import * as NativeContextMenu from "@radix-ui/react-context-menu"
import * as NativeDropdownMenu from "@radix-ui/react-dropdown-menu"
import { ContextMenu } from "@radix-ui/themes"
import { MemDocument, MemFolder, MemMemory, saveFileSystem } from "@/utils/files"
import { FileCard, FolderCard } from "../FileCards"
import { ArrowDownIcon, ArrowUpIcon, BrainIcon, Cone, FileIcon, FolderIcon, PencilIcon, Plus } from "lucide-react"
import React from "react"
import { ConfirmationDialog, FileCreationDialog } from "../UtilityDialog"
import { ColorWheelIcon } from "@radix-ui/react-icons"
import BrainInterface from "../BrainInterFace"

type MemViewDysplayProps = {
    memory: MemMemory
    path: string
    fileSystem: MemFolder
}
export const MemView:React.FC<MemViewDysplayProps> = ({memory, path, fileSystem})=>{
    var name = memory.name
    const [description, setDescription] = React.useState(memory.description)
    const [edit, setEdit] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [openInterface, setOpenInterface] = React.useState(false)
    
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
            <ContextMenu.Item color="red">
                Delete
            </ContextMenu.Item>
        </>
        )
    }
    var actualDate = new Date(memory.date)
    var dateString = actualDate.getDate()+"/"+actualDate.getMonth()+"/"+actualDate.getFullYear()
    const scanMemory = ()=>{

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
                    <TextArea disabled={!edit} value={description} onChange={(e)=>{setDescription(e.target.value)}}></TextArea>
                </Box>
            </Flex>
        </ContextMenu.Trigger>
        <ConfirmationDialog actionString="save memory" action={()=>saveMemory()} 
            cancelAction={()=>{setDescription(memory.description)}} open={openDialog} setOpen={setOpenDialog}/>
		<BrainInterface isActive={openInterface} setIsActive={setOpenInterface}/>
        <Box position="fixed"
            bottom="40px" right="40px">
                <DropdownMenu.Root>
	                <DropdownMenu.Trigger>
	                	<Button variant="soft">
	                		Options
	                		<DropdownMenu.TriggerIcon />
	                	</Button>
	                </DropdownMenu.Trigger>
	                <NativeDropdownMenu.Content>
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
	                	<DropdownMenu.Item color="red">
	                		Delete
	                	</DropdownMenu.Item>
                        </Card>
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