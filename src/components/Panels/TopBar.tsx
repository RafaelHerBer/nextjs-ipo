"use client"
import * as React from "react"
import { Box, Button, Dialog, Flex, Link, Text } from "@radix-ui/themes"
import { Book, ConstructionIcon, HelpCircle } from "lucide-react"
import { SearchBar } from "./SearchBar"

export const TopBar = () =>{
    const [search, setSearch] = React.useState("")	
	
	return (		
		<Box//onMouseOver={() => setOpen(true)}
			height="80px" width="100%"
			style={{background: "var(--gray-surface)", border: "1px solid var(--gray-5)"}}>
			<Flex //style={{background: "red"}} 
                width="100%" height="100%" direction="column" gap="6" align="center">
                <Flex //style={{background: "blue"}} 
                    height="100%" width="100%" direction="row" justify="end" align="center" gap="9" pr="9">
                    <SearchBar search={search} setSearch={setSearch} />
                    <div/>
                    <div/>
                    <Dialog.Root>
                    	<Dialog.Trigger>
                            <Button variant="ghost" color="gray">
                                <HelpCircle/>
                            </Button>
                    	</Dialog.Trigger>

                    	<Dialog.Content maxWidth="450px">
                    		<Dialog.Title>Menú de ayuda</Dialog.Title>
                    		<Dialog.Description size="2" mb="4">
                    			En construcción
                    		</Dialog.Description>

                    		<Flex direction="column" gap="3">
                    			<label>
                                    <ConstructionIcon/>
                    			</label>
                    		</Flex>

                    		<Flex gap="3" mt="4" justify="end">
                    			<Dialog.Close>
                    				<Button variant="soft" color="gray">
                    					Cancel
                    				</Button>
                    			</Dialog.Close>
                    			<Dialog.Close>
                    				<Button>Save</Button>
                    			</Dialog.Close>
                    		</Flex>
                    	</Dialog.Content>
                    </Dialog.Root>


                </Flex>
			</Flex>
		</Box>	
	)
}