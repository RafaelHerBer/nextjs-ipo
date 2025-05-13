"use client"

import * as React from "react"
import { Box, Button, Flex, Section, Separator, Text, TextField, Theme } from "@radix-ui/themes"
import { Menu, Folder, SettingsIcon } from "lucide-react"
import { Dialog } from "radix-ui"
import { Container, root } from "postcss"
import { Row } from "@radix-ui/themes/src/components/table.jsx"
import { useTransition, animated, config } from "react-spring";

export const SideBar = ({ children }: { children: React.ReactNode }) =>{
	const [open, setOpen] = React.useState(false)	
	const [container, setContainer] = React.useState(null);
	const transitions = useTransition(open, {
		from: { opacity: 1, x: -80 },
		enter: { opacity: 1, x: 80 },
		leave: { opacity: 0, x: -80 },
		config: config.default,
	});

	const BarElement = () => (
		<Flex align="center" direction="column" >
			<Flex direction={"column"} justify="start" height="100%" p="4" gap="4">
				<Button // style={{background: "var(--accentColor)"}}
					variant="ghost" onClick={()=>setOpen(!open)}
				>
					<Menu size="46px"/>
				</Button>
				<Section size="4"/>
				<Flex direction={"column"}  gap="5">
					<Button // style={{background: "var(--accentColor)"}}
						variant="ghost" onClick={()=>setOpen(true)}
					>
						<Folder size="32px"/>
					</Button>
					<Button // style={{background: "var(--accentColor)"}}
						variant="ghost" onClick={()=>setOpen(true)}
					>
						<SettingsIcon size="32px"/>
					</Button>
				</Flex>
			</Flex>
		</Flex>
	)
	const MenuElement = () =>(
		<Flex height="100%" width="400px"  
		align="center" direction="column">
			<Text>AWD</Text>
			<Separator/>
			<Section/>			
			<Separator/>
			<Text>AWD</Text>
		</Flex>
	)
	//if(open){
	//	return (<Open/>)
	//}
	//return (<Closed/>)
	return (		
		<Box //onMouseOver={() => setOpen(true)}
			height="100%" width={!open ? "80px": "480px"}
			style={{background: "var(--gray-surface)"}}>
			<Flex align="center" direction="row">
				<BarElement/>
				{transitions((styles, item) =>
					item ? (
						<>
							<animated.div style={styles}>
								<MenuElement/>
							</animated.div>
						</>
					) : null,
				)}
			</Flex>
		</Box>	
	)
}