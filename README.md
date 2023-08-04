# SHORTEN IT!

Shorten it é um projeto desenvolvido em NodeJS, express, postgresql, typescript, html e css. O projeto tem o objetivo de facilitar a encurtação de URL's, para que o usuário possa compartilhar links de maneira mais fácil e bonita.

O projeto conta com um domínio próprio, hospedado na AWS com um servidor nginx configurado na DNS do Route53. Você pode acessar o projeto através do link: [https://shortenit.me](https://shortenit.me)


## Tecnologias utilizadas

- NodeJS: ambiente de execução JavaScript no servidor;
- Express: framework web para Node.js;
- Postgresql: sistema gerenciador de banco de dados relacional;
- Typescript: linguagem baseada em JavaScript que adiciona tipagem e alguns outros recursos a linguagem;
- HTML: linguagem de marcação utilizada para estruturar e apresentar o conteúdo na web;
- CSS: linguagem de estilo utilizada para estilizar a página web;
- AWS (ec2 e route53): utilizado para infraestrutura do projeto;
- Nginx: servidor web utilizado para fazer o proxy reverso do projeto.

## Como executar o projeto (localmente)

### Pré-requisitos

- NodeJS
- Postgresql

### Instalação

1. Clone o repositório
```sh
git clone https://github.com/hyxtheone/shortenit.git
```
2. Instale as dependências
```sh
cd backend; npm install; cd ../frontend; npm install
```
3. Crie um banco de dados no postgresql com as seguintes querys
```sql
CREATE TABLE urls (
    shortened_url VARCHAR(255) PRIMARY KEY NOT NULL,
    url VARCHAR(255) NOT NULL,
    total_clicks INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    custom BOOLEAN NOT NULL
)
```
4. Crie um arquivo .env na pasta `backend` e preencha as variáveis de ambiente
```sh
# .env
CONNECTION_STRING=postgres://user:password@host:port/database
```
5. Execute o projeto
```sh
cd backend
npm start
```

# API

## POST /api/random-url

### Request

```json
{
    "url": "https://www.google.com"
}
```

### Response

```json
{
    "shortenedUrl": "abc123"
}
```

## POST /api/custom-url

### Request

```json
{
    "url": "https://www.google.com",
    "customUrl": "myCustomUrl"
}
```

### Response

```json
{
    "shortenedUrl": "myCustomUrl"
}
```

## GET /:shortened_url

### Response

```js
res.redirect(url)
```

## POST /api/statistics/get-url

### Request

```json
{
    "url": "https://shortenit.me/abc123"
}
```

### Response

```json
{
    "url": "https://www.google.com",
    "shortenedUrl": "abc123",
    "totalClicks": 10,
    "createdAt": "2022-08-01T00:00:00.000Z",
    "custom": true
}
```

## GET /api/statistics/get-total

### Response

```json
{
    "totalShortened": 10
    "totalClicks": 100
}
```
