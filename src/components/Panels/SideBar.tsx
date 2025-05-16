"use client"

import * as React from "react"
import { Box, Button, Card, Flex, Link, Section, Text, Theme, Dialog } from "@radix-ui/themes"
import { Menu, Folder, SettingsIcon, ArrowDown, ArrowUp, LinkedinIcon, ChevronDown, ChevronUp, Book, ChevronRight, ConstructionIcon } from "lucide-react"
import { SmallTypeIcon } from "../TypeIcon"
import { Collapsible,  } from "radix-ui"
import { useTransition, animated, config } from "react-spring";
import { getFileSystem, MemFolder } from "@/utils/files"

export const SideBar = () =>{
	const [open, setOpen] = React.useState(false)	
	const [settingsOpen, setSettingsOpen] = React.useState(false)
	const transitions = useTransition(open, {
		from: { opacity: "0%" },
		enter: { opacity: "100%"},
		leave: { opacity: "0%" },
		config: config.default,
	});

	var foldersOpened: { 
		[folderName: string]: [
			open:boolean,
			setOpen: React.Dispatch<React.SetStateAction<boolean>>
		]  
	} = {}
	const stateForFolder = (folder: MemFolder)=>{
		foldersOpened[folder.name] = React.useState(true)
		folder.childFolders.forEach(stateForFolder);
	}
	if (typeof window == 'undefined') {
		return
	}
	let fileSystem = getFileSystem()
	stateForFolder(fileSystem.rootFolder)
	const BarElement = () => (
			<Flex direction={"column"} justify="start" height="100%" width="children"align="start" p="4" gap="4">
				<Section size="4"/>
				<Flex direction={"column"}  gap="5">
					<Button // style={{background: "var(--accentColor)"}}
						variant="ghost" //onClick={()=>setOpen(true)}
					asChild>
						<Link href="/Mis Archivos">
							<Folder size="32px"/>
						</Link>
					</Button>
					<Section height="510px"/>
					<Dialog.Root>
						<Dialog.Trigger>
							<Button variant="ghost">
								<SettingsIcon size="32px"/>
							</Button>
						</Dialog.Trigger>

						<Dialog.Content maxWidth="450px">
							<Dialog.Title>Ajustes</Dialog.Title>
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
	)
	const FolderPanel = (folderName: string, open:boolean,
		setOpen:React.Dispatch<React.SetStateAction<boolean>>,  path:string)=> {
		return (
			<Flex gap="2">
				<Button onClick={()=>setOpen(!open)} variant="ghost" size="1">
					{open ? <ChevronDown /> : <ChevronUp />}
				</Button>
				<Link  href={path} color="gold">
					<Flex gap="2">
							<Folder/>
							<Text> {folderName} </Text>
					</Flex>
				</Link>
			</Flex>
		)
	}
	const MenuFile = (fileName: string, type:string, path:string) => {
		return (
			<Link href={path+fileName} weight="medium" key={"menufile.Link"+path}>
				<Flex gap="2" px="6">
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
					key={"menufolder.collapsible.root"+folder.id}
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
						<div className="IconButton">
							{FolderPanel(folder.name, foldersOpened[folder.name][0],
								foldersOpened[folder.name][1], path+folder.name+"/")}
						</div>
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
		<Box height="100%" width="children"
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
	const OpenIndicator = () => {
		if(open){
			return (
				<Flex width="60px" justify="center">
					<ChevronDown/>
				</Flex>
			)
		}
		else{
			return (
				<Flex width="60px" justify="center">
					<ChevronRight/>
				</Flex>
			)
		}
	}
	//if(open){
	//	return (<Open/>)
	//}
	//return (<Closed/>)
	const HomeButton = ()=>{
		if(open){
			return(
				<Button variant="soft" onClick={()=>window.location.href="/"}
					radius="large" asChild>
					<Box width="children" height="60px">
						<Book size="36px"/>
						<Text> Memorium </Text>
					</Box>
				</Button>
			)
		}
		return(
			<Button variant="soft" onClick={()=>window.location.href="/"}
				radius="large" asChild>
					<Box width="60px" height="60px">
						<Book size="36px"/>
					</Box>
			</Button>
		)
	}	
	const PosibleBar = ()=>{
		if(open)
		return(
			transitions((styles, item) =>
				item ? (
					<>
						<Section height="170px"/>
						<animated.div style={styles}>
							<MenuElement/>
						</animated.div>
					</>
				) : null,
			)
		)
		return (<></>)
	}
	return (	
		<Theme radius="none">	
			<Box onMouseOver={() => setOpen(true)} onMouseLeave={()=>setOpen(false)}
				height="100%" width="children" // width={!open ? "100px": "children"}
				asChild>
				<Card>
				<Theme radius="medium">
					<HomeButton/>
					<OpenIndicator/>
					<Flex gap="0" width="100%">
						<Flex direction="column" justify="center">
							<BarElement/>
						</Flex>
						<PosibleBar/>
					</Flex>
				</Theme>
				</Card>
			</Box>	
		</Theme>
	)
}