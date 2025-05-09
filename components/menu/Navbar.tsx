import Link from 'next/link';
import Layout from '@/components/layouts/Layout';
import MotionDiv from '@/components/common/MotionDiv';
import { navLinks } from '@/utils/data/links-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useOnClickOutside } from '@/utils/hooks/useOnClickOutside';
import { useEffect, useRef, useState } from 'react';

/**
 * Component representing a navbar
 */
export default function Navbar() {
  const [navbar, setNavbar] = useState<boolean>(false);
  const [colorChange, setColorChange] = useState<boolean>(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setNavbar(false));

  // Change navbar color on scroll
  const changeNavbarColor = () => {
    if (window.scrollY >= 1) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  // Add event listener on mount
  useEffect(() => window.addEventListener('scroll', changeNavbarColor), []);

  return (
    <header className={`bg-zinc-100 text-zinc-800 z-10 fixed w-full ${colorChange && 'shadow-xl'}`}>
      <Layout>
        <div ref={navRef}>
          {/* Desktop navbar */}
          <div className='py-6 text-xl flex items-center justify-between z-30'>
            <Link
              href='/'
              className='font-medium italic text-2xl hover:scale-105 duration-500 select-none'>
              Securepass
            </Link>
            <ul className='md:flex hidden gap-x-8'>
              {navLinks.map((navLink, i) => (
                <li key={i}>
                  <Link href={navLink.href} className='hover:underline select-none'>
                    {navLink.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className='md:hidden flex text-2xl'>
              <FontAwesomeIcon
                icon={navbar ? faXmark : faBars}
                onClick={() => setNavbar(!navbar)}
              />
            </div>
          </div>

          {/* Mobile navbar */}
          <MotionDiv
            initialHeight={0}
            animateHeight={navbar ? 'auto' : 0}
            duration={0.2}
            className='flex-col gap-y-2 text-right text-xl bg-zinc-100 overflow-hidden'>
            <ul>
              {navLinks.map((navLink, i) => (
                <li key={i} className={i === navLinks.length - 1 ? 'mb-4' : ''}>
                  <Link
                    href={navLink.href}
                    onClick={() => setNavbar(false)}
                    className='hover:underline select-none'>
                    {navLink.label}
                  </Link>
                </li>
              ))}
            </ul>
          </MotionDiv>
        </div>
      </Layout>
    </header>
  );
}
