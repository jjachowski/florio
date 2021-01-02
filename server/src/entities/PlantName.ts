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
import { Plant } from './Plant';

@ObjectType()
@Entity()
export class PlantName extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column()
  isPrimary!: boolean;

  @Field()
  @Column()
  plantId: number;

  @Field(() => Plant)
  @ManyToOne(() => Plant, (plant) => plant.names, { cascade: true })
  plant: Plant;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
