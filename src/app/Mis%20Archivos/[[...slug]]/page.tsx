import { FileCard, FolderCard } from "@/components/FileCards";
import { FileDisplay } from "@/components/FileDisplay";
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
    var path: string = "Mis Archivos/"
    if(slug){
      slug.forEach(folder => {
        path += folder.replaceAll("%20", " ")
      })
    }
    return (
      <Box width="100%" height="100%" py="5">
        <Flex>
          <FileDisplay pathString={path}/>
        </Flex>
      </Box>
    );
  }
  
  export default Page;
  