import { ToolType } from '../enums/tools.enums';
import ToolGroups from './ToolGroups';

interface Props {
  currentType: ToolType;
}

/**
 * Component representing the dashboard sidebar — the tool rail pinned to the left edge
 **/
// Desktop only; below `lg` the same groups are rendered by `MobileDrawer`.
export default function ToolSidebar({ currentType }: Props) {
  return (
    <aside className='fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-zinc-200 bg-zinc-100/90 backdrop-blur-sm lg:flex dark:border-zinc-800 dark:bg-zinc-900/80'>
      {/* Scrolls on its own, so a short viewport never hides the last category. */}
      <nav aria-label='Tools' className='flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-10'>
        <ToolGroups currentType={currentType} />
      </nav>
    </aside>
  );
}
