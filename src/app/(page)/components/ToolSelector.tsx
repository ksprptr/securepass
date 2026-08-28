import { TOOL_TYPES, ToolType } from '../enums/tools.enums';
import BcryptHashTool from './tools/BcryptHashTool';
import BcryptVerifyTool from './tools/BcryptVerifyTool';
import HashTool from './tools/HashTool';
import JwtDecodeTool from './tools/JwtDecodeTool';
import JwtEncodeTool from './tools/JwtEncodeTool';
import PasswordTool from './tools/PasswordTool';
import SecretTool from './tools/SecretTool';
import SlugTool from './tools/SlugTool';
import TimestampTool from './tools/TimestampTool';
import UrlCleanerTool from './tools/UrlCleanerTool';
import UrlEncoderTool from './tools/UrlEncoderTool';
import UuidTool from './tools/UuidTool';

interface Props {
  type: ToolType;
}

/**
 * Component representing a tool selector
 **/
export default function ToolSelector({ type }: Props) {
  switch (type) {
    case TOOL_TYPES.PASSWORD:
      return <PasswordTool />;
    case TOOL_TYPES.SECRET:
      return <SecretTool />;
    case TOOL_TYPES.UUID:
      return <UuidTool />;
    case TOOL_TYPES.BCRYPT_HASH:
      return <BcryptHashTool />;
    case TOOL_TYPES.BCRYPT_VERIFY:
      return <BcryptVerifyTool />;
    case TOOL_TYPES.HASH:
      return <HashTool />;
    case TOOL_TYPES.JWT_ENCODE:
      return <JwtEncodeTool />;
    case TOOL_TYPES.JWT_DECODE:
      return <JwtDecodeTool />;
    case TOOL_TYPES.URL_CLEANER:
      return <UrlCleanerTool />;
    case TOOL_TYPES.URL_ENCODER:
      return <UrlEncoderTool />;
    case TOOL_TYPES.SLUG:
      return <SlugTool />;
    case TOOL_TYPES.TIMESTAMP:
      return <TimestampTool />;
  }
}
