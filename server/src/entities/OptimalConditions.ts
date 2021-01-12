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
import { Intensity, Season } from './conditionsEnums';
import { Plant } from './Plant';

@ObjectType()
@Entity()
export class OptimalConditions extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column('int2')
  season!: Season;

  @Field()
  @Column('int4')
  water!: Intensity;

  @Field()
  @Column('int4')
  sun!: Intensity;

  @Field()
  @Column()
  airHumidityLow: number;

  @Field()
  @Column()
  airHumidityHigh: number;

  @Field()
  @Column()
  temperatureLow: number;

  @Field()
  @Column()
  temperatureHigh: number;

  @Field()
  @Column()
  plantId: number;

  @Field(() => Plant)
  @ManyToOne(() => Plant, (plant) => plant.optimalConditions, {
    cascade: true,
  })
  plant: Plant;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
