import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { CreateUserInput } from '../dto/create-user.input';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/auth/gql-auth.guard';
import { CurrentUser } from 'src/modules/auth/current-user';

export class UserResolver {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.userService.findOne(user.id);
  }

  @Query(() => [User], { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.userService.findAll();
  }
}
