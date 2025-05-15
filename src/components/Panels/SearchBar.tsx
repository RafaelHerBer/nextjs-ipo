"use client"
import * as React from "react"
import { Box, TextField } from "@radix-ui/themes"
import { Search } from "lucide-react"

type SearchBarProps = {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
  }
  
export const SearchBar:React.FC<SearchBarProps> = ({search, setSearch} )=>{
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Redirect to /search/?query=...
        window.location.href = `/search/?query=${encodeURIComponent(search)}`
      }
    return (
        <Box width="1000px" asChild>
        <form onSubmit={handleSubmit}>
            <TextField.Root placeholder="Search" radius="full" size="3"
                value={search} onChange={(e)=>{
                    setSearch(e.target.value)
                }}
                type="search">
                <TextField.Slot>
                    <Search height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
        </form>
        </Box>
    )
}