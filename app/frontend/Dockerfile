FROM node:18-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Expor a porta onde a aplicação estará ouvindo
EXPOSE 3000

# Comando para iniciar o servidor de produção
CMD ["npm", "dev"]