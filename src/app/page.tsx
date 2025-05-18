"use client"
import { TypeIcon } from "@/components/TypeIcon";
import { FileCreationDialog } from "@/components/UtilityDialog";
import { getFileSystem, MemDocument, MemFolder, MemMemory, saveFileSystem } from "@/utils/files";
import { Box, Button, Flex, Text, Separator, Link, Container, HoverCard, Heading } from "@radix-ui/themes";
import { Pencil, File, Brain, ArrowUpRightFromSquareIcon, BrainIcon } from "lucide-react";
import React from "react";
import { redirect } from "next/navigation";
const Page = () => {
  const CreateDocButton = () => {
    return(
      <Button variant="surface"
      onClick={()=>{setDocDialogOpen(true)}}>
          <File/>
          <Text>Crear Documento</Text>
          <Pencil/>
      </Button>
    )
  }
  const CreateMemButton = () => {
    return(
      <Button variant="surface" 
      onClick={()=>{setMemDialogOpen(true)}}>
          <Brain/>
          <Text>Crear Memoria</Text>
          <Pencil/>
      </Button>
    )
  }
  const RecentFile = (fileName: string, type:string, path:string) => {
    return(
      <Button variant="outline" asChild key={"recentfile.button."+path}>
        <Link href={path}>
          <Flex gap="3">
            <TypeIcon type={type}/>
            <Text>{fileName}</Text>
            <ArrowUpRightFromSquareIcon/>
          </Flex>
        </Link>
      </Button>
    )  
  }
  var fileSystem = getFileSystem()
  var recentFiles = [
    RecentFile("Carpeta por defecto","folder","/Mis Archivos/Carpeta por defecto"),
    RecentFile("Archivo por defecto","document","/Mis Archivos/Carpeta por defecto/Documento por defecto"),
    RecentFile("Memoria por defecto","memory","/Mis Archivos/Carpeta por defecto/Subcarpeta por defecto/Memoria por defecto"),
  ]
  const [docDialogOpen, setDocDialogOpen] = React.useState(false)	
  const [memDialogOpen, setMemDialogOpen] = React.useState(false)	
  const createDocument = (name:string, parentFolder:MemFolder)=>{
      let newDoc = new MemDocument(name,"");
      parentFolder.childDatafiles.push(newDoc);
      saveFileSystem(fileSystem);
      redirect("/Mis Archivos/"+name)
  }
  const createMemory = (name:string, parentFolder:MemFolder)=>{
      let newMem = new MemMemory(name,"");
      parentFolder.childDatafiles.push(newMem);
      saveFileSystem(fileSystem);
      redirect("/Mis Archivos/"+name)
  }
  return (
    <Container size="4" width="100%" height="100%">
      <Flex direction="row" gap="9">
      <Flex direction="column" width="60%">
        <Flex direction="column" p="9">
          <Text size="7"> Quick Actions </Text>
          <Flex direction="column" width="60%"gap="2" p="6">
            <CreateDocButton/>
            <CreateMemButton/>
            <FileCreationDialog type="document" displayType="Documento"
                open={docDialogOpen} setOpen={setDocDialogOpen} 
                create={createDocument} parentFolder={fileSystem.rootFolder}
            />
            <FileCreationDialog type="memory" displayType="Memoria"
                open={memDialogOpen} setOpen={setMemDialogOpen} 
                create={createMemory} parentFolder={fileSystem.rootFolder}
            />
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
      <Flex direction="column" width="35%"><Flex direction="column" p="9">
          <Text size="7"> News </Text>
          <Flex direction="column" width="100%"gap="2" p="6">
            <Text>
	          <HoverCard.Root>
	          	<HoverCard.Trigger>
	          		<Link>
	          			<Text>Tecnología de Memorium segura</Text>
	          		</Link>
	          	</HoverCard.Trigger>
	          	<HoverCard.Content maxWidth="400px">
	          		<Flex gap="4">
	          			<Box>
	          				<Heading size="3" as="h3">
                      Tecnología de Memorium segura
	          				</Heading>
	          				<Text as="div" size="2">
	          					<br/>Un reciente estudio financiado por Memorium® muestra quela tecnología de manipulación de memorias es completamente segura !!! <br/>
                      solo un 34% de los sujetos de pruebas sufrieron daños permanentes.
	          				</Text>
	          			</Box>
	          		</Flex>
	          	</HoverCard.Content>
	          </HoverCard.Root>{" "}
            </Text>
            <Separator size="4"/>
            <Text>
	          <HoverCard.Root>
	          	<HoverCard.Trigger>
	          		<Link>
	          			<Text>Busqueda automática</Text>
	          		</Link>
	          	</HoverCard.Trigger>
	          	<HoverCard.Content maxWidth="400px">
	          		<Flex gap="4">
	          			<Box>
	          				<Heading size="3" as="h3">
                      Búsqueda automática
	          				</Heading>
	          				<Text as="div" size="2">
	          					<br/>En la pestaña de busqueda si presionas el botón 
	                    <Button variant="soft" size="1">
	                    	Infer 
	                    	<BrainIcon size="16px"/>
	        	          </Button> el sistema de manipulación de memorias detectará que estás buscando y te llevará directamente.
	          				</Text>
	          			</Box>
	          		</Flex>
	          	</HoverCard.Content>
	          </HoverCard.Root>{" "}
            </Text>
          </Flex>
        </Flex>
        
      </Flex>
      </Flex>
    </Container>
  );
}

export default Page;
