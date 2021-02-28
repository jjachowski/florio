import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Plant } from './Plant';
import { Like } from './Like';
import { PlantReport } from './PlantReport';
import { ReportVote } from './ReportVote';

export enum AccountType {
  user,
  admin,
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column('int')
  accountType!: AccountType;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => Plant, (plant) => plant.creator)
  addedPlants: Plant[];

  @OneToMany(() => PlantReport, (plant) => plant.creator)
  plantReports: PlantReport[];

  @OneToMany(() => Like, (vote) => vote.creator, { eager: true })
  likes: Like[];

  @OneToMany(() => ReportVote, (vote) => vote.creator, { eager: true })
  reportVotes: ReportVote[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
