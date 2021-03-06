import { createParamDecorator } from '@nestjs/common';

export const AuthCurrentUser = createParamDecorator((data, [root, args, ctx, info]) => ctx.req.user);