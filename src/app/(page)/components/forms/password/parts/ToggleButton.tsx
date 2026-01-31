'use client';

// Props interface
interface Props {
  text: string;
  toggled: boolean;
  onToggle?: () => void;
  disabled?: boolean;
}

/**
 * Component representing a toggle button in the password generation form
 */
export default function ToggleButton({ text, toggled, onToggle, disabled }: Props) {
  return (
    <div className={`flex items-center justify-between gap-x-2 ${disabled ? 'opacity-50' : ''}`}>
      <span className='text-zinc-400'>{text}</span>

      <button
        type='button'
        onClick={onToggle}
        disabled={disabled}
        className={`relative h-5 w-10 rounded-full transition-colors duration-300 ease-out ${toggled ? 'bg-blue-500' : 'bg-zinc-800'}`}>
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-linear-to-r from-zinc-50 to-zinc-200 shadow-md transition-transform duration-300 ease-out ${
            toggled ? 'translate-x-5' : ''
          }`}></span>
      </button>
    </div>
  );
}
