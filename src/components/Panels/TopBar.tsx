"use client"
import * as React from "react"
import { Box, Button, Flex, Link } from "@radix-ui/themes"
import { Book } from "lucide-react"
import { SearchBar } from "./SearchBar"

export const TopBar = () =>{
    const [search, setSearch] = React.useState("")	
	
	return (		
		<Box//onMouseOver={() => setOpen(true)}
			height="80px" width="100%"
			style={{background: "var(--gray-surface)", border: "1px solid var(--gray-5)"}}>
			<Flex //style={{background: "red"}} 
                width="100%" height="100%" direction="column" gap="6" align="end">
                <Flex //style={{background: "blue"}} 
                    height="100%" width="100%" direction="row" justify="end" align="center" gap="9" pr="8">
                    <SearchBar search={search} setSearch={setSearch} />
                    <div/>
                    <Button variant="soft"
                        radius="large" asChild>
                        <Box width="64px" height="64px"  asChild>
                            <Link href="/" > 
                                <Book size="46px"/>
                            </Link>
                        </Box>
                    </Button>
                </Flex>
			</Flex>
		</Box>	
	)
}