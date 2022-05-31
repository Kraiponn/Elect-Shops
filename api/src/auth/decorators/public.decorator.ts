import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC } from '../utils/keys.const';

export const Public = () => SetMetadata(IS_PUBLIC, true);
