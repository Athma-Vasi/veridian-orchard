import {MapPin} from 'lucide-react';
import {useState} from 'react';
import type {ActionFunctionArgs} from 'react-router';

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();

  // submit actual form data to your CRM, email service, or other service here
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {ok: true};
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';
type InquiryType = 'general' | 'support' | 'sales';

function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [inquiryType, setInquiryType] = useState<InquiryType>('general');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState('submitting');

    try {
      // simulate form submission
      setFormState('success');
    } catch (error) {
      // error in submitting
      setFormState('error');
    }
  }

  return (
    <div className="contact-page">
      {/* hero section */}
      <section className="hero">
        <h1>Connect with the Orchard</h1>
        <p>
          We believe in fostering a community as vibrant as our plants. At
          Veridian Orchard, reaching out isn&apos;t just sending an
          email—it&apos;s establishing a connection. Whether you&apos;re looking
          to nurture a specific plant, seeking deeper knowledge on care, or wish
          to explore how your business might bloom alongside ours, our team is
          here to assist.
        </p>
      </section>

      {/* rest are from server */}
    </div>
  );
}

export default ContactPage;
