import { SmallTypeIcon, TypeIcon } from "@/components/TypeIcon";
import { Box, Button, Card, Flex, Section, Text, Separator, Link } from "@radix-ui/themes";
import { Pencil, File, Brain, Folder, ArrowUpRightSquare, ArrowUpRightFromSquareIcon } from "lucide-react";
const Page = () => {
  const CreateDocButton = () => {
    return(
      <Button variant="surface" asChild>
        <Link href="/newDocument">
          <File/>
          <Text>Crear Documento</Text>
          <Pencil/>
        </Link>
      </Button>
    )
  }
  const CreateMemButton = () => {
    return(
      <Button variant="surface" asChild>
        <Link href="/newMemory">
          <Brain/>
          <Text>Crear Memoria</Text>
          <Pencil/>
        </Link>
      </Button>
    )
  }
  const RecentFile = (fileName: string, type:string, path:string) => {
    return(
      <Button variant="outline" asChild key={"recentfile.button."+path}>
        <Link href={path}>
          <Flex gap="3">
            {
              TypeIcon(type)
            }
            <Text>{fileName}</Text>
            <ArrowUpRightFromSquareIcon/>
          </Flex>
        </Link>
      </Button>
    )  
  }
  var recentFiles = [
    RecentFile("Carpeta por defecto","Folder","/Mis Archivos/Carpeta por defecto"),
    RecentFile("Archivo por defecto","Document","/Mis Archivos/Carpeta por defecto/Documento por defecto"),
    RecentFile("Memoria por defecto","Memory","/Mis Archivos/Carpeta por defecto/SubCarpeta por defecto/Memoria por defecto"),
  ]
  return (
    <Box width="100%" height="100%">
      <Flex direction="column" width="35%">
        <Flex direction="column" p="9">
          <Text size="7"> Quick Actions </Text>
          <Flex direction="column" width="60%"gap="2" p="6">
            <CreateDocButton/>
            <CreateMemButton/>
          </Flex>
        </Flex>
        <Separator size="4"/>
        <Flex direction="column" p="9">
          <Text size="7"> Recientes </Text>
          <Flex direction="column" width="60%"gap="2" p="6">
            {
              recentFiles
            }
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Page;
