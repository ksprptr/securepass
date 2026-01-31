import { ExtendedProps } from '@/common/types/global.types';

import * as iconsOutlined from '@heroicons/react/24/outline';
import * as iconsSolid from '@heroicons/react/24/solid';

// Props interface
interface Props extends ExtendedProps {
  icon: string;
  type?: 'solid' | 'outlined';
  onClick?: () => void;
}

/**
 * Component representing an icon
 */
export default function Icon({ icon, className, onClick, type = 'outlined', ...props }: Props) {
  if (!icon) {
    return null;
  }

  const iconSet = type === 'outlined' ? iconsOutlined : iconsSolid;
  const globalClassName = `h-4 w-4 ${onClick ? 'cursor-pointer' : ''} ${className}`;

  // @ts-ignore
  const Component = iconSet[`${icon}Icon`];

  if (!Component) {
    return <iconsOutlined.QuestionMarkCircleIcon className={globalClassName} {...props} />;
  }

  return (
    <Component {...(onClick ? { onClick: onClick } : {})} className={globalClassName} {...props} />
  );
}
