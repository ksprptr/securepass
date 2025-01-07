import Image from 'next/image';
import Button from '@/components/common/Button';
import Layout from '@/components/layouts/Layout';
import Heading from '@/components/common/Heading';
import MotionDiv from '@/components/common/MotionDiv';
import Paragraph from '@/components/common/Paragraph';
import LinkButton from '@/components/common/LinkButton';

/**
 * Component representing a home page
 */
export default function HomePage() {
  return (
    <>
      <section className='bg-gradient-to-r from-blue-600 to-blue-500'>
        {/* Home section */}
        <Layout>
          <div className='flex lg:flex-row flex-col items-center justify-between gap-x-8 md:pt-72 md:pb-0 pt-56 pb-24 md:text-left text-center'>
            <MotionDiv>
              <Heading size='1' className='text-zinc-50 font-semibold'>
                Securepass
              </Heading>
              <Heading size='3' className='italic text-zinc-100 pt-8'>
                Adjustable password generator
              </Heading>
              <Button
                rounded
                onClick={() => document.getElementById('how-does-it-work')?.scrollIntoView()}
                className='mt-8'>
                Learn More
              </Button>
            </MotionDiv>
            <MotionDiv delay={0.1}>
              <Image
                src='/assets/strong_secure.png'
                width={600}
                height={500}
                alt='Strong & Secure image'
                className='select-none xl:mt-0 mt-16'
              />
            </MotionDiv>
          </div>
        </Layout>

        {/* Wave */}
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
          <path
            fill='#ffffff'
            fillOpacity='1'
            d='M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,266.7C1120,288,1280,288,1360,288L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'></path>
        </svg>
      </section>

      <Layout>
        {/* How does it work */}
        <MotionDiv
          delay={0.2}
          id='how-does-it-work'
          className='pt-16 flex lg:flex-row flex-col items-center justify-between gap-x-20'>
          <div>
            <Heading size='2' className='text-zinc-800 font-medium'>
              How does it work?
            </Heading>
            <Paragraph className='pt-4'>
              Securepass allows you to generate a password of a certain length with the option of
              using capital letters, lowercase letters, numbers and symbols.
              <br />
              <br />
              It uses custom algorithm that guranteen you there will be no repeating letters
              following each other.
            </Paragraph>
          </div>
          <Image
            src='/assets/how_does_it_work.jpg'
            width={400}
            height={500}
            alt='How does it work image'
            className='select-none xl:mt-0 mt-16'
          />
        </MotionDiv>

        {/* Generate password */}
        <MotionDiv
          delay={0.3}
          className='pt-32 flex lg:flex-row flex-col-reverse items-center justify-between gap-x-8 xl:text-right'>
          <Image
            src='/assets/generate_password.jpg'
            width={500}
            height={200}
            alt='Generate password image'
            style={{
              clipPath: 'inset(10px)',
            }}
            className='select-none xl:mt-0 mt-16'
          />
          <div>
            <Heading size='2' className='text-zinc-800 font-medium'>
              Want to generate password?
            </Heading>
            <Paragraph className='pt-4'>
              {
                "Generate a password by clicking the button below. It'll redirect you to the page where you can choose the parameters of the password."
              }
            </Paragraph>
            <LinkButton href='/generate' variant='primary' className='mt-8'>
              Generate
            </LinkButton>
          </div>
        </MotionDiv>

        {/* Save password */}
        <MotionDiv
          delay={0.4}
          className='py-32 flex lg:flex-row flex-col lg:items-center justify-between gap-x-8'>
          <div>
            <Heading size='2' className='text-zinc-800 font-medium'>
              Need to save password? No problem!
            </Heading>
            <Paragraph className='pt-4'>
              {'You can save up to eight generated passwords.'}
            </Paragraph>
            <LinkButton href='/save' variant='primary' className='mt-8'>
              Saved passwords
            </LinkButton>
          </div>
          <Image
            src='/assets/save_password.jpg'
            width={500}
            height={500}
            alt='Save password image'
            className='select-none xl:mt-0 mt-16'
          />
        </MotionDiv>
      </Layout>
    </>
  );
}
