import { Loader } from 'lucide-react';

export interface ActionButtonProps {
  title: string
  onClick?: () => void
  onSubmit?: () => void
  extraStyle?: string
  isLoading?: boolean
}

export default function ActionButton({ 
  title, 
  onClick, 
  onSubmit, 
  extraStyle, 
  isLoading = false 
} : ActionButtonProps) {
  return (
    <button
      className={`${extraStyle} py-2 border border-black rounded-md hover:bg-black hover:text-white`}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {title} {isLoading ? (
        <Loader size={20} className="animate-spin"/>
      ) : null}
    </button>
  )
}