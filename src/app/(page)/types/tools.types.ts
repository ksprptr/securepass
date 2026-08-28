import { IconName } from '@/components/common/Icon';

import { ToolCategory, ToolType } from '../enums/tools.enums';

export interface ToolMenuItem {
  type: ToolType;
  /** Short label used in the navigation pill. */
  label: string;
  /** Full name shown as the tool heading. */
  title: string;
  /** One-line explanation shown under the heading and in the tool listing. */
  description: string;
  icon: IconName;
}

export interface ToolGroup {
  category: ToolCategory;
  tools: ToolMenuItem[];
}

export interface SelectOption<T> {
  value: T;
  label: string;
  /** One-line explanation shown under the select for the picked option. */
  hint?: string;
}
