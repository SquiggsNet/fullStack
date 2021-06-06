import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FinanceProfile } from "./FinanceProfile";

@ObjectType()
@Entity()
export class Expense extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ default: 0 })
  value!: number;

  @Field()
  @Column()
  frequency!: string;

  @Field()
  @Column()
  profileId: number;

  @Field(() => FinanceProfile)
  @ManyToOne(() => FinanceProfile, (profile) => profile.expenses, {
    onDelete: "CASCADE",
  })
  profile: FinanceProfile;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}