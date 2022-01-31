<h1 align = "center">  :shield: Secret Guns

<p align="center"> 
    <img alt = "Languages" src="https://img.shields.io/github/languages/count/Konstructa/Secret-Guns-API">
    <img alt = "Tamanho" src="https://img.shields.io/github/repo-size/Konstructa/Secret-Guns-API">
    <img alt = "Commit" src="https://img.shields.io/github/last-commit/Konstructa/Secret-Guns-API">
    <img alt = "Issues" src="https://img.shields.io/github/issues/Konstructa/Secret-Guns-API">
</p>

<h3 align="center"> 
    <a href="#rocket-tecnologias">Tecnologias</a>          |
    <a href="#computer-projeto">Projeto</a>          |
    <a href="#hammer-instalação">Instalação</a>
</h3>

## :rocket: Tecnologias

- NodeJS

- Express

- Typescript

- MySQL

- ESLint

- TypeORM

- Bcrypt

## :computer: Projeto

Com a Torre dos Vingadores vazia após o BLIP, diversas armas secretas e únicas, como o escudo do Capitão América e o Cetro de Loki, foram encontradas e você pode adquirir uma aqui!

**GET**

stock/

order/customerByOrderID/{id}

order/productDetailsByOrderID/{id}

**POST**

costumer/

```
{
    "name": "Teste",
    "username":"sasas",
    "email": "mariagata@gmail.com",
    "password": "123213",
    "gems": 1213
} 
```

stock/
```
{
    "name": "Olho de Agamotto",
    "description": "Revela ilusoes, dispensando magia, e gera rajadas de energias de grande força",
    "price": 1200,
    "quantity": 100
}

```

order/
```
}
    "products_quantity": 
    "product": (id)
    "costumer": (id)
} 
```

**DELETE**

order/{id}

costumer/{id}

**PATCH**

/stock/{id}
```
{   
    "quantity": 
}
```

**PUT**

costumer/{id}
```
{
    "name": "Teste",
    "username":"sasas",
    "email": "mariagata@gmail.com",
    "password": "123",
    "gems": 1032000
}

```


## :clipboard: DIAGRAMA
<p align="center" >
<img alt = "disgrama" src="./diagrama.png">
</p>


## :handshake: REGRAS DE NEGÓCIOS

Uma order só poderá ser criada se houver estoque suficiente

Se uma order for criada, seus produtos devem ser subtraídos do estoque

Caso sua conta seja deletado o pedido é dado concluído e deletado junto

Caso apenas seu pedido seja deletado, o produto volta para o estoque e você sera reembolsado

Caso você não tenha gemas suficientes o pedido não será concluído


## :hammer: Instalação

Clone este repositório e utilize o seguinte comando no terminal:

```npm install```

Para rodar a aplicação:

 ```npm run dev```
