import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {TypeOrmModule} from '@nestjs/typeorm';


describe('Teste de Modulos Usuários e Auth (e2e)', () => {
  
  let token: any;
  let usuarioId: any;  
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ TypeOrmModule.forRoot({
        type: 'mysql',
        host:'localhost',
        port: 3306,
        username:'root',
        password:'root',
        database: 'db_blogpessoal_test',
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
        dropSchema: true

      }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close()
  })

  it('01 - Deve Cadastrar Usuário', async() => {
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'root',
      foto: ''
    })
    expect(201)    
    usuarioId = resposta.body.id 
  })
  
  it('02 - Deve Autenticar Usuario (Login', async () => {
    const resposta = await request(app.getHttpServer())
    .post('/auth/logar') 
    .send({
      usuario: 'root@root.com',
      senha: 'root',
    })
    expect(200)

    token = resposta.body.token

  })

  it('03 - Não Deve Multiplicar o Usuario', async () => {
   return request(app.getHttpServer()) 
   .post('/usuarios/cadastrar')
   .send({
    nome: 'Root',
    usuario:'root@root.com',
    senha: 'root',
    foto: ''

   })

   .expect(400)

  })

  it('04 - Deve Listar Todos os Usuarios', async () => {
    return request(app.getHttpServer())
    .get('/usuarios/all')
    .set('Authorization',`${token}`)
    .send({})
    .expect(200)
  })

  it('05 - Deve Atualizar um Usuarios', async () => {
    return request(app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization',`${token}`)
    .send({
       id: usuarioId,
       nome:'Jorginho',
       usuario: 'jorginho@gmail.com',
       senha:'root', 
       foto:''
    })
    .expect(200)
    .then(resposta => {
      expect("Jorginho").toEqual(resposta.body.nome)
    })

  })
});


//Ilike `${%nome%}`
    //Ilike %nome%
    // `$(nome)`
