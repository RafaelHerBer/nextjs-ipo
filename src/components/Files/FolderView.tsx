"use client"
import { Box, Flex, Separator, Text, Container, Card, Dialog, TextField, Button } from "@radix-ui/themes"
import * as NativeContextMenu from "@radix-ui/react-context-menu"
import { ContextMenu } from "@radix-ui/themes"
import { MemDocument, MemFolder, MemMemory, saveFileSystem } from "@/utils/files"
import { FileCard, FolderCard } from "../FileCards"
import { BrainIcon, FileIcon, FolderIcon, Plus } from "lucide-react"
import React from "react"
import { FileCreationDialog } from "../UtilityDialog"

type FolderViewDysplayProps = {
    folder: MemFolder
    path: string
    fileSystem: MemFolder
}
export const FolderView:React.FC<FolderViewDysplayProps> = ({folder, path, fileSystem})=>{
    var subFolders = folder.childFolders
    var subFiles = folder.childDatafiles
    
    console.log("Folder",folder.name)
    var folderComponents = subFolders.map((subFolder)=>{
        console.log("Subfolder",subFolder.name)
        return (
            <FolderCard folderName={subFolder.name}
                fullPath={"/"+path+"/"+subFolder.name+"/"} key={"folderCard."+path+"/"+subFolder.name} 
                date={subFolder.date}/>
        )
    })
    var filesComponents = subFiles.map((subFile)=>{
        console.log("Subfiles",subFile.name)
        return (
            <FileCard fileName={subFile.name} type={subFile.type}
                fullPath={"/"+path+"/"+subFile.name+"/"} key={"folderCard."+path+"/"+subFile.name} 
                date={subFile.date}/>
        )
    })
    const CMOpenSpace = ()=>{
        return(
        <>
            <ContextMenu.Item onClick={()=>setFolderDialogOpen(true)}><FolderIcon/>New Folder</ContextMenu.Item>
            <ContextMenu.Item onClick={()=>setDocDialogOpen(true)}><FileIcon/> Documento</ContextMenu.Item>
            <ContextMenu.Item onClick={()=>setMemDialogOpen(true)}><BrainIcon/> Memoria</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item color="red">
                Delete
            </ContextMenu.Item>
        </>
        )
    }
    const [folderDialogOpen, setFolderDialogOpen] = React.useState(false)	
    const [docDialogOpen, setDocDialogOpen] = React.useState(false)	
    const [memDialogOpen, setMemDialogOpen] = React.useState(false)	

    const createFolder = (name:string, parentFolder:MemFolder)=>{
        let newFolder = new MemFolder(name);
        parentFolder.childFolders.push(newFolder);
        saveFileSystem(fileSystem);
    }
    const createDocument = (name:string, parentFolder:MemFolder)=>{
        let newDoc = new MemDocument(name,"");
        parentFolder.childDatafiles.push(newDoc);
        saveFileSystem(fileSystem);
    }
    const createMemory = (name:string, parentFolder:MemFolder)=>{
        let newMem = new MemMemory(name,"");
        parentFolder.childDatafiles.push(newMem);
        saveFileSystem(fileSystem);

    }
    return(
        <ContextMenu.Root>
        <ContextMenu.Trigger>
            <Flex width="100%" height="100%" direction="column">
                <Box width="100%" >
                    <Text size={"6"}>Folders:</Text>
                    <Flex>
                    {
                        folderComponents
                    }
                    </Flex>
                </Box>
                <Separator size="4"/>
                <Box>
                    <Flex>
                    {
                        filesComponents
                    }
                    </Flex>
                </Box>
            </Flex>
        </ContextMenu.Trigger>
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
		<NativeContextMenu.Content>
            <Card >
			    <CMOpenSpace/>
            </Card>
		</NativeContextMenu.Content>
	    </ContextMenu.Root>
    )
}