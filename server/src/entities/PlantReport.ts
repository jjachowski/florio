import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plant } from './Plant';
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

  @Field()
  @Column()
  reason!: string;
}
