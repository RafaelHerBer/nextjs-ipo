"use client"
export interface MemFile {
    name:string ;
    date: Date;
    readonly fileType: string;
}
export class MemFolder implements MemFile{
    public name: string;
    public date: Date = new Date()
    public fileType: string = "Folder"
    public childFolders: MemFolder[]
    public childDatafiles: MemDatafile[] = []
    constructor (name:string, folders?: MemFolder[]){
        this.name = name
        this.childFolders = []
        if(folders){
            this.childFolders = folders
            //console.log(this,this.childFolders)
        }
    }
}
export interface MemDatafile extends MemFile{
    readonly type: string;
}
export class MemDocument implements MemDatafile{
    name: string;
    public date: Date = new Date();
    readonly fileType: string = "Datafile"

    readonly type = "Document";
    content: string;
    constructor (name:string, content: string){
        this.name = name
        this.content = content
    }
}

export class MemMemory implements MemDatafile{
    name: string;
    public date: Date = new Date();

    readonly fileType: string = "Datafile"

    readonly type = "Memory";
    description: string;
    constructor (name:string, description: string){
        this.name = name
        this.description = description
    }
}
var defaultFolder: MemFolder = new MemFolder("Carpeta por defecto");
var defaultDocument: MemDocument = new MemDocument("Documento por defecto", " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur aliquam lectus, id scelerisque metus fermentum in. Vivamus iaculis lectus eget eros semper, in tempus enim feugiat. ")
var defaultMemory: MemMemory = new MemMemory("Memoria por defecto", " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur aliquam lectus, id scelerisque metus fermentum in. Vivamus iaculis lectus eget eros semper, in tempus enim feugiat. ")
var defaultSubFolder: MemFolder = new MemFolder("Subcarpeta por defecto");
defaultSubFolder.childDatafiles.push(defaultMemory);
defaultFolder.childFolders.push(defaultSubFolder);
defaultFolder.childDatafiles.push(defaultDocument);
export var DefaultFilesystem: MemFolder = new MemFolder("Mis Archivos", [defaultFolder]);
export const getFileSystem = () => {
	var fileSystem: MemFolder;
    if(typeof window !== 'undefined'){
    	var local = localStorage.getItem("fileSystem")
    	if (local){
    		fileSystem = JSON.parse(local);
    	}else{
    		fileSystem = DefaultFilesystem
    		localStorage.setItem("fileSystem", JSON.stringify(DefaultFilesystem))
    	}
        return fileSystem
    }
    return DefaultFilesystem
}
export const saveFileSystem = (fileSystem:MemFile)=>{
    if(typeof window !== 'undefined'){
        fileSystem.name = "Mis Archivos"
    	var local = localStorage.setItem("fileSystem", JSON.stringify(fileSystem))

    }
}