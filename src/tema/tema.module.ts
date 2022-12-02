import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostagemController } from "src/postagem/controller/postagem.controller";
import { UsuarioController } from "src/usuario/controller/usuario.controller";
import { Temacontroller } from "./controller/tema.controller";
import { Tema } from "./entities/tema.entity";
import { TemaService } from "./service/tema.service";

@Module({
    imports:[TypeOrmModule.forFeature([Tema])],
    providers:[TemaService],
    controllers:[ Temacontroller],
    exports:[TypeOrmModule],

})

export class TemaModule{ }