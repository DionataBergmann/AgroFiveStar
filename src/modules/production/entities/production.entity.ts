import { BaseEntity } from '../../base/entities/base.entity';
import { Field } from '../../fields/entities/field.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Production extends BaseEntity {
  @Column()
  name: string;

  @Column()
  amount: number;

  @ManyToMany(() => Field, (fields) => fields.productions, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  fields: Field;
}
