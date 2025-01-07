import { getVariant } from '@/utils/functions/button-functions';
import { ExtendedProps } from '@/utils/types/global-types';

// Props interface
export interface ButtonProps extends ExtendedProps {
  variant?: 'primary' | 'danger' | 'normal';
  type?: 'button' | 'submit' | 'reset';
  styleType?: 'solid' | 'outline';
  disabled?: boolean;
  rounded?: boolean;
  onClick?: () => void;
}

/**
 * Component representing a button
 */
export default function Button({
  variant = 'normal',
  styleType = 'solid',
  type = 'button',
  disabled,
  rounded = false,
  onClick,
  className,
  style,
  children,
}: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`${getVariant(variant, styleType)} ${
          rounded ? 'rounded-full' : 'rounded-md'
        } px-4 py-2 font-medium duration-150 select-none disabled:opacity-50 ${className}`}
        style={style}
        disabled={disabled}>
        {children}
      </button>
    </>
  );
}
