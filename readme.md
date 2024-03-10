# CleanRouteApp

## Descrição

O CleanRouteApp é um aplicativo desenvolvido para facilitar o planejamento e a criação de rotas limpas e eficientes para a entrega de produtos. Ele oferece uma interface amigável para os usuários criarem rotas mais curtas entre os clientes.

## Desenvolvimento do CleanRouteApp

### Backend

O backend do CleanRouteApp foi desenvolvido utilizando Node.js e Express.js para a criação de uma API RESTful. O armazenamento dos dados foi feito em um banco de dados relacional PostgreSQL, conhecido por sua confiabilidade e escalabilidade.

Para calcular a rota mais curta entre os pontos de entrega, utilizamos o algoritmo do vizinho mais próximo otimizado pelo 2-opt. Esse algoritmo combina a eficiência do método do vizinho mais próximo com a otimização do 2-opt, garantindo rotas eficientes e econômicas.

### DDL da Tabela do Banco de Dados

O script SQL para criar a tabela do banco de dados está disponível na pasta `back/src/config/database/migrations`. Este script contém o DDL (Linguagem de Definição de Dados) necessário para definir a estrutura da tabela utilizada pelo aplicativo. Esse script é executado automaticamente caso a tabela não exista em seu banco de dados.

### Frontend

O frontend do CleanRouteApp foi construído utilizando tecnologias modernas como React.js para a criação de uma interface de usuário responsiva e intuitiva. Para o gerenciamento de estado da aplicação, utilizamos o React Hooks, proporcionando um desenvolvimento mais eficiente e organizado.

A interação com o backend é feita por meio de requisições HTTP usando a biblioteca Axios. Isso permite uma comunicação eficiente entre o frontend e o backend, garantindo uma experiência fluida para o usuário.


## Funcionalidades

- Visualização de clientes e suas informações associadas
- Adição de clientes
- Geração de rotas em ordem de proximidade

## Instruções de Uso

1. Clone este repositório:
   
```bash
git clone https://github.com/seu-usuario/clean-route-app.git
```
2. Navegue até o diretório do projeto:

```bash
cd clean-route-app
```
3. Execute o Docker Compose para iniciar os containers do frontend e do backend:

```bash
docker-compose up
```
4. O frontend estará acessível em [http://localhost:3000](http://localhost:3000) e o backend em [http://localhost:3001](http://localhost:3001).

5. Acesse a documentação da API (Swagger) em [http://localhost:3001/api-docs](http://localhost:3001/api-docs).

## Video Explicativo

O arquivo do vídeo explicativo se encontra no repositório porém caso haja algum problema também esta disponível no link abaixo

[Video Explicativo](https://www.loom.com/share/732f4f27c5794e9f8d437713dd4e7a4c)

## Requisitos de Sistema

- Node.js >= 18.16.0
- Docker >= 20.10.5
- Docker Compose >= 1.29.1

## Tecnologias Utilizadas

- Node.js
- Express
- Postgres
- React
- Vite
- Tailwind
- Docker
- Docker Compose

## Contribuição

As contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue para relatar problemas, sugestões ou para contribuir com código.

## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).