'use client'
import { InputHTMLAttributes } from 'react'

export interface InputTextoProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

export default function InputTexto(props: InputTextoProps) {
    return (
        <div className="flex flex-col space-y-2">
            <label>{props.label}</label>
            <input {...props} className="p-2 rounded-md outline-none bg-gray-300" />
        </div>
    )
}