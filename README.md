# 📝 Simple Post API

Este projeto é uma API RESTful feita com **Node.js**, **TypeScript**, **Express** e **Zod**, que permite criar, listar e deletar posts salvos em um arquivo JSON local.

---

## 🚀 Funcionalidades

- **`GET /posts`**: Lista todos os posts salvos.
- **`POST /posts`**: Cria um novo post, validado com Zod.
- **`DELETE /posts`**: Remove um post pelo `title`.

Todos os dados são armazenados no arquivo `data/posts.json`.

---

## 🛠️ Tecnologias e Ferramentas

- **Node.js + Express**: Backend leve e rápido.
- **TypeScript**: Tipagem estática e segurança em tempo de desenvolvimento.
- **Zod**: Validação robusta e declarativa de dados.
- **fs/promises**: Manipulação assíncrona de arquivos.
- **JSON**: Armazenamento simples e direto dos dados.

---

## 🔐 Considerações de Segurança

- A API valida todos os dados de entrada com Zod, prevenindo:

    - Injeções de conteúdo malicioso

    - Dados fora do formato esperado

    - Tipagens incorretas ou inválidas

- Nenhum dado é executado ou interpretado dinamicamente, o que reduz o risco de execução arbitrária de código ou injection attacks.

- O campo title é usado como chave para deletar posts.
    <br>🔸 É importante garantir que ele seja único, pois não estamos utilizando um id.<br>
     🔸 Idealmente, isso seria substituído por um UUID no futuro.

- Os dados são persistidos em arquivo JSON local, utilizando fs/promises.
    Essa abordagem é adequada para:

    - Testes locais
    - Protótipos
    - Ambientes controlados

- O uso de helmet() melhora significativamente a segurança ao adicionar cabeçalhos HTTP seguros, como:

    - Content-Security-Policy

    - X-Frame-Options

    - X-Content-Type-Options

    - Strict-Transport-Security

    - Entre outros

- O uso de express.json() e express.urlencoded() com possíveis limites de payload contribui para:

    - Proteção contra ataques de negação de serviço (DoS)
    - Maior controle sobre o tamanho e tipo dos dados recebidos

- A pasta pública (/public) é servida via express.static(). É fundamental garantir que:

    - 🔐 Nenhum arquivo sensível (como .env, .ts, .json, senhas, etc.) esteja nessa pasta
    - ✅ Apenas arquivos client-side estáticos (como imagens, CSS, ou JS compilado) sejam expostos
---

## 🧪 Exemplo de POST válido

```
{
  "title": "Meu primeiro post",
  "content": "Este é o conteúdo do post, com mais   de 10 caracteres.",
  "author": "João",
  "category": "Programação",
  "views": 10,
  "status": true
}

```

## Clonar o repositório
```
git clone https://github.com/gabrielpovoa/post-api.git
```

## Instalar dependências
```
npm install
```

## Rodar o projeto
```
The project will be running on the port inserted on the .env file

npm run dev
```