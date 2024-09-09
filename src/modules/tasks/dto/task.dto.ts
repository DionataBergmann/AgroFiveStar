import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { BaseDTO } from 'src/modules/base/dto/base.dto';
import { TaskStatus } from '../taskStatusEnum';

@ObjectType('Task')
export class TaskDTO extends BaseDTO {
  @FilterableField()
  title: string;

  @FilterableField()
  description: string;

  @FilterableField()
  date: Date;

  @FilterableField({ nullable: true })
  dayOfWeek: number;

  @FilterableField({ nullable: true })
  userName: string;

  @FilterableField(() => TaskStatus, { defaultValue: TaskStatus.PENDING })
  status: TaskStatus;
}
