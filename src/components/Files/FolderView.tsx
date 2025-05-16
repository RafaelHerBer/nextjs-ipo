"use client"
import { Box, Flex, Separator, Text, Card, Button, DropdownMenu, AlertDialog } from "@radix-ui/themes"
import * as NativeContextMenu from "@radix-ui/react-context-menu"
import * as NativeDropdownMenu from "@radix-ui/react-dropdown-menu"
import { ContextMenu } from "@radix-ui/themes"
import { addFile, deleteFile, MemDocument, MemFile, MemFileSystem, MemFolder, MemMemory, saveFileSystem } from "@/utils/files"
import { FileCard, FolderCard } from "../FileCards"
import { BrainIcon, FileIcon, FolderIcon, Pencil } from "lucide-react"
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

    type CMFileProps = {
        deleteFile: ()=>void
        rename: ()=>void
    }
    const CMFile:React.FC<CMFileProps> = ({deleteFile,rename})=>{
        return(
        <Card>
            <ContextMenu.Item onClick={()=>rename()}><Pencil/>Rename</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item onClick={()=>deleteFile()} color="red">
                Delete + {folder.name}
            </ContextMenu.Item>
        </Card>
        )
    }
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
                    <DropdownMenu.Item onClick={()=>setFolderDialogOpen(true)}><FolderIcon/>New Folder</DropdownMenu.Item>
                    <DropdownMenu.Item onClick={()=>setDocDialogOpen(true)}><FileIcon/>New Documento</DropdownMenu.Item>
                    <DropdownMenu.Item onClick={()=>setMemDialogOpen(true)}><BrainIcon/>New Memoria</DropdownMenu.Item>
                    
                    <DropdownMenu.Item color="red" onClick={()=>setDelDialogOpen(true)}>
                        Delete "{folder.name}"
                    </DropdownMenu.Item>
                </Card>
                </NativeDropdownMenu.Content>
            </DropdownMenu.Root>
        )
    }
    return(
        <>
            <FilesNavView dataFiles={subFiles} folders={subFolders} fileSystem={fileSystem}
            ContextMenuItems={
                <Card>
                    <ContextMenu.Item onClick={()=>setFolderDialogOpen(true)}><FolderIcon/>New Folder</ContextMenu.Item>
                    <ContextMenu.Item onClick={()=>setDocDialogOpen(true)}><FileIcon/>New Documento</ContextMenu.Item>
                    <ContextMenu.Item onClick={()=>setMemDialogOpen(true)}><BrainIcon/>New Memoria</ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Item color="red" onClick={()=>setDelDialogOpen(true)}>
                        Delete "{folder.name}"
                    </ContextMenu.Item>
                </Card>
            } DownRightButton={ <DropDownMenu/> }/>
            <FileCreationDialog type="Folder"
                open={folderDialogOpen} setOpen={setFolderDialogOpen} 
                create={createFolder} parentFolder={folder}
            />
            <FileCreationDialog type="Document"
                open={docDialogOpen} setOpen={setDocDialogOpen} 
                create={createDocument} parentFolder={folder}
            />
            <FileCreationDialog type="Memory"
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