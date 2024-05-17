import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controlles';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './companies.entity';
import { Trip } from 'src/trips/trips.entity';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Trip, Company]), // !!! В модуле автор мы используем все три сущности, поэтому все три сущности необходимо импортирвоать!
  ],
})
export class CompaniesModule {}