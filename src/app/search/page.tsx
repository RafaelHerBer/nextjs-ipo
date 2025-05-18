"use client"
import { getFileSystem, MemDatafile, MemDocument, MemFile, MemFolder, MemMemory } from "@/utils/files";
import { ArrowRightIcon, Brain, BrainIcon, FolderIcon } from "lucide-react";
import { useSearchParams } from 'next/navigation';

import { Box, Flex, Separator, Text, Container, Button, Link, ContextMenu, Card} from "@radix-ui/themes"
import { BrainInterface, BrainInterfaceButton } from "@/components/BrainInterFace";
import React, { Suspense } from "react";
import { FilesNavView } from "@/components/Files/FilesNavView";

const Page = ()=>{
    //Making sure that it runs on client 
    const [isClient, setIsClient] = React.useState(false)
   
    React.useEffect(() => {
      setIsClient(true)
    }, [])
    
    const fileSystem = getFileSystem();
    const [openInterface, setOpenInterface] = React.useState(false)
    const ContextMenuItems = ()=>{
        return(
            <Card>
                <BrainInterfaceButton buttonAction={()=>window.location.href = "/Mis Archivos"}>
                    <BrainIcon/>
                    Inferir
                </BrainInterfaceButton>
            </Card>
        )
    }
    const InferButton = ()=>{
        return(
            <Flex direction="column">
                <Text color="gray" align="center" as="p"> No estás satisfecho con los resultados?<br/>Prueba la búsqueda inferida<br/></Text>
                <BrainInterfaceButton buttonAction={()=>window.location.href = "/Mis Archivos"}>
                    <BrainIcon/>
                    Inferir
                </BrainInterfaceButton>
            </Flex>
        )
    }
    const Search = ()=>{
        const searchParams = useSearchParams();
        // Get a single query parameter
        const query = searchParams.get('query'); // `string | null`
        var dataFiles: MemDatafile[] = []
        var folders: MemFolder[] = []

        const processFoundFile = (file: MemFile)=>{
            switch(file.fileType){
                case "folder":
                    const folder = file as MemFolder;
                    folders.push(folder);
                    break;
                case "datafile":
                    const dataFile = file as MemDatafile;
                    dataFiles.push(dataFile);
                    break;
                default:
                    console.log("File is broken:", file);
                    break;
            }
            return
        }
        if(query){
            for( var key in fileSystem.fileList ){
                if( fileSystem.fileList[key].file.name.includes(query)){
                    processFoundFile(fileSystem.fileList[key].file);
                    continue
                }
                if( fileSystem.fileList[key].path.includes(query)){
                    processFoundFile(fileSystem.fileList[key].file);
                    continue
                }
                if( fileSystem.fileList[key].file.fileType == "datafile"){
                    const dataFile = fileSystem.fileList[key].file as MemDatafile;
                    switch(dataFile.type){
                        case "document":
                            const doc = dataFile as MemDocument
                            if(doc.content.includes(query)){
                                processFoundFile(doc);
                                continue
                            }
                            break;
                        case "memory":
                            const mem = dataFile as MemMemory
                            if(mem.description.includes(query)){
                                processFoundFile(mem);
                                continue
                            }
                            break
                    }
                }
            }
        }
        if(dataFiles.length == 0 && folders.length == 0){
            return(
                <Flex width="100%" direction="column" align="center">
                    <Text size="7" weight="medium" color="red"> No se encontraron resultados <br/><br/></Text>

                    <Flex gap="9">
                        <InferButton/>
                        <Flex direction="column">
                            <Text color="gray" align="center" as="p"> También puede buscar manualmente<br/><br/></Text>
                            <Button variant="soft" size="4"
                                onClick={()=>window.location.href = "/Mis Archivos"}>
                                <FolderIcon/>
                                Mis Archivos
                            </Button>
                        </Flex>
                    </Flex>

                </Flex>
            )
        }
        return(
        <>
            <Text size="7" weight="medium"> Coincidencias: </Text>
            <FilesNavView dataFiles={dataFiles} folders={folders} fileSystem={fileSystem}
                ContextMenuItems={ContextMenuItems()} DownRightButton={InferButton()}/>
        </>
        )
    }

    return (
      <Box width="100%" py="5" px="160px">
        <Suspense>
            <Search/>
        </Suspense>
      </Box>
    )
}
export default Page