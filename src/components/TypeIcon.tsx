import { Flex, Text} from "@radix-ui/themes"
import { Brain, File, Folder} from "lucide-react"

import * as React from "react"
export const SmallTypeIcon = (type: string) => {
    switch(type){
        case "memory":
            return(
                <Flex direction="column" justify="center">
                    <Brain size="16"/>
                </Flex>
            )
        case "document":
            return(
                <Flex direction="column" justify="center">
                    <File size="16"/>
                </Flex>
            )
        case "folder":
            return(
                <Flex direction="column" justify="center">
                    <Folder size="16"/>
                </Flex>
            )
        default:
            return(
                <Flex direction="column">
                    <File/>
                    <Text size="1">{type.substring(0,2)}</Text>
                </Flex>
            )

    }
}

type TypeIconProps = {
    type: string
}
export const TypeIcon:React.FC<TypeIconProps> = ({type}) => {
    switch(type){
        case "memory":
            return(
                <Flex direction="column" justify="center">
                    <Brain />
                </Flex>
            )
        case "document":
            return(
                <Flex direction="column" justify="center">
                    <File />
                </Flex>
            )
        case "folder":
            return(
                <Flex direction="column" justify="center">
                    <Folder />
                </Flex>
            )
        default:
            return(
                <Flex direction="column">
                    <File/>
                    <Text >{type.substring(0,2)}</Text>
                </Flex>
            )

    }
}