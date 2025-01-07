import Link from 'next/link';
import Layout from '@/components/layouts/Layout';

/**
 * Component representing a footer
 */
export default function Footer() {
  return (
    <footer className='bg-zinc-100 text-zinc-800'>
      <Layout>
        <div className='flex flex-col justify-center py-6 text-center'>
          <span>&copy; Securepass {new Date().getFullYear()}</span>
          <span>
            Created by{' '}
            <Link
              href='https://ksprptr.dev'
              target='_blank'
              className='text-blue-600 hover:underline select-none'>
              Petr Kašpar
            </Link>
          </span>
          <span>
            Designed by:{' '}
            <Link
              href='https://www.vecteezy.com/free-vector/central-europe-map'
              className='select-none'>
              Central Europe Map Vectors by Vecteezy
            </Link>
          </span>
        </div>
      </Layout>
    </footer>
  );
}
