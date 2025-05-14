import type { Metadata } from "next";
import clsx from "clsx";
import { useRouter } from 'next/navigation'
import { inter } from "@/utils/fonts";
import { Providers } from "@/app/providers";

import "@radix-ui/themes/styles.css";

import "@/styles/reset.css";
import "@/styles/globals.css";
import { SideBar } from "@/components/Panels/SideBar";
import { TopBar } from "@/components/Panels/TopBar";
import { Box, Card, Flex, Text,Link, Button } from "@radix-ui/themes";
import { Children, JSX } from "react";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { BackButton } from "@/components/BackButton";

const FilesLayout = async (
  { children,params }:
  { children: React.ReactNode, params: Promise<{ slug?: string[]  }>}) =>
{ 
  const { slug } =  await params
  var path: string [] = ["Mis Archivos"]
  if(slug){
    slug.forEach(folder => {
      path.push(folder.replaceAll("%20", " "))
    })
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
    <>
        <Box position="fixed" top="80px" left="50%" >
          <Card>
            <Flex dir="column" gap="2" align="center">
              {
                PathLinks(path)
              }
            <BackButton/>
            </Flex>
          </Card>
        </Box>
        {children}
    </>
  );
}

export default FilesLayout;
