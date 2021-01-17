import { ApiAuthDataAccessService, LoginInput, RegisterInput, UserToken } from '@metadata/api/auth/data-access'
import { CtxUser, GqlAuthGuard } from '@metadata/api/auth/util'
import { User } from '@metadata/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => UserToken)
export class ApiAuthFeatureResolver {
  constructor(private readonly service: ApiAuthDataAccessService) {}

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async me(@CtxUser() user: User) {
    return user
  }

  @Mutation(() => UserToken, { nullable: true })
  async login(@Context() context, @Args('input') input: LoginInput) {
    const userToken = await this.service.login(input)
    this.service.setCookie(context.res, userToken.token)
    return userToken
  }

  @Mutation(() => Boolean, { nullable: true })
  async logout(@Context() context) {
    this.service.clearCookie(context.res)
    return true
  }

  @Mutation(() => UserToken, { nullable: true })
  async register(@Context() context, @Args('input') input: RegisterInput) {
    const userToken = await this.service.register(input)
    this.service.setCookie(context.res, userToken.token)
    return userToken
  }

  @ResolveField('user')
  user(@Parent() auth: UserToken) {
    return this.service.getUserFromToken(auth.token)
  }
}
