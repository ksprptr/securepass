import {
  IPAddressVersion,
  MacAddressVersion,
  PasswordAlgorithm,
  UuidVersion,
} from '../enums/form.enums';

export interface PasswordFormProps {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  algorithm: PasswordAlgorithm;
}

export interface UuidFormProps {
  version: UuidVersion;
}

export interface IPAddressFormProps {
  version: IPAddressVersion;
}

export interface MacAddressFormProps {
  version: MacAddressVersion;
}
