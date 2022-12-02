import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()
export class TemaService{
    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ) { }

    async findAll(): Promise<Tema[]> {
        return await this.temaRepository.find({
            relations: {
                postagem: true //em postagem fica tema aq fica postagem(inverso)
            }
        });
    }
    async findById(id: number): Promise<Tema> {
        let tema = await this.temaRepository.findOne({

            where: {
                id
            },
            relations: {
                postagem: true //em postagem fica tema aq fica postagem(inverso)
            }

        })
        if (!tema)
            throw new HttpException('Tema não existe', HttpStatus.NOT_FOUND)

        return tema 
    }

    async findByTitulo(Titulo: string): Promise<Tema[]> {
        return await this.temaRepository.find({

            where: {
                titulo: ILike(`%${Titulo}%`)
            },
            relations: {
                postagem: true //em postagem fica tema aq fica postagem(inverso)
          
            }
        })
    }

    async create(Postagem: Tema): Promise<Tema> {
        return await this.temaRepository.save(Postagem)
    }

    async update(tema: Tema): Promise<Tema> {

        let buscarTema = await this.findById(tema.id)

        if (!buscarTema || !tema.id)
            throw new HttpException('Tema não existe', HttpStatus.NOT_FOUND)

        return await this.temaRepository.save(tema)

    }

    async Delete(id: number): Promise<DeleteResult> {

        let buscarTema = await this.findById(id)

        if (!buscarTema)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)

        return await this.temaRepository.delete(id)

    }


}