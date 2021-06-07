import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FinanceProfile } from "./FinanceProfile";

@ObjectType()
@Entity()
export class Account extends BaseEntity {
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
  balance!: number;

  @Field()
  @Column({ default: new Date() })
  balanceDate!: Date;

  @Field()
  @Column()
  isCredit: boolean;

  @Field()
  @Column()
  profileId: number;

  @Field(() => FinanceProfile)
  @ManyToOne(
    () => FinanceProfile,
    (financeProfile) => financeProfile.accounts,
    {
      onDelete: "CASCADE",
    }
  )
  profile: FinanceProfile;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}