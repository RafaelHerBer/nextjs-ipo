"use client"
import { BackButton } from "@/components/BackButton";
import { FileCard, FolderCard } from "@/components/FileCards";
//import { FileView } from "@/components/FileView";
const FileView = dynamic(
  () => import('../../../components/FileView').then(mod => mod.FileView),
  { ssr: false }
);
 
import { SmallTypeIcon, TypeIcon } from "@/components/TypeIcon";
import { getFileSystem } from "@/utils/files";
import { Box, Button, Card, Flex, Section, Text, Separator, Link, ContextMenu } from "@radix-ui/themes";
import { Pencil, File, Brain, Folder, ArrowUpRightSquare, ArrowUpRightFromSquareIcon, FileIcon, BrainIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams } from 'next/navigation'; // App Router


const Page = () => {
    const params = useParams();
    
    const slug = params.slug
    var pathArray: string [] = ["Mis Archivos"]
    var path: string = "Mis Archivos/"
    if(slug){
      var slugArray: string[] = []
      var array = slug as string[]
      var estring = slug as string
      if(array){      
        slugArray = slugArray.concat(array)
      }else{
        slugArray.push(estring)
      }
      slugArray.forEach(folder => {
        path += folder.replaceAll("%20", " ")+"/"
        pathArray.push(folder.replaceAll("%20", " "))
      })
      path = path.substring(0,path.length-1)
    }
    const PathSegmentL = (segment:string,fullPath:string)=>{
      return (
        <Link href={fullPath} key={"pathsegment.link."+fullPath}>{segment}</Link>
      )
    }
    const PathLinks = (path: string[])=>{
      var segments: JSX.Element[] = []
      path.forEach((segment,indx)=>{
        var fullPath = "/"
        path.forEach((pathSegment,pathIndex)=>{
          if(pathIndex<=indx){
          fullPath += pathSegment.trim() + "/"
          }
        })
        fullPath = fullPath.substring(0,fullPath.length-1)
        segments.push(PathSegmentL(segment+"/",fullPath))
      })
      return(
        <Flex dir="column" gap="0">
          {
            segments
          }
        </Flex>
      )
    }
    return (
      <Box width="100%" height="100%" py="5" px="160px">
          <Box position="fixed" top="80px" left="50%" >
            <Card>
              <Flex dir="column" gap="2" align="center">
                {
                  PathLinks(pathArray)
                }
              <BackButton/>
              </Flex>
            </Card>
          </Box>
          <FileView pathString={path}/>
      </Box>
    );
  }
  
  export default Page;
  