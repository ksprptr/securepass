import Layout from '@/components/layouts/Layout';
import Heading from '@/components/common/Heading';
import MotionDiv from '@/components/common/MotionDiv';
import Paragraph from '@/components/common/Paragraph';
import SavedPassword from '@/components/passwords/SavedPassword';
import { useSavedPasswords } from '@/context/SavedPasswords';

/**
 * Component representing the saved passwords page
 */
export default function SavedPasswordsPage() {
  const { savedPasswords } = useSavedPasswords();

  return (
    <Layout>
      <div className='min-h-screen flex flex-col justify-center md:pt-0 py-32'>
        <MotionDiv>
          <Heading size='2' className='md:text-left text-center text-zinc-800 font-medium'>
            Saved passwords
          </Heading>
        </MotionDiv>
        {savedPasswords.length > 0 ? (
          <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-8'>
            {savedPasswords.map((password, i) => (
              <MotionDiv key={i} delay={(i + 1) * 0.1}>
                <SavedPassword
                  name={password.name}
                  password={password.password}
                  date={password.date}
                />
              </MotionDiv>
            ))}
          </div>
        ) : (
          <MotionDiv delay={(savedPasswords.length + 1) * 0.1}>
            <Paragraph className='md:text-left text-center mt-8'>
              {
                "We couldn't find any saved passwords. Generate a password and save it to see it here."
              }
            </Paragraph>
          </MotionDiv>
        )}
      </div>
    </Layout>
  );
}
