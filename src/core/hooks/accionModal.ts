import { useState } from "react"

export const  accionModal = ()=>{
    const [isOpen, setIsOpen] =useState(false)
    const closeModal= ()=> setIsOpen(false)
    const openModal= ()=> setIsOpen(true)
    return {isOpen, setIsOpen, closeModal ,openModal }
}