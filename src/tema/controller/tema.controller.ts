import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Tema } from "../entities/tema.entity";
import { TemaService } from "../service/tema.service";

@UseGuards(JwtAuthGuard)
@Controller("/tema")
export class Temacontroller{
    constructor(private readonly TemaService: TemaService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tema[]> {
        return this.TemaService.findAll();
    }
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe) id: number): Promise <Tema> {
        return this.TemaService.findById(id)

    }
    @Get('/titulo/:titulo')
    @HttpCode (HttpStatus.OK)
    findByTitulo(@Param('Titulo') titulo: string): Promise <Tema[]>{
        return this.TemaService.findByTitulo(titulo)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() tema: Tema): Promise <Tema>{
        return this.TemaService.create(tema)

    } 

    @Put()
    @HttpCode(HttpStatus.OK)
    update (@Body()tema:Tema): Promise <Tema>{

        return this.TemaService.update(tema)
    }
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    Delete(@Param('id', ParseIntPipe) id:number){
    return this.TemaService.Delete(id)


}}