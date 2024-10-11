export interface TituloProps {
  main: string
  secondary?: string
}

export default function Title({ main, secondary } : TituloProps) {
  return (
    <div className="flex gap-2 flex-col">
      <h1 className="text-2xl font-black">{main}</h1>
      {secondary ?? <h2 className="text-zinc-400">{secondary}</h2>}
    </div>
  )
}