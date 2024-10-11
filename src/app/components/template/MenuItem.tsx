import Link from "next/link";
import { ElementType } from "react";

export interface MenuItemProps {
  icone?: ElementType;
  texto: string;
  url: string;
}

export function MenuItem({ icone: Icon, texto, url }: MenuItemProps) {
  return (
    <Link
      href={url}
      aria-label={texto}
      className="group flex flex-col w-full items-center sm:flex-row sm:items-start gap-2 px-4 py-2 hover:bg-gray-600 text-white transition-all"
    >
      {Icon && <Icon className="w-6 h-6" aria-hidden="true" />}
      <span className="hidden sm:inline-block group-hover:block text-sm">
        {texto}
      </span>
    </Link>
  );
}

export default MenuItem;
