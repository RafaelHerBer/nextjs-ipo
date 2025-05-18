"use client"
import { Box, Flex, Separator, Text, Card, Button, DropdownMenu, AlertDialog } from "@radix-ui/themes"
import * as NativeContextMenu from "@radix-ui/react-context-menu"
import * as NativeDropdownMenu from "@radix-ui/react-dropdown-menu"
import { ContextMenu } from "@radix-ui/themes"
import { addFile, deleteFile, MemDocument, MemFile, MemFileSystem, MemFolder, MemMemory, saveFileSystem } from "@/utils/files"
import { FileCard, FolderCard } from "../FileCards"
import { BrainIcon, FileIcon, FolderIcon, Pencil, Trash2Icon } from "lucide-react"
import React from "react"
import { ConfirmationDialog, FileCreationDialog } from "../UtilityDialog"
import { FilesNavView } from "./FilesNavView"

type FolderViewDysplayProps = {
    folder: MemFolder
    path: string
    fileSystem: MemFileSystem
}
export const FolderView:React.FC<FolderViewDysplayProps> = ({folder, path, fileSystem})=>{
    //Making sure that it runs on client 
    const [isClient, setIsClient] = React.useState(false)
   
    React.useEffect(() => {
      setIsClient(true)
    }, [])
   
  
    var subFolders = folder.childFolders
    var subFiles = folder.childDatafiles
    
    console.log("Folder",folder.name)
    var folderComponents = subFolders.map((subFolder)=>{
        console.log("Subfolder",subFolder.name)
        return (
            <FolderCard folder={subFolder}
            key={"folderCard."+path+"/"+subFolder.id}/>
        )
    })

    var filesComponents = subFiles.map((subFile)=>{
        console.log("Subfiles",subFile.name)
        return (
            <FileCard file={subFile} key={"fileCard."+subFile.id}/>
        )
    })
    const [folderDialogOpen, setFolderDialogOpen] = React.useState(false)	
    const [docDialogOpen, setDocDialogOpen] = React.useState(false)	
    const [memDialogOpen, setMemDialogOpen] = React.useState(false)	
    const [delDialogOpen, setDelDialogOpen] = React.useState(false)	

    const createFolder = (name:string, parentFolder:MemFolder)=>{
        let newFolder = new MemFolder(name);
        addFile(newFolder, parentFolder, fileSystem);
    }
    const createDocument = (name:string, parentFolder:MemFolder)=>{
        let newDoc = new MemDocument(name,"");
        addFile(newDoc, parentFolder, fileSystem);
    }
    const createMemory = (name:string, parentFolder:MemFolder)=>{
        let newMem = new MemMemory(name,"");
        addFile(newMem, parentFolder, fileSystem);
    }
    const DropDownMenu = ()=>{
        return(
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="soft" size="4">
                        Opciones
                        <DropdownMenu.TriggerIcon />
                    </Button>
                </DropdownMenu.Trigger>
                <NativeDropdownMenu.Content>
                <Card>
                    <Flex width="100%" direction="column" gap="3" align="start" p="1">
                    <DropdownMenu.Item style={{width:"100%"}}>
                        <Button onClick={()=>setFolderDialogOpen(true)}
                            variant="ghost" asChild>
                            <Box width="100%" p="2">
                                <Flex width="100%">
                                    <FolderIcon/>
                                    <Text>Nueva Carpeta</Text>
                                </Flex>
                            </Box>
                        </Button>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item style={{width:"100%"}}>
                        <Button onClick={()=>setDocDialogOpen(true)}
                            variant="ghost" asChild>
                            <Box width="100%" p="2">
                                <Flex width="100%">
                                    <FileIcon/>
                                    <Text>Nuevo Documento</Text>
                                </Flex>
                            </Box>
                        </Button>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item style={{width:"100%"}}>
                        <Button onClick={()=>setMemDialogOpen(true)}
                            variant="ghost" asChild>
                            <Box width="100%" p="2">
                                <Flex width="100%">
                                    <BrainIcon/>
                                    <Text>Nueva Memoria</Text>
                                </Flex>
                            </Box>
                        </Button>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator/>
                    <DropdownMenu.Item>
                        <Box width="100%" asChild>
                            <Button onClick={()=>setDelDialogOpen(true)}
                                variant="outline" color="red"><Trash2Icon/>
                                Borrar "{folder.name}"</Button>
                        </Box>
                    </DropdownMenu.Item>
                    </Flex>
                </Card>
                </NativeDropdownMenu.Content>
            </DropdownMenu.Root>
        )
    }
    const ContextMenuItems = ()=>{
        return(
        <Card>
            <Flex width="100%" direction="column" gap="3" align="start" p="1">
                <ContextMenu.Item style={{width:"100%"}}>
                    <Button onClick={()=>setFolderDialogOpen(true)}
                        variant="ghost" asChild>
                        <Box width="100%" p="2">
                            <Flex width="100%">
                                <FolderIcon/>
                                <Text>Nueva Carpeta</Text>
                            </Flex>
                        </Box>
                    </Button>
                </ContextMenu.Item>
                <ContextMenu.Item style={{width:"100%"}}>
                    <Button onClick={()=>setDocDialogOpen(true)}
                        variant="ghost" asChild>
                        <Box width="100%" p="2">
                            <Flex width="100%">
                                <FileIcon/>
                                <Text>Nuevo Documento</Text>
                            </Flex>
                        </Box>
                    </Button>
                </ContextMenu.Item>
                <ContextMenu.Item style={{width:"100%"}}>
                    <Button onClick={()=>setMemDialogOpen(true)}
                        variant="ghost" asChild>
                        <Box width="100%" p="2">
                            <Flex width="100%">
                                <BrainIcon/>
                                <Text>Nueva Memoria</Text>
                            </Flex>
                        </Box>
                    </Button>
                </ContextMenu.Item>
                <Separator size="4"/>
                <ContextMenu.Item>
                    <Box width="100%" asChild>
                        <Button onClick={()=>setDelDialogOpen(true)}
                            variant="outline" color="red"><Trash2Icon/>
                            Borrar "{folder.name}"</Button>
                    </Box>
                </ContextMenu.Item>
            </Flex>
        </Card>
        )
    }
    return(
        <>
            <FilesNavView dataFiles={subFiles} folders={subFolders} fileSystem={fileSystem}
            ContextMenuItems={ContextMenuItems()} DownRightButton={ <DropDownMenu/> }/>
            <FileCreationDialog type="folder" displayType="Carpeta"
                open={folderDialogOpen} setOpen={setFolderDialogOpen} 
                create={createFolder} parentFolder={folder}
            />
            <FileCreationDialog type="document" displayType="Documento"
                open={docDialogOpen} setOpen={setDocDialogOpen} 
                create={createDocument} parentFolder={folder}
            />
            <FileCreationDialog type="memory" displayType="Memoria"
                open={memDialogOpen} setOpen={setMemDialogOpen} 
                create={createMemory} parentFolder={folder}
            />
            <ConfirmationDialog actionString="Delete Folder" open={delDialogOpen} setOpen={setDelDialogOpen}
            action={()=>{
                deleteFile(folder)
                window.location.href = "/Mis Archivos"
                }} cancelAction={()=>{}}/>
        </>
    )
}