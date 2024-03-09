# Use a imagem base Node.js com a versão desejada
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do código-fonte para o diretório de trabalho
COPY . .

# Compile a aplicação
RUN npm run build

# Exponha a porta em que a aplicação será executada (definida no arquivo de configuração do aplicativo, por exemplo, o arquivo .env)
EXPOSE 3000

# Comando para executar a aplicação quando o contêiner for iniciado
CMD ["npm", "run", "dev"]
