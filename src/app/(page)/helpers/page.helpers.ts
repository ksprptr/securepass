import { DEFAULT_TOOL, TOOLS } from '../data/tools.data';
import { ToolType } from '../enums/tools.enums';
import { ToolMenuItem } from '../types/tools.types';

/**
 * Function to get a tool type from search parameters
 **/
export const getToolType = (tool: string | undefined): ToolType => {
  if (!tool) return DEFAULT_TOOL;

  return TOOLS.find((item) => item.type === tool.toLowerCase())?.type ?? DEFAULT_TOOL;
};

/**
 * Function to get the menu entry of a tool
 **/
export const getTool = (type: ToolType): ToolMenuItem =>
  TOOLS.find((item) => item.type === type) ?? TOOLS[0];
