import { HttpStatus, Injectable } from '@nestjs/common';
import { Company } from './companies.entity'
import { Trip } from 'src/trips/trips.entity';
import { User } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/CompanyDTO';
import { IncompleteCompanyDto } from './dto/incomplete-company.dto';


@Injectable()
export class CompaniesService { 
    constructor( @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>, // "внедряем" репозиторий Trip в сервис
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>, // "внедряем" репозиторий Company в сервис
    
) {}

    async create(companyDto: CreateCompanyDto): Promise<Company>
    {
        //получаем объект CreatetripDto
        const company = this.companyRepository.create(); //создаем объект Trip из репозитория
        company.name = companyDto.name; //заполняем поля объекта trip
        company.sideOfWork = companyDto.sideOfWork;
        company.reestrNumb = companyDto.reestrNumb;
        const trips = await this.tripRepository.findBy({
            //получаем массив Affiliation по id
            id: In(companyDto.trips),
        });
        company.trips = trips;
        await this.companyRepository.save(company); //сохраняем объект trip в БД
        return company; //возвращаем объект trip
    }



    findOne(id: number): Promise<Company> {
        // Promise<Author> - указывает, что функция возвращает объект Trip в виде Promise (c асинхронного потока)
        return this.companyRepository.findOne({
          //получаем объект Author по id
          where: { id }, //указываем условие поиска по id
          relations: { trips: true}, //получаем связанные объекты
        });
      } 


      async findIncomplete(): Promise<IncompleteCompanyDto[]> {
        const company = await this.companyRepository.find(); //получаем массив Trip из БД
        const incompleteCompanies: IncompleteCompanyDto[] = company.map((company) => 
        {
          //преобразуем массив Author в массив IncompleteAuthorDto
          const incompleteCompany = new IncompleteCompanyDto();
          incompleteCompany.id = company.id;
          incompleteCompany.name = company.name;
          return incompleteCompany;
        });
        return incompleteCompanies; //возвращаем массив IncompleteAuthorDto
      }
    



    async findAll(): Promise<Company[]> {
    const companies = await this.companyRepository.find({
      //получаем связанные объекты
      relations: {
        trips: true
      },
    }); //получаем массив trip из БД
    return companies; //возвращаем массив trip
    }



    async update(id: number, updatedCompany: Company) {
        //получаем объект Trip для обновления по id
        const company = await this.companyRepository.findOne({ where: { id } }); 
    //получаем объект Trip по id из БД
        company.name = updatedCompany.name; //обновляем поля объекта Trip
        company.sideOfWork = updatedCompany.sideOfWork;
        company.reestrNumb = updatedCompany.reestrNumb;
        company.trips = updatedCompany.trips;
        await this.companyRepository.save(company); //сохраняем объект Trip в БД
        return company; //возвращаем объект Trip
      }
    

    remove(id: number) {
        this.companyRepository.delete({ id }); //удаляем объект Trip из БД
    }

}
