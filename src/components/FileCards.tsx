import { Box, Card, Link, Text, Grid, Flex } from "@radix-ui/themes"
import { FileIcon, FolderIcon } from "lucide-react"
import { TypeIcon } from "./TypeIcon"

export const FolderCard = (name:string, fullPath:string, date:Date)=>{
    return (
        <Box width="300px" height="100px" p="4">
            <Card variant="surface" asChild>
                <Link href={fullPath}>
                    <Flex direction="column"
                        width="300px" height="100px">
                        <Box width="300px" height="50px" p="2" px="4">
                            <Text size={"8"}>{name}</Text>
                        </Box>
                        <Flex direction="row" height="50px" align="end" gap="9">
                            <FolderIcon size="24px"/>
                            <div/>
                            <Text>{date.toLocaleDateString()}</Text>
                        </Flex>
                    </Flex>
                </Link>
            </Card>
        </Box>
    )
}
export const FileCard = (name:string, type:string, fullPath:string, date:Date)=>{
    return (
        <Box width="200px" height="100px" p="4">
            <Card variant="surface" asChild>
                <Link href={fullPath}>
                    <Flex direction="column"
                        width="200px" height="100px">
                        <Box width="200px" height="50px" p="2" px="4">
                            <Text size={"6"}>{name}</Text>
                        </Box>
                        <Flex direction="row" height="50px" align="end" gap="9">
                            {
                                TypeIcon(type)
                            }
                            <Text>{date.toLocaleDateString()}</Text>
                        </Flex>
                    </Flex>
                </Link>
            </Card>
        </Box>
    )
}