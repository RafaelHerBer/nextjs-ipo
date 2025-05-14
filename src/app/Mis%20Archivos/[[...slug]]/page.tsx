import { FileCard, FolderCard } from "@/components/FileCards";
import { SmallTypeIcon, TypeIcon } from "@/components/TypeIcon";
import { getFileSystem } from "@/utils/files";
import { Box, Button, Card, Flex, Section, Text, Separator, Link } from "@radix-ui/themes";
import { Pencil, File, Brain, Folder, ArrowUpRightSquare, ArrowUpRightFromSquareIcon } from "lucide-react";

const Page = async ({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) => 
  {
    const { slug } = await params
    var path: string [] = ["Mis Archivos"]
    if(slug){
      slug.forEach(folder => {
        path.push(folder.replaceAll("%20", " "))
      })
    }
    var fileSystem = getFileSystem()
    var file
    var pathFinder: string[] = []
    pathFinder.concat(path.reverse())
    var curFolder = fileSystem
    var prevPathSegment: string|undefined = undefined
    while(!file){
      var curPathSegment = pathFinder.pop()
      if(curPathSegment){
        var auxFolder = curFolder.childFolders.filter((folder)=>{
          return folder.name == curPathSegment
        })
        if(pathFinder.length == 0){
          if(auxFolder){
            //Encontramos la carpeta
            file=auxFolder[0]
            continue
          }
          var auxFile = curFolder.childDatafiles.filter((file)=>{
            // Encontramos el archivo
            return file.name == curPathSegment
          })
          // Acabamos el path y no tenemos carpeta ni archivo
          return (
            <Text> Folder does not exist</Text>
          )
        }
        if(auxFolder){
          // Continuamos, buscamos un archvio más profundo
          curFolder=auxFolder[0]
          continue
        }
        return (
          // Quean elementos en el path, pero no coinciden
          <Text> Folder does not exist</Text>
        )
      }
      return (
        // Creo que no se puede llegar aquí
        <Text> Folder does not exist</Text>
      )
    }
    console.log(typeof file)
    var subFolders = []
    var subFiles = []
    return (
      <Box width="100%" height="100%" py="5">
        <Flex>
        </Flex>
      </Box>
    );
  }
  
  export default Page;
  