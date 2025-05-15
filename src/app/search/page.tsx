"use client"
import { getFileSystem, MemFile } from "@/utils/files";
import { ArrowRightIcon, BrainIcon } from "lucide-react";
import { useSearchParams } from 'next/navigation';

import { Box, Flex, Separator, Text, Container, Button, Link} from "@radix-ui/themes"
import BrainInterface from "@/components/BrainInterFace";
import React, { Suspense } from "react";

const Page = ()=>{
    //Making sure that it runs on client 
    const [isClient, setIsClient] = React.useState(false)
   
    React.useEffect(() => {
      setIsClient(true)
    }, [])
    
    const Search = ()=>{
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
    
        return(
            <Flex direction="column" align="start"width="100%">
            {
                results
            }
            </Flex>
        )
    }
    const [openInterface, setOpenInterface] = React.useState(false)

    return (
        <Container size="4">
            <Flex direction="column" align="center" width="100%">
                <Text size="6"> Search Results </Text>
                <Separator size="4" />
                <Suspense>
                    <Search/>
                </Suspense>
            </Flex>
            <BrainInterface isActive={openInterface} setIsActive={setOpenInterface}/>
            <Box position="fixed"
            bottom="40px" right="40px">
	            <Button variant="soft" size="4" onClick={()=>{
                    setOpenInterface(true)
                    if(typeof window != "undefined"){
                        setTimeout(() => {
                          window.location.href = "/Mis Archivos";
                        
                        }, 5000); // 5000 milliseconds = 5 seconds
                    }
                }}>
	            	Infer 
	            	<BrainIcon/>
	        	</Button>
            </Box>
        </Container>
    )
}
export default Page