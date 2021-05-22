import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FinancialAsset } from "./FinancialAsset";
import { FinancialExpense } from "./FinancialExpense";
import { FinancialIncome } from "./FinancialIncome";
import { FinancialLiability } from "./FinancialLiability";
import { User } from "./User";

@Entity()
export class FinancialProfile extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.financialProfiles)
  user: User;

  @OneToMany(() => FinancialExpense, (expense) => expense.profile)
  expenses: FinancialExpense[];

  @OneToMany(() => FinancialIncome, (income) => income.profile)
  incomes: FinancialIncome[];

  @OneToMany(() => FinancialAsset, (asset) => asset.profile)
  assets: FinancialAsset[];

  @OneToMany(() => FinancialLiability, (liability) => liability.profile)
  liabilities: FinancialLiability[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
