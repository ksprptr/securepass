'use client';

interface Props {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
  disabled?: boolean;
}

/**
 * Component representing a labeled switch
 **/
export default function Toggle({ label, checked, onChange, hint, disabled }: Props) {
  return (
    <div className={`flex items-start justify-between gap-4 ${disabled ? 'opacity-50' : ''}`}>
      <span className='text-left'>
        <span className='block text-sm font-medium text-zinc-600 dark:text-zinc-400'>{label}</span>
        {hint && <span className='block text-xs text-zinc-400 dark:text-zinc-500'>{hint}</span>}
      </span>

      <button
        type='button'
        role='switch'
        aria-label={label}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ease-out ${
          checked ? 'bg-amber-600' : 'bg-zinc-300 dark:bg-zinc-700'
        }`}>
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  );
}
