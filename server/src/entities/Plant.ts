import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OptimalConditions } from './OptimalConditions';
import { PlantName } from './PlantName';

@ObjectType()
@Entity()
export class Plant extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [PlantName])
  @OneToMany(() => PlantName, (plantName) => plantName.plant, {
    eager: true,
  })
  names!: PlantName[];

  @Field(() => [OptimalConditions])
  @OneToMany(() => OptimalConditions, (conditions) => conditions.plant, {
    eager: true,
  })
  optimalConditions!: OptimalConditions[];

  @Field()
  @Column({ nullable: true })
  imageUrl!: string;

  @Field(() => [String])
  @Column('text', { array: true, nullable: true })
  characteristics: string[];

  @Field()
  @Column()
  description!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
