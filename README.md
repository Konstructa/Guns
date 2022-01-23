<h1 align = "center">  :shield: Secret Guns

<p align="center"> 
    <img alt = "Languages" src="https://img.shields.io/github/languages/count/Konstructa/Secret-Guns-API">
    <img alt = "Tamanho" src="https://img.shields.io/github/repo-size/Konstructa/Secret-Guns-API">
    <img alt = "Commit" src="https://img.shields.io/github/last-commit/Konstructa/Secret-Guns-API">
    <img alt = "Issues" src="https://img.shields.io/github/issues/Konstructa/Secret-Guns-API">
</p>

<p align="center"> 
    <a href="#rocket-tecnologias">Tecnologias</a>          |
    <a href="#computer-projeto">Projeto</a>          |
    <a href="#hammer-instalação">Instalação</a>
</p>

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

order/customerByOrderID/{id}

order/productDetailsByOrderID/{id}

**POST**

POST - costumer

```
}
    "user": 
    "password": 
} 
```

POST - stock/
```
}
    "name": 
    "quantity": 
} 
```

POST - order/
```
}
    "productsQuantity": 
    "product": (id)
    "costumer": (id)
} 
```

**DELETE**

order/{id}


## :hammer: Instalação

Clone este repositório e utilize o seguinte comando no terminal:

```npm install```

Para rodar a aplicação:

 ```npm run dev```
