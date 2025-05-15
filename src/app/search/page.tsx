"use client"
import { getFileSystem, MemFile } from "@/utils/files";
import { ArrowBigRightIcon, ArrowRightIcon, BrainIcon } from "lucide-react";
import { useSearchParams } from 'next/navigation';

import * as NativeDropdownMenu from "@radix-ui/react-dropdown-menu"
import { Box, Flex, Separator, Text, Container, Card, Dialog, TextField, Button, TextArea, DropdownMenu, Link} from "@radix-ui/themes"
import BrainInterface from "@/components/BrainInterFace";
import React from "react";

const Page = ()=>{
    const searchParams = useSearchParams();
    
    // Get a single query parameter
    const query = searchParams.get('query'); // `string | null`
    const fileSystem = getFileSystem();
    var files: { file:MemFile, path:string}[] = []
    if(query){
        for( var key in fileSystem.fileList ){
            if( fileSystem.fileList[key].file.name.includes(query)){
                files.push(fileSystem.fileList[key]);
                continue
            }
            if( fileSystem.fileList[key].path.includes(query)){
                files.push(fileSystem.fileList[key]);
                continue
            }
        }
    }
    var results: React.JSX.Element[] = []
    files.forEach((file)=>{
        results.push(
            <Flex direction="row" width="100%" asChild gap="8" key={"search.flex."+file.path}>
                <Link href={file.path}>
                    <Text>{file.file.name}</Text>
                    <ArrowRightIcon/> 
                    <Text>{file.path}</Text>
                </Link>
            </Flex>
        )
    })

    const [openInterface, setOpenInterface] = React.useState(false)

    return (
        <Container size="4">
            <Flex direction="column" align="center" width="100%">
                <Text size="6"> Search Results </Text>
                <Separator size="4" />
                <Flex direction="column" align="start"width="100%">
                {
                    results
                }
                </Flex>
            </Flex>
            <BrainInterface isActive={openInterface} setIsActive={setOpenInterface}/>
            <Box position="fixed"
            bottom="40px" right="40px">
	            <Button variant="soft" size="4" onClick={()=>{
                    setOpenInterface(true)
                    setTimeout(() => {
                      window.location.href = "/Mis Archivos";
                    }, 5000); // 5000 milliseconds = 5 seconds
                }}>
	            	Infer 
	            	<BrainIcon/>
	        	</Button>
            </Box>
        </Container>
    )
}
export default Page