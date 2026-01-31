import FormSelector from './components/FormSelector';
import { FORM_TYPES } from './enums/form.enums';
import { getFormType } from './helpers/page.helpers';
import Link from 'next/link';
import { RoughNotation } from 'react-rough-notation';

// Props interface
interface Props {
  searchParams: Promise<{ type: string }>;
}

/**
 * Component representing a home page
 */
export default async function Page({ searchParams }: Props) {
  const { type } = await searchParams;
  const currentType = getFormType(type);

  return (
    <section className='py-32 text-center'>
      <h1>
        <RoughNotation type='highlight' show={true} color='#2563eb' animationDuration={1200}>
          <span className='w-max bg-linear-to-br from-zinc-50 to-zinc-300 bg-clip-text text-6xl font-bold text-transparent sm:text-7xl md:text-8xl'>
            Vaultify
          </span>
        </RoughNotation>
      </h1>

      {/* Menu */}
      <ul className='liquid-glass-bg mx-auto mt-8 grid w-max grid-cols-4 items-center justify-center gap-2 rounded-full p-1 text-sm sm:text-base'>
        {Object.keys(FORM_TYPES).map((key) => {
          const active = currentType === key;

          return (
            <Link
              key={key}
              href={`/?type=${key.toLowerCase()}`}
              className={`rounded-full px-4 py-1.5 tracking-wider capitalize transition-all duration-300 ease-out ${active ? 'bg-linear-to-br from-blue-500/30 to-blue-600/20 font-medium backdrop-blur-3xl' : 'text-zinc-400 hover:text-zinc-200'}`}>
              {key}
            </Link>
          );
        })}
      </ul>

      {/* Light bulb */}
      <div className='mx-auto mt-8'>
        <div className='mx-auto h-1 w-6 rounded-full bg-zinc-50' />
        <div className='mx-auto mt-3 h-20 w-20 rotate-45 bg-linear-to-br from-zinc-50 to-transparent to-50%' />
      </div>

      {/* Forms */}
      <FormSelector formType={currentType} />
    </section>
  );
}
