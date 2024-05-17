import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { DatasourceModule } from './datasource/datasource.module';
import { TripsModule } from './trips/trips.module'; 
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CompaniesModule, TripsModule, UsersModule, DatasourceModule, TypeOrmModule.forRoot({
    type: 'postgres', //тип подключаемой БД
    port: 5432, //порт
    username: 'education', //имя пользователя
    password: 'password', //пароль
    host: 'localhost', //хост, в нашем случае БД развернута локально
    synchronize: true, //отключаем автосинхронизацию(в противном случае при каждом перезапуске наша БД будет создаваться заново)
    logging: 'all', //включим логирование для удобства отслеживания процессов
    entities: ['dist/**/*.entity{.ts,.js}'], //указываем путь к сущностям
  })],

  controllers: [],
  providers: [],
})
export class AppModule {}
