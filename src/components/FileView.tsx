"use client"

import { getFileSystem, MemFolder, MemDatafile, MemDocument, MemMemory } from "@/utils/files";
import { Text } from "@radix-ui/themes";
import { FolderView } from "./Files/FolderView";

import { DocView } from "./Files/DocView";
import { MemView } from "./Files/MemView";
import React from "react";
 
type FileViewProps = {
    pathString: string
}
export const FileView:React.FC<FileViewProps> = ({pathString})=>{
    //Making sure that it runs on client 
    const [isClient, setIsClient] = React.useState(false)
  
    React.useEffect(() => {
      setIsClient(true)
    }, [])
 


	  if (typeof window == 'undefined') {
	  	return
	  }
	  let fileSystem = getFileSystem()
    var file
    console.log(pathString)
    for( let key in fileSystem.fileList){
      var value = fileSystem.fileList[key];
      console.log("listedPath",value.path)
      if (value.path == pathString){
        file = value.file;
        break
      }
    }
    if( pathString == (fileSystem.rootFolder.name + "/")){
      file = fileSystem.rootFolder
    }
    var fileType = file?.fileType
    console.log(fileSystem);
    switch(fileType){
      case "folder":
        var folder = file as MemFolder
        console.log(fileSystem);
        if(folder){
          return(
            <FolderView folder={folder} path={pathString} fileSystem={fileSystem}/>
          )
        }
      case "datafile":
        var dataFile = file as MemDatafile
        if(dataFile){
          switch(dataFile.type){
            case "document":
              var document = dataFile as MemDocument
              if(document){
                return (
                  <DocView document={document} path={pathString} fileSystem={fileSystem}/>
                )
              }
            case "memory":
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