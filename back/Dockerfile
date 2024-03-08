# Use uma imagem base do Node.js
FROM node:18


# Instale o cliente PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

# Crie o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json (se existir) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o resto dos arquivos do projeto para o diretório de trabalho
COPY . .

# Faz o build do projeto
RUN npm run build

# Exponha a porta 3000 para o tráfego externo
EXPOSE 3000

# Defina uma variável de ambiente para indicar ao PostgreSQL para executar o arquivo de migração
ENV POSTGRES_USER: postgres
ENV POSTGRES_PASSWORD: password
ENV POSTGRES_DB: cleanRouteDb

# Comando para iniciar o aplicativo (e executar o script de migração)
CMD ["sh", "-c", "npm start & npm run migration && tail -f /dev/null"]