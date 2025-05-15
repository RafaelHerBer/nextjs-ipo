"use client"
/** 
import { FileCard, FolderCard } from "@/components/FileCards";
import { SmallTypeIcon, TypeIcon } from "@/components/TypeIcon";
import { getFileSystem, MemFolder, MemDatafile, MemDocument, MemMemory } from "@/utils/files";
import { Box, Button, Card, Flex, Section, Text, Separator, Link } from "@radix-ui/themes";
import { Pencil, File, Brain, Folder, ArrowUpRightSquare, ArrowUpRightFromSquareIcon } from "lucide-react";
import { FolderView } from "./Files/FolderView";

import dynamic from 'next/dynamic'
import { DocView } from "./Files/DocView";
import { MemView } from "./Files/MemView";
 
type FileViewProps = {
    pathString: string
}
export const FileView:React.FC<FileViewProps> = ({pathString})=>{

    var fileSystem = getFileSystem()
    var file
    var pathFinder: string[] = []
    var path2 = pathString.substring(0,pathString.length-1).trim().split("/")
    var path = pathString.trim().split("/")
    pathFinder = path.reverse()
    var pathFinder2 = path2.reverse()
    var curFolder = fileSystem
    var prevPathSegment: string|undefined = undefined
    //console.log(pathFinder)
    var curPathSegment = pathFinder.pop()
    var curPathSegment2 = pathFinder2.pop()
    if(curPathSegment2 == fileSystem.name && pathFinder2.length == 0){
      console.log(curPathSegment2, pathFinder2, path, pathString)
      file = fileSystem
    }
    while(!file){
      var curPathSegment = pathFinder.pop()
      if(curPathSegment){
        var auxFolder = curFolder.childFolders.filter((folder)=>{
          return folder.name == curPathSegment
        })
        if(pathFinder.length == 0){
          if(auxFolder.length!=0){
            file=auxFolder[0]
            continue
          }
          var auxFile = curFolder.childDatafiles.filter((folderFile)=>{
            return folderFile.name == curPathSegment
          })
          if(auxFile.length!=0){
            file=auxFile[0]
            continue
          }
          break
        }
        if(auxFolder.length!=0){
          curFolder=auxFolder[0]
          continue
        }
        break
      }
      break
    }

    var subFolders = []
    var subFiles = []
    var fileType = file?.fileType
   // console.log("Type",file)
    switch(fileType){
      case "Folder":
        var folder = file as MemFolder
        if(folder){
          return(
            <FolderView folder={folder} path={pathString} fileSystem={fileSystem}/>
          )
        }
      case "Datafile":
        var dataFile = file as MemDatafile
        if(dataFile){
          switch(dataFile.type){
            case "Document":
              var document = dataFile as MemDocument
              if(document){
                return (
                  <DocView document={document} path={pathString} fileSystem={fileSystem}/>
                )
              }
            case "Memory":
              var memory = dataFile as MemMemory
              if(memory){
                return(
                  <MemView memory={memory} path={pathString} fileSystem={fileSystem}/>
                )
              }
          }
        }
      default :
      return(
        <Text> File does not exist </Text>
      )
    }
}
    */