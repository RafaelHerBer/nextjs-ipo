"use client"
import { Box, Card, Link, Text, Grid, Flex } from "@radix-ui/themes"
import { FileIcon, FolderIcon } from "lucide-react"
import { TypeIcon } from "./TypeIcon"
type FolderCardProps = {
    folderName:string, fullPath:string, date:Date
}
export const FolderCard:React.FC<FolderCardProps > = ({folderName, fullPath, date})=>{
    var actualDate = new Date(date)
    var dateString = actualDate.getDate()+"/"+actualDate.getMonth()+"/"+actualDate.getFullYear()
    return (
        <Box width="300px" 
            p="4">
            <Card variant="surface" asChild>
                <Link href={fullPath}>
                    <Flex direction="column"
                        //width="300px" height="100px"
                        >
                        <Box //width="280px" height="50px"
                            p="2" px="4">
                            <Text size={"6"}>{folderName}</Text>
                        </Box>
                        <Flex direction="row" //height="50px"
                        align="end" gap="9">
                            <FolderIcon size="24px"/>
                            <div/>
                            <Text>{dateString}</Text>
                        </Flex>
                    </Flex>
                </Link>
            </Card>
        </Box>
    )
}
type FileCardProps = {
    fileName:string, type:string, fullPath:string, date:Date
}
export const FileCard:React.FC<FileCardProps> = ({fileName, type, fullPath, date})=>{
    var actualDate = new Date(date)
    var dateString = actualDate.getDate()+"/"+actualDate.getMonth()+"/"+actualDate.getFullYear()
    return (
        <Box width="200px" p="4">
            <Card variant="surface" asChild>
                <Link href={fullPath}>
                    <Flex direction="column">
                        <Box p="2" px="4">
                            <Text size={"5"}>{fileName}</Text>
                        </Box>
                        <Flex direction="row" align="end" gap="9">
                            <TypeIcon type={type}/>
                            <Text>{dateString}</Text>
                        </Flex>
                    </Flex>
                </Link>
            </Card>
        </Box>
    )
}