import { BackButton } from "@/components/BackButton";
import { FileCard, FolderCard } from "@/components/FileCards";
import { FileView } from "@/components/FileView";
//import dynamic from 'next/dynamic'
 
import { SmallTypeIcon, TypeIcon } from "@/components/TypeIcon";
import { getFileSystem } from "@/utils/files";
import { Box, Button, Card, Flex, Section, Text, Separator, Link, ContextMenu } from "@radix-ui/themes";
import { Pencil, File, Brain, Folder, ArrowUpRightSquare, ArrowUpRightFromSquareIcon, FileIcon, BrainIcon } from "lucide-react";

const Page = async ({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) => 
  {
    const { slug } = await params
    var pathArray: string [] = ["Mis Archivos"]
    var path: string = "Mis Archivos/"
    if(slug){
      slug.forEach(folder => {
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
          console.log(pathSegment.trim())
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
  