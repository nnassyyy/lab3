import { Trip } from 'src/trips/trips.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  sideOfWork: string;
  @Column()
  reestrNumb: string;
  @ManyToMany((type) => Trip, (trip) => trip.companies)
  @JoinTable({
    name: 'company_trip',
    joinColumn: { name: 'company_id' },
    inverseJoinColumn: { name: 'trip_id' },
  })
  trips: Trip[];
}