"use client"

import * as React from "react"
import { Box, Button, Card, Flex, Link, Section, Text } from "@radix-ui/themes"
import { Menu, Folder, SettingsIcon, ArrowDown, ArrowUp } from "lucide-react"
import { SmallTypeIcon } from "../TypeIcon"
import { Collapsible } from "radix-ui"
import { useTransition, animated, config } from "react-spring";
import { getFileSystem, MemFolder } from "@/utils/files"

export const SideBar = () =>{
	const [open, setOpen] = React.useState(false)	
	const [container, setContainer] = React.useState(null);
	const transitions = useTransition(open, {
		from: { opacity: 1, x: 0 },
		enter: { opacity: 1, x: 0 },
		leave: { opacity: 0, x: 0 },
		config: config.default,
	});

	var foldersOpened: { 
		[folderName: string]: [
			open:boolean,
			setOpen: React.Dispatch<React.SetStateAction<boolean>>
		]  
	} = {}
	const stateForFolder = (folder: MemFolder)=>{
		foldersOpened[folder.name] = React.useState(false)
		folder.childFolders.forEach(stateForFolder);
	}
	if (typeof window == 'undefined') {
		return
	}
	let fileSystem = getFileSystem()
	stateForFolder(fileSystem.rootFolder)
	const BarElement = () => (
			<Flex direction={"column"} justify="start" height="100%" width="80px"p="4" gap="4">
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
	)
	const FolderPanel = (folderName: string, open:boolean,  path:string)=> {
		return (
			<Flex gap="2">
				<Folder/>
				<Text> {folderName} </Text>
				{open ? <ArrowDown /> : <ArrowUp />}
			</Flex>
		)
	}
	const MenuFile = (fileName: string, type:string, path:string) => {
		return (
			<Link href={path+fileName} weight="medium" key={"menufile.Link"+path}>
				<Flex gap="2">
					<div/>
					{SmallTypeIcon(type)}
					<Text> {fileName} </Text>
				</Flex>
			</Link>
		)
	}
	const MenuFolder = (folder: MemFolder,  path:string) => {	
		var subFolders: any[] = []
		var subFiles: any[] = []
		folder.childFolders.forEach(element => {
			subFolders.push(MenuFolder(element, path+folder.name+"/"))
		});	
		folder.childDatafiles.forEach(element => {
			console.log(element)
			subFiles.push(MenuFile(element.name,element.type, path+folder.name+"/"))
		})
		return (
				<Collapsible.Root
					className="CollapsibleRoot"
					open={foldersOpened[folder.name][0]}
					onOpenChange={foldersOpened[folder.name][1]}
					key={"menufolder.collapsible.root"+path}
				>
				<Box p="3" width="100%">
					<Card  variant="surface">

					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Collapsible.Trigger asChild>
							<button className="IconButton">
								{FolderPanel(folder.name, foldersOpened[folder.name][0], path+folder.name+"/")}
							</button>
						</Collapsible.Trigger>
					</div>

					<Collapsible.Content>
						<Flex direction="column">
							{
								subFolders
							}
							{
								subFiles
							}
						</Flex>
					</Collapsible.Content>
					</Card>
				</Box>
				</Collapsible.Root>
		)
	}
	const MenuElement = () =>(
		<Box height="100%" width="400px"
		//style={{background: "var(--gray-surface)"}}
		>
			<Flex
			align="start" direction="column">
				<>
					{MenuFolder(fileSystem.rootFolder, "/")}
				</>
			</Flex>
		</Box>
	)
	//if(open){
	//	return (<Open/>)
	//}
	//return (<Closed/>)
	return (		
		<Box //onMouseOver={() => setOpen(true)}
			height="100%" width={!open ? "80px": "500px"}
			style={{background: "var(--gray-surface)", border: "1px solid var(--gray-5)"}}>
			<Flex gap="0">
				<BarElement/>
				{
					transitions((styles, item) =>
						item ? (
							<div>
								<Section height="230px"/>
								<animated.div style={styles}>
									<MenuElement/>
								</animated.div>
							</div>
						) : null,
					)
				}
			</Flex>
		</Box>	
	)
}