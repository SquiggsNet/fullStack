import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./Account";
import { Expense } from "./Expense";
import { User } from "./User";

@ObjectType()
@Entity()
export class FinanceProfile extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.financialProfiles)
  user: User;

  @OneToMany(() => Account, (account) => account.profile)
  accounts: Account[];

  @OneToMany(() => Expense, (expense) => expense.profile)
  expenses: Expense[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}