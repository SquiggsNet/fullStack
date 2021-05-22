import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FinancialProfile } from "./FinancialProfile";

@Entity()
export class FinancialIncome extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ type: "int", default: 0 })
  value!: number;

  @Column()
  profileId: number;

  @ManyToOne(() => FinancialProfile, (profile) => profile.incomes)
  profile: FinancialProfile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
