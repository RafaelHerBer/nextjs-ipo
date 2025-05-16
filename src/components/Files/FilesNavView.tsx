"use client"
import { Box, Flex, Separator, Text, Card, Button, DropdownMenu, AlertDialog } from "@radix-ui/themes"
import * as NativeContextMenu from "@radix-ui/react-context-menu"
import * as NativeDropdownMenu from "@radix-ui/react-dropdown-menu"
import { ContextMenu } from "@radix-ui/themes"
import { addFile, deleteFile, MemDatafile, MemDocument, MemFile, MemFileSystem, MemFolder, MemMemory, saveFileSystem } from "@/utils/files"
import { FileCard, FolderCard } from "../FileCards"
import { BrainIcon, FileIcon, FolderIcon, Pencil } from "lucide-react"
import React from "react"
import { ConfirmationDialog, FileCreationDialog } from "../UtilityDialog"

type FilesNavViewDysplayProps = {
    dataFiles: MemDatafile[]
    folders: MemFolder[]
    fileSystem: MemFileSystem
    ContextMenuItems: React.ReactNode
    DownRightButton: React.ReactNode
}
export const FilesNavView:React.FC<FilesNavViewDysplayProps> = ({dataFiles,folders, fileSystem, ContextMenuItems,DownRightButton})=>{
    //Making sure that it runs on client 
    const [isClient, setIsClient] = React.useState(false)
   
    React.useEffect(() => {
      setIsClient(true)
    }, [])
    
    var folderComponents = folders.map((folder)=>{
        console.log("Subfolder",folder.name)
        return (
            <FolderCard folder={folder}
            key={"folderCard."+folder.id}/>
        )
    })
    var filesComponents = dataFiles.map((file)=>{
        console.log("Subfiles",file.name)
        return (
            <FileCard file={file} key={"fileCard."+file.id}/>
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
    return(
        <ContextMenu.Root>
        <ContextMenu.Trigger>
            <Flex width="100%" height="100%" direction="column">
                <Box width="100%" >
                    <Box width="110px">
                        <Text size={"6"}>Carpetas:</Text>
                        <Separator size="4"/>
                    </Box>
                    <Flex>
                    {
                        folderComponents
                    }
                    </Flex>
                </Box>
                <Separator size="4"/>
                <Box>
                    <Box width="110px">
                        <Text size={"6"}>Archivos:</Text>
                        <Separator size="4"/>
                    </Box>
                    <Flex>
                    {
                        filesComponents
                    }
                    </Flex>
                </Box>
            </Flex>
        </ContextMenu.Trigger>
        <Box position="fixed"
            bottom="40px" right="40px">
            { DownRightButton }
        </Box>
		<NativeContextMenu.Content>
			{ContextMenuItems}
		</NativeContextMenu.Content>
	    </ContextMenu.Root>
    )
}