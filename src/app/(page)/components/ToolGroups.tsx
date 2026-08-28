import Icon from '@/components/common/Icon';

import { TOOL_GROUPS } from '../data/tools.data';
import { ToolType } from '../enums/tools.enums';
import Link from 'next/link';

interface Props {
  currentType: ToolType;
  /** Called after a tool is picked — the drawer closes itself that way. */
  onSelect?: () => void;
}

/**
 * Component representing the grouped tool links, shared by the sidebar and the mobile nav
 **/
export default function ToolGroups({ currentType, onSelect }: Props) {
  return TOOL_GROUPS.map((group) => (
    <div key={group.category}>
      <p className='mb-2 px-3 text-xs font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500'>
        {group.category}
      </p>

      <ul className='flex flex-col gap-1'>
        {group.tools.map((tool) => {
          const active = currentType === tool.type;

          return (
            <li key={tool.type}>
              <Link
                href={`/?tool=${tool.type}`}
                scroll={false}
                onClick={onSelect}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out ${
                  active
                    ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/30'
                    : 'text-zinc-600 hover:bg-zinc-200/70 dark:text-zinc-300 dark:hover:bg-zinc-800'
                }`}>
                <Icon
                  icon={tool.icon}
                  className={`h-4 w-4 shrink-0 ${active ? '' : 'text-zinc-400 dark:text-zinc-500'}`}
                />
                {tool.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  ));
}
