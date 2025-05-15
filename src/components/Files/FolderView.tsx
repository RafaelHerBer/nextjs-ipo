"use client"
import { Box, Flex, Separator, Text, Card, Button, DropdownMenu } from "@radix-ui/themes"
import * as NativeContextMenu from "@radix-ui/react-context-menu"
import * as NativeDropdownMenu from "@radix-ui/react-dropdown-menu"
import { ContextMenu } from "@radix-ui/themes"
import { addFile, MemDocument, MemFileSystem, MemFolder, MemMemory } from "@/utils/files"
import { FileCard, FolderCard } from "../FileCards"
import { BrainIcon, FileIcon, FolderIcon, Pencil } from "lucide-react"
import React from "react"
import { FileCreationDialog } from "../UtilityDialog"

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
            <FolderCard folderName={subFolder.name}
                fullPath={"/"+path+"/"+subFolder.name+"/"} key={"folderCard."+path+"/"+subFolder.name} 
                date={subFolder.date}/>
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
                Delete
            </ContextMenu.Item>
        </Card>
        )
    }
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
        <Card>
            <ContextMenu.Item onClick={()=>setFolderDialogOpen(true)}><FolderIcon/>New Folder</ContextMenu.Item>
            <ContextMenu.Item onClick={()=>setDocDialogOpen(true)}><FileIcon/>New Documento</ContextMenu.Item>
            <ContextMenu.Item onClick={()=>setMemDialogOpen(true)}><BrainIcon/>New Memoria</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item color="red">
                Delete
            </ContextMenu.Item>
        </Card>
        )
    }
    const [folderDialogOpen, setFolderDialogOpen] = React.useState(false)	
    const [docDialogOpen, setDocDialogOpen] = React.useState(false)	
    const [memDialogOpen, setMemDialogOpen] = React.useState(false)	

    const DDMenuItems = ()=>{
        return(
            <Card>
                <DropdownMenu.Item onClick={()=>setFolderDialogOpen(true)}><FolderIcon/>New Folder</DropdownMenu.Item>
                <DropdownMenu.Item onClick={()=>setDocDialogOpen(true)}><FileIcon/>New Documento</DropdownMenu.Item>
                <DropdownMenu.Item onClick={()=>setMemDialogOpen(true)}><BrainIcon/>New Memoria</DropdownMenu.Item>
            
	            <DropdownMenu.Item color="red">
	            	Delete
	            </DropdownMenu.Item>
            </Card>
        )
    }
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
        <Box position="fixed"
            bottom="40px" right="40px">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="soft" size="4">
                        Opciones
                        <DropdownMenu.TriggerIcon />
                    </Button>
                </DropdownMenu.Trigger>
                <NativeDropdownMenu.Content>
                    <DDMenuItems/>
                </NativeDropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
		<NativeContextMenu.Content>
			<CMOpenSpace/>
		</NativeContextMenu.Content>
	    </ContextMenu.Root>
    )
}