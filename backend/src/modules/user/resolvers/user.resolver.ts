import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { CreateUserInput } from '../dto/create-user.input';
import { forwardRef, Inject } from '@nestjs/common';

export class UserResolver {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    console.log(this.userService);
    console.log("------------------")
    return this.userService.findAll();
  }
}
