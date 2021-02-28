import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Plant } from './Plant';
import { ReportVote } from './ReportVote';
import { User } from './User';

@ObjectType()
@Entity()
export class PlantReport extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.plantReports)
  creator: User;

  @Field()
  @Column()
  plantId: number;

  @Field(() => Plant)
  @ManyToOne(() => Plant, (plant) => plant.reports, { eager: true })
  plant: Plant;

  @OneToMany(() => ReportVote, (vote) => vote.report)
  votes: ReportVote[];

  @Field()
  @Column()
  reason!: string;

  @Field(() => Int)
  @Column('int', { nullable: false, default: 0 })
  score!: number;
}
