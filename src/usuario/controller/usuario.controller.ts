import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../service/usuario.service";

@Controller('/usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {   }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]>{
        return this.usuarioService.findAll();
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/cadastrar')
    async create(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.create(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Put('/atualizar')
    async update(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(usuario)
    }


}























/*import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../service/usuario.service";

@Controller ("/usuario")
export class UsuarioController {
    constructor(private readonly UsuarioService: UsuarioService){}


    @Get() //('/all') rota para visualizar todos 
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.UsuarioService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe) id: number): Promise <Usuario> {
        return this.UsuarioService.findById(id)
    }

    @Get('/usuario/:usuario')
    @HttpCode (HttpStatus.OK)
    findByUsuario(@Param('usuario') usuario: string): Promise <Usuario[]>{
        return this.UsuarioService.findByUsuario(usuario)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() Usuario:Usuario): Promise <Usuario>{
        return this.UsuarioService.create(Usuario)

    } 
    @Put()
    @HttpCode(HttpStatus.OK)
    update (@Body() Usuario: Usuario): Promise <Usuario>{

        return this.UsuarioService.update(Usuario)
    }
}*/



