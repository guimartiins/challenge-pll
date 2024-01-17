# Requisitos

Para executar a aplicação você deve ter as seguintes ferramentas instaladas:

`docker`
`npm`

# Setup

- Rode o comando para subir as instâncias dos bancos, sendo PostgreSQL e Redis: `docker-compose up -d`
- Instale as dependências: `npm install`
- Execute as migrações e seeds do banco: `npm run prepare:db`
- Suba a aplicação: `npm run dev`

## Rotas

possuímos duas rotas, sendo:

`/token/validate`: É uma rota `POST` que valida token JWT, devendo passar o token nos `headers` na chave `authorization`

`/transactions/transference`: É uma rota `POST` que gera uma transação financeira de uma conta para outra. Execute com o seguinte `body`:

```JSON
{
	"payerNumberAccount": "123",
	"receiverNumberAccount": "321",
	"value": 10
}

```
