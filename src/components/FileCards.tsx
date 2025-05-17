"use client"
import { Box, Card, Link, Text, Grid, Flex, DropdownMenu, ContextMenu, Button } from "@radix-ui/themes"
import { ArrowRight, BrainIcon, EllipsisVerticalIcon, FileIcon, FolderIcon, Trash2Icon } from "lucide-react"
import { TypeIcon } from "./TypeIcon"
import React from "react"
import { deleteFile, getFileSystem, MemDatafile, MemFile, MemFolder } from "@/utils/files"

import * as NativeContextMenu from "@radix-ui/react-context-menu"
import * as NativeDropdownMenu from "@radix-ui/react-dropdown-menu"
import { ConfirmationDialog } from "./UtilityDialog"
type BaseFileCardProps = {
    file: MemFile
    children: React.ReactNode
}

export const BaseFileCard:React.FC<BaseFileCardProps > = ({file,children})=>{
    const [delDialogOpen, setDelDialogOpen] = React.useState(false)	
    const fileSystem = getFileSystem()
    var fullPath = fileSystem.fileList[file.id].path
    console.log("FullPath",fullPath)
    const DDMenuItems = ()=>{
        return(
            <Card style={{zIndex:"20"}}>
                <DropdownMenu.Item >
                    <Box width="100%" asChild>
                        <Button onClick={()=>window.location.href=("/"+fullPath)} highContrast
                        variant="outline" color="gray"><ArrowRight/>Open</Button>
                    </Box>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    <Box width="100%" asChild>
                        <Button onClick={()=>setDelDialogOpen(true)}
                        variant="outline" color="red"><Trash2Icon/>
                        Delete "{file.name}"</Button>
                    </Box>
                </DropdownMenu.Item>
            </Card>
        )
    }
    const CMenuItems = ()=>{
        return(
            <Card>
               <ContextMenu.Item >
                <Box width="100%" asChild>
                    <Button onClick={()=>window.location.href=("/"+fullPath)} highContrast
                        variant="outline" color="gray"><ArrowRight/>Open</Button>
                </Box>
                </ContextMenu.Item>
                <ContextMenu.Separator/>
                <ContextMenu.Item>
                    <Box width="100%" asChild>
                        <Button onClick={()=>setDelDialogOpen(true)}
                            variant="outline" color="red"><Trash2Icon/>
                            Delete "{file.name}"</Button>
                    </Box>
                </ContextMenu.Item>
            </Card>
        )
    }
    
    return (
        <Box
            p="4">
            <ContextMenu.Root>
            <ContextMenu.Trigger>
            <Card variant="surface" asChild>
                <Flex direction="row">
                    <Link href={"/"+fullPath}>
                        <Flex direction="row" align="end">
                        {
                            children
                        }
                        </Flex>
                    </Link>
                </Flex>
            </Card>
            </ContextMenu.Trigger>
            <ConfirmationDialog actionString="Delete Folder" open={delDialogOpen} setOpen={setDelDialogOpen}
            action={()=>{
                deleteFile(file)
                window.location.href = "/Mis Archivos"
                }} cancelAction={()=>{}}/>
        <NativeContextMenu.Content>
            <CMenuItems/>
        </NativeContextMenu.Content>
        </ContextMenu.Root>
        </Box>
    )
}

type FolderCardProps = {
    folder: MemFolder
}

export const FolderCard:React.FC<FolderCardProps > = ({folder})=>{
    var actualDate = new Date(folder.date)
    var dateString = actualDate.getDate()+"/"+actualDate.getMonth()+"/"+actualDate.getFullYear()
    return (
        <BaseFileCard file={folder}>
            <Box width="300px" >
                <Box //width="280px" height="50px"
                    p="2" px="4">
                    <Text size={"6"}>{folder.name}</Text>
                </Box>
                <Flex direction="row" //height="50px"
                align="end" gap="9">
                    <FolderIcon size="24px"/>
                    <div/>
                    <Text>{dateString}</Text>
                </Flex>
            </Box>
        </BaseFileCard>
    )
}
type FileCardProps = {
    file: MemFile
}
export const FileCard:React.FC<FileCardProps> = ({file})=>{
    const actualDate = new Date(file.date)
    const dateString = actualDate.getDate()+"/"+actualDate.getMonth()+"/"+actualDate.getFullYear()
    const dataFile = file as MemDatafile
    return (
        <BaseFileCard file={file}>
            <Box width="200px" >
                <Box p="2" px="4">
                    <Text size={"5"}>{file.name}</Text>
                </Box>
                <Flex direction="row" align="end" gap="9">
                    <TypeIcon type={dataFile.type}/>
                    <Text>{dateString}</Text>
                </Flex>
            </Box>
        </BaseFileCard>
    )
}