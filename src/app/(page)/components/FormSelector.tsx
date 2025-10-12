import { FORM_TYPES, FormType } from '../enums/form.enums';
import IPAddressForm from './forms/ip-address/IPAddressForm';
import MacAddressForm from './forms/mac-address/MacAddressForm';
import PasswordForm from './forms/password/PasswordForm';
import UuidForm from './forms/uuid/UuidForm';

// Props interface
interface Props {
  formType: FormType;
}

/**
 * Component representing a form selector
 */
export default function FormSelector({ formType }: Readonly<Props>) {
  switch (formType) {
    case FORM_TYPES.PASS:
      return <PasswordForm />;
    case FORM_TYPES.UUID:
      return <UuidForm />;
    case FORM_TYPES.IP:
      return <IPAddressForm />;
    case FORM_TYPES.MAC:
      return <MacAddressForm />;
  }
}
