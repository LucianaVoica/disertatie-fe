import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { LuLogOut, LuUser } from 'react-icons/lu';

export default function user() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={'icon'}>
          <LuUser className={'w-5 h-5'} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>Contul meu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LuLogOut className="mr-2 h-4 w-4" />
          <span>Deconectare</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
