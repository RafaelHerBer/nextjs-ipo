"use client"
import { v4 as uuidv4 } from 'uuid';


export interface MemFile {
    name:string ;
    date: Date;
    readonly fileType: string;
    id: string;
}
export class MemFolder implements MemFile{
    public name: string;
    public date: Date = new Date()
    public fileType: string = "folder"
    id: string = uuidv4();
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
    readonly fileType: string = "datafile"
    id: string = uuidv4();

    readonly type = "document";
    content: string;
    constructor (name:string, content: string){
        this.name = name
        this.content = content
    }
}
export class MemMemory implements MemDatafile{
    name: string;
    public date: Date = new Date();

    readonly fileType: string = "datafile"
    id: string = uuidv4();

    readonly type = "memory";
    description: string;
    constructor (name:string, description: string){
        this.name = name
        this.description = description
    }
}
export const saveFileSystem = (fileSystem:{rootFolder:MemFolder,fileList:{[id: string]: {file:MemFile,path:string, parentId: string|undefined}} })=>{
    if(typeof window !== "undefined"){
        window.localStorage.setItem("rootfolder", JSON.stringify(fileSystem.rootFolder))
        window.localStorage.setItem("filelist", JSON.stringify(fileSystem.fileList))
    }
}
export const deleteFile = (file: MemFile)=>{
    const fileSystem = getFileSystem()
    console.log("deleting",file)
    var entry=fileSystem.fileList[file.id]
    if(!entry.parentId){
     
        return
    }
    var parent = fileSystem.fileList[entry.parentId].file as MemFolder
    parent.childFolders.forEach( (elem,indx)=>{
        if(elem.id == file.id)parent.childFolders.splice(indx,1);
    })
    for(var key in fileSystem.fileList){
        if(fileSystem.fileList[key].parentId == file.id)
            deleteFile(fileSystem.fileList[key].file)
    }
    delete fileSystem.fileList[file.id]
    saveFileSystem(fileSystem)
}
export const addFile = (file:MemFile, parent:MemFolder,
    fileSystem?:{rootFolder:MemFolder,fileList:{[id: string]: {file:MemFile,path:string, parentId: string|undefined}} }, notSave?:void)=>
{
    if(!fileSystem){
        fileSystem=getFileSystem();
    }
    var dataFile:MemDatafile = file as MemDatafile
    console.log("Whatisit",dataFile)
    if(file.fileType=="datafile"){
        console.log("isDataFile",dataFile)
        parent.childDatafiles.push(dataFile)
        var path = fileSystem.fileList[parent.id].path + "/" + dataFile.name
        fileSystem.fileList[file.id]={file:dataFile,path:path,parentId:parent.id};
        if(!notSave){
            saveFileSystem(fileSystem);
            console.log("Saving to cookie")
        } 
        return
    }
    var folder = file as MemFolder
    if(file.fileType=="folder"){
        parent.childFolders.push(folder)
        var path = fileSystem.fileList[parent.id].path + "/" + folder.name
        fileSystem.fileList[file.id]={file:folder,path:path,parentId:parent.id};
        if(!notSave){
            saveFileSystem(fileSystem);
            console.log("Saving to cookie")
        } 
        return
    }
    throw new Error("File not valid error");
}
export type MemFileSystem = {rootFolder:MemFolder,fileList:{[id: string]: {file:MemFile,path:string, parentId: string|undefined}} }
export const getDefaultFileSystem = ()=>{
    var DefaultFileList: {[id: string]: {file:MemFile,path:string, parentId: string|undefined}} = {}
    var DefaultRootFolder: MemFolder = new MemFolder("Mis Archivos");
    DefaultFileList[DefaultRootFolder.id]={file:DefaultRootFolder,path:"Mis Archivos", parentId:undefined}
    var DefaultFileSystem = {rootFolder: DefaultRootFolder, fileList:DefaultFileList}

    var defaultFolder: MemFolder = new MemFolder("Carpeta por defecto");
    addFile(defaultFolder,DefaultRootFolder,DefaultFileSystem, )

    var defaultDocument: MemDocument = new MemDocument("Documento por defecto", " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur aliquam lectus, id scelerisque metus fermentum in. Vivamus iaculis lectus eget eros semper, in tempus enim feugiat. ")
    addFile(defaultDocument, defaultFolder, DefaultFileSystem, );
    var defaultSubFolder: MemFolder = new MemFolder("Subcarpeta por defecto");
    addFile(defaultSubFolder, defaultFolder, DefaultFileSystem, )
    var defaultMemory: MemMemory = new MemMemory("Memoria por defecto", " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur aliquam lectus, id scelerisque metus fermentum in. Vivamus iaculis lectus eget eros semper, in tempus enim feugiat. ")
    addFile(defaultMemory, defaultSubFolder, DefaultFileSystem, )
    return DefaultFileSystem
}
export const getFileSystem:()=>{rootFolder:MemFolder,fileList:{[id: string]: {file:MemFile,path:string, parentId: string|undefined}} }  = () => {
	var rootFolder: MemFolder | undefined;
    var fileList: {[id: string]: {file:MemFile,path:string, parentId: string|undefined}} = {}
    if(typeof window !== "undefined"){
        let cookieRootFolder = window.localStorage.getItem("rootfolder")
        let cookieFileList = window.localStorage.getItem("filelist")
        if(!cookieRootFolder || !cookieFileList){
            var defaultFileSystem = getDefaultFileSystem()
            saveFileSystem(defaultFileSystem)
            return defaultFileSystem
        }
        rootFolder = JSON.parse(cookieRootFolder)
        fileList = JSON.parse(cookieFileList)
    
        if(!rootFolder || !fileList){
            var defaultFileSystem = getDefaultFileSystem()
            saveFileSystem(defaultFileSystem)
            return defaultFileSystem
        }
        console.log({rootFolder:rootFolder, fileList:fileList})
        return {rootFolder:rootFolder, fileList:fileList}
    }
    var defaultFileSystem = getDefaultFileSystem()
    saveFileSystem(defaultFileSystem)
    return defaultFileSystem
}
/* Cant use this, cookies too large

export const getFileSystem:()=>{rootFolder:MemFolder,fileList:{[id: string]: {file:MemFile,path:string}} }  = () => {
	var rootFolder: MemFolder | undefined;
    var fileList: {[id: string]: {file:MemFile,path:string}} = {}
    
    let cookieRootFolder = cookie.default.get("rootfolder")
    let cookieFileList = cookie.default.get("filelist")
    if(!cookieRootFolder || !cookieFileList){
        var defaultFileSystem = getDefaultFileSystem()
        saveFileSystem(defaultFileSystem)
        return defaultFileSystem
    }
    rootFolder = JSON.parse(cookieRootFolder)
    var list: string[] = JSON.parse(cookieFileList)

    if(!rootFolder || !list){
        var defaultFileSystem = getDefaultFileSystem()
        saveFileSystem(defaultFileSystem)
        return defaultFileSystem
    }
    for(var key in list){
        var fileString = cookie.default.get("files:"+key)
        if(!fileString){
            var defaultFileSystem = getDefaultFileSystem()
            saveFileSystem(defaultFileSystem)
            return defaultFileSystem
        }
        var file: {file:MemFile,path:string} | undefined = JSON.parse(fileString)
        if(!file){
            var defaultFileSystem = getDefaultFileSystem()
            saveFileSystem(defaultFileSystem)
            return defaultFileSystem
        }
        fileList[key]=file
    }
    console.log({rootFolder:rootFolder, fileList:fileList})
    return {rootFolder:rootFolder, fileList:fileList}
}*/