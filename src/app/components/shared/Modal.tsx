import { ReactNode, useEffect } from 'react';

export interface ModalProps {
  title: string,
  content: ReactNode
  bottom?: ReactNode
  isOpen: boolean
  onClose: () => void
  width?: string
}

export default function Modal({ 
  title,
  content,
  bottom,
  isOpen,
  onClose,
  width = "sm:w-9/12 lg:w-6/12" 
} : ModalProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    }

    return () => document.body.classList.remove("overflow-hidden")
  }, [isOpen])
  
  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div 
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className={`bg-white rounded-lg ${width} shadow-sm mx-4 p-4`}>
        <div className="flex justify-between items-center p-1 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          {content}
        </div>
        {bottom ? (
          <div className="flex justify-end p-4 border-t">
            {bottom}
          </div>
        ) : null}
      </div>
    </div>
  )
}