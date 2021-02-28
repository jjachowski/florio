import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlantReport } from './PlantReport';
import { User } from './User';

@ObjectType()
@Entity()
export class ReportVote extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reportVotes)
  creator: User;

  @Field()
  @Column()
  plantId: number;

  @Field()
  @Column()
  reportId: number;

  @Field(() => PlantReport)
  @ManyToOne(() => PlantReport, (plantReport) => plantReport.votes)
  report: PlantReport;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
