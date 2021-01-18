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
import { User } from './User';
import { Like } from './Like';

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

  @Field()
  @Column({ default: 0 })
  score!: number;

  @OneToMany(() => Like, (vote) => vote.plant)
  likes: Like[];

  @Field()
  @Column({ unique: true })
  primaryName!: string;

  @Field(() => [String])
  @Column('text', { array: true, nullable: true, unique: true })
  otherNames!: string[];

  @Field(() => [OptimalConditions], { nullable: true })
  @OneToMany(() => OptimalConditions, (conditions) => conditions.plant, {
    eager: true,
    nullable: true,
  })
  optimalConditions: OptimalConditions[];

  @Field()
  @Column({ nullable: true })
  imageUrl!: string;

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
