import { ReactNode } from 'react';
import Menu from './Menu'

export interface InnerPageProps {
  children?: ReactNode
  className?: string
}

export default function InnerPage({ children, className } : InnerPageProps) {
  return (
    <div className="flex bg-gray-100">
      <Menu/>
      <main className={`flex-1 p-7 ${className ?? ''}`}>
        {children}
      </main>
    </div>
  )
}