"use client"
import { Box, Flex, Separator, Text, Card, Button, TextArea, DropdownMenu} from "@radix-ui/themes"
import * as NativeContextMenu from "@radix-ui/react-context-menu"
import * as NativeDropdownMenu from "@radix-ui/react-dropdown-menu"
import { ContextMenu } from "@radix-ui/themes"
import { deleteFile, MemFileSystem, MemMemory, saveFileSystem } from "@/utils/files"
import { ArrowDownIcon, ArrowUpIcon, BrainIcon, PencilIcon, SaveIcon, Trash2Icon } from "lucide-react"
import React from "react"
import { ConfirmationDialog } from "../UtilityDialog"
import { BrainInterface } from "../BrainInterFace"

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
            <Card>
	            <ContextMenu.Item style={{width:"100%"}}>
                    <Button onClick={()=>toggleEdit()}
                        variant="ghost" asChild>
                        <Box width="100%" p="2" px="4">
                            <Flex width="100%" align="center" gap="1">
                                {edit?<SaveIcon/>:<PencilIcon/>}
                                <Text>{edit?"Guardar Memoria":"Edit"}</Text>
                            </Flex>
                        </Box>
                    </Button>
                </ContextMenu.Item>
	            <ContextMenu.Item style={{width:"100%"}}>
                    <Button onClick={()=>ScanMemory()}
                        variant="ghost" asChild>
                        <Box width="100%" p="2" px="4">
                            <Flex width="100%" align="center" gap="1">
                                <BrainIcon/><ArrowDownIcon/>
                                <Text>Escanear <b>Recuerdo</b></Text>
                            </Flex>
                        </Box>
                    </Button>
                </ContextMenu.Item>
                <ContextMenu.Item style={{width:"100%"}}>
                    <Button onClick={()=>setOpenInterface(true)}
                        variant="ghost" asChild>
                        <Box width="100%" p="2" px="4">
                            <Flex width="100%" align="center" gap="1">
                                <BrainIcon/><ArrowUpIcon/>
                                <Text>Recordar <b>Recuerdo</b></Text>
                            </Flex>
                        </Box>
                    </Button>
                </ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item>
                    <Box width="100%" asChild>
                        <Button onClick={()=>setDelDialogOpen(true)}
                            variant="outline" color="red"><Trash2Icon/>
                            Borrar </Button>
                    </Box>
                </ContextMenu.Item>
            </Card>
        )
    }
    const ScanMemory = ()=>{
        setOpenInterface(true);memory.date=new Date();
        setDescription("Descripción Generada Automáticamente");
        memory.lastMemory=new Date();
        saveMemory();
    }
    const toggleEdit = ()=>{
        setEdit(!edit);
        if(edit){
            setOpenDialog(true)
        }
    }
    const DropdownMenuItems = ()=>{
        return(
            <Card>
	            <DropdownMenu.Item style={{width:"100%"}}>
                    <Button onClick={()=>toggleEdit()}
                        variant="ghost" asChild>
                        <Box width="100%" p="2" px="4">
                            <Flex width="100%" align="center" gap="1">
                                {edit?<SaveIcon/>:<PencilIcon/>}
                                <Text>{edit?"Guardar Memoria":"Edit"}</Text>
                            </Flex>
                        </Box>
                    </Button>
                </DropdownMenu.Item>
	            <DropdownMenu.Item style={{width:"100%"}}>
                    <Button onClick={()=>ScanMemory()}
                        variant="ghost" asChild>
                        <Box width="100%" p="2" px="4">
                            <Flex width="100%" align="center" gap="1">
                                <BrainIcon/><ArrowDownIcon/>
                                <Text>Escanear <b>Recuerdo</b></Text>
                            </Flex>
                        </Box>
                    </Button>
                </DropdownMenu.Item>
                <DropdownMenu.Item style={{width:"100%"}}>
                    <Button onClick={()=>setOpenInterface(true)}
                        variant="ghost" asChild>
                        <Box width="100%" p="2" px="4">
                            <Flex width="100%" align="center" gap="1">
                                <BrainIcon/><ArrowUpIcon/>
                                <Text>Recordar <b>Recuerdo</b></Text>
                            </Flex>
                        </Box>
                    </Button>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                    <Box width="100%" asChild>
                        <Button onClick={()=>setDelDialogOpen(true)}
                            variant="outline" color="red"><Trash2Icon/>
                            Borrar </Button>
                    </Box>
                </DropdownMenu.Item>
            </Card>
        )
    }
    
    var actualDate = new Date(memory.date)
    var dateString = actualDate.getDate()+"/"+actualDate.getMonth()+"/"+actualDate.getFullYear()

    var memoryDateString: string | undefined = undefined
    if(memory.lastMemory){
        const auxDate = new Date(memory.lastMemory)
        memoryDateString = auxDate.getDate()+"/"+auxDate.getMonth()+"/"+auxDate.getFullYear()
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
                <Flex height="80%" width="100%" gap="8">
                    <Box height="100%" width="100%">
                        <Text>Descipción</Text>
                        <Box height="100%" width="100%" asChild>
                            <TextArea disabled={!edit} value={description}
                                onChange={(e)=>{setDescription(e.target.value)}}/>
                        </Box>
                    </Box>

                    <Box height="100%" width="100%">
                        <Text>Estado:</Text>
                        <Flex gap="4">
                            <Card asChild>
                                <Box width="400px" height="200px">
                                { !memoryDateString ?
                                <>
                                    <Text size="5" weight="medium" color="red">Memoria sin Recuerdo</Text>
                                    <br/>
                                    <br/>
                                    <Text> Por favor <b>Carge</b> algún <b>Recuerdo</b> con el botón de la derecha</Text>
                                </>
                                :
                                <>
                                    <Text size="5" weight="medium" color="green">Recuerdo almacenado</Text>
                                    <br/>
                                    <Text size="2" color="gray">{memoryDateString}</Text>
                                    <br/>
                                    <Text> Para </Text>
                                    <Text color="red" weight="bold"> <u>SOBRE-ESCRIBIR</u></Text>
                                    <Text> pulse el botón de su derecha</Text>
                                </>

                                }
                                </Box>
                            </Card>
                            <Button size="4" color={!memoryDateString ?undefined:"red"}
                            onClick={()=>ScanMemory()}    variant="soft">
                                {   !memoryDateString ?
                                    <Flex width="100%" align="center" gap="1">
                                        <BrainIcon/><ArrowDownIcon/>
                                        <Text>Escanear <b>Recuerdo</b></Text>
                                    </Flex>
                                    :
                                    <Flex width="100%" align="center" gap="1">
                                        <Trash2Icon/><ArrowDownIcon/>
                                        <Text weight="bold">Sobreescribir Recuerdo</Text>
                                    </Flex>
                                }
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
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
                    <DropdownMenuItems/>
	            </NativeDropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
        <NativeContextMenu.Content>
            <CMOpenSpace/>
		</NativeContextMenu.Content>
	    </ContextMenu.Root>
    )
}