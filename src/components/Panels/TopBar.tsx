"use client"
import * as React from "react"
import { Box, Button, Card, Flex, Link, Section, Separator, Text, TextField, Theme } from "@radix-ui/themes"
import { Menu, Folder, SettingsIcon, ArrowDown, ArrowUp, File, FileIcon, Search, Book } from "lucide-react"
import { SmallTypeIcon } from "../TypeIcon"
import { Collapsible, Dialog } from "radix-ui"
import { Container, root } from "postcss"
import { Row } from "@radix-ui/themes/src/components/table.jsx"
import { useTransition, animated, config } from "react-spring";
import { DefaultFilesystem, getFileSystem, MemFolder } from "@/utils/files"
import { wrap } from "module"
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