import Link from 'next/link';
import Button, { ButtonProps } from '@/components/common/Button';

// Props interface
interface Props extends ButtonProps {
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

/**
 * Component representing a link button
 */
export default function LinkButton({
  type = 'button',
  variant = 'normal',
  styleType = 'solid',
  rounded = false,
  href,
  target = '_self',
  onClick,
  className,
  style,
  children,
}: Props) {
  return (
    <Link href={href} target={target}>
      <Button
        type={type}
        variant={variant}
        styleType={styleType}
        rounded={rounded}
        onClick={onClick}
        className={className}
        style={style}>
        {children}
      </Button>
    </Link>
  );
}
