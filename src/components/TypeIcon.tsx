import { Flex, Text} from "@radix-ui/themes"
import { Brain, File} from "lucide-react"

import * as React from "react"
export const TypeIcon = (type: string) => {
    switch(type){
        case "Memory":
            return(
                <Flex direction="column" justify="center">
                    <Brain size="16"/>
                </Flex>
            )
        case "Document":
            return(
                <Flex direction="column" justify="center">
                    <File size="16"/>
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