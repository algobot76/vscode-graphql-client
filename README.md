# GraphQL Client

## Usage

To send a graphql request to a server, you need to specify:

- Endpoint (it starts with the keyword `POST`)
- Query/mutation
- Variables (optional)

An example of a simple query:

```
POST https://api.graph.cool/simple/v1/swapi

query {
  allPersons {
    name
    films {
      director
    }
  }
}
```

Select the above text and open the command palette and look for a command called `GraphQL Client: Send request`. Then use that command to send your request to the specified endpoint. Also, if you want to use variables, simply add the following after your query/mutation:

```
variables : {
  ...
}
```

_Note_: the content of the `variables` must be written in JSON format.

## Install

Press `F1`, type `ext install` then search for `graphql client`.
