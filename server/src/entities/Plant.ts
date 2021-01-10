import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OptimalConditions } from './OptimalConditions';
import { PlantName } from './PlantName';
import { User } from './User';

@ObjectType()
@Entity()
export class Plant extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.addedPlants, { eager: true })
  creator: User;

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
