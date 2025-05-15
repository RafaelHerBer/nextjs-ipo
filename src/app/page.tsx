"use client"
import { SmallTypeIcon, TypeIcon } from "@/components/TypeIcon";
import { FileCreationDialog } from "@/components/UtilityDialog";
import { getFileSystem, MemDocument, MemFolder, MemMemory, saveFileSystem } from "@/utils/files";
import { Box, Button, Card, Flex, Section, Text, Separator, Link } from "@radix-ui/themes";
import { Pencil, File, Brain, Folder, ArrowUpRightSquare, ArrowUpRightFromSquareIcon } from "lucide-react";
import React from "react";
import { redirect } from "next/navigation";
const Page = () => {
  const CreateDocButton = () => {
    return(
      <Button variant="surface"
      onClick={()=>{setDocDialogOpen(true)}}>
          <File/>
          <Text>Crear Documento</Text>
          <Pencil/>
      </Button>
    )
  }
  const CreateMemButton = () => {
    return(
      <Button variant="surface" 
      onClick={()=>{setMemDialogOpen(true)}}>
          <Brain/>
          <Text>Crear Memoria</Text>
          <Pencil/>
      </Button>
    )
  }
  const RecentFile = (fileName: string, type:string, path:string) => {
    return(
      <Button variant="outline" asChild key={"recentfile.button."+path}>
        <Link href={path}>
          <Flex gap="3">
            <TypeIcon type={type}/>
            <Text>{fileName}</Text>
            <ArrowUpRightFromSquareIcon/>
          </Flex>
        </Link>
      </Button>
    )  
  }
  var fileSystem = getFileSystem()
  var recentFiles = [
    RecentFile("Carpeta por defecto","Folder","/Mis Archivos/Carpeta por defecto"),
    RecentFile("Archivo por defecto","Document","/Mis Archivos/Carpeta por defecto/Documento por defecto"),
    RecentFile("Memoria por defecto","Memory","/Mis Archivos/Carpeta por defecto/SubCarpeta por defecto/Memoria por defecto"),
  ]
  const [docDialogOpen, setDocDialogOpen] = React.useState(false)	
  const [memDialogOpen, setMemDialogOpen] = React.useState(false)	
  const createDocument = (name:string, parentFolder:MemFolder)=>{
      let newDoc = new MemDocument(name,"");
      parentFolder.childDatafiles.push(newDoc);
      saveFileSystem(fileSystem);
      redirect("/Mis Archivos/"+name)
  }
  const createMemory = (name:string, parentFolder:MemFolder)=>{
      let newMem = new MemMemory(name,"");
      parentFolder.childDatafiles.push(newMem);
      saveFileSystem(fileSystem);
      redirect("/Mis Archivos/"+name)
  }
  return (
    <Box width="100%" height="100%">
      <Flex direction="column" width="35%">
        <Flex direction="column" p="9">
          <Text size="7"> Quick Actions </Text>
          <Flex direction="column" width="60%"gap="2" p="6">
            <CreateDocButton/>
            <CreateMemButton/>
            <FileCreationDialog type="Document"
                open={docDialogOpen} setOpen={setDocDialogOpen} 
                create={createDocument} parentFolder={fileSystem}
            />
            <FileCreationDialog type="Memory"
                open={memDialogOpen} setOpen={setMemDialogOpen} 
                create={createMemory} parentFolder={fileSystem}
            />
          </Flex>
        </Flex>
        <Separator size="4"/>
        <Flex direction="column" p="9">
          <Text size="7"> Recientes </Text>
          <Flex direction="column" width="60%"gap="2" p="6">
            {
              recentFiles
            }
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Page;
