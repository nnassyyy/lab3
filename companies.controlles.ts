import { Company } from './companies.entity';
import { CompaniesService } from './companies.service';
import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { CreateCompanyDto } from './dto/CompanyDTO';


@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Get('incomplete')
    findIncomplete() {
        this.companiesService.findIncomplete();
    }


    @Get()
    findAll() {
    return this.companiesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCompany: Company) {
    return this.companiesService.update(+id, updateCompany);
    }
    @Post()
    create(@Body() createCompany: CreateCompanyDto) {
    return this.companiesService.create(createCompany);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
    }
   // 
}
