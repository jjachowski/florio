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
