

#GRAPHQL

## Headers
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhczFkQGFzLnVhIiwiaWF0IjoxNTYwNDE3ODAzLCJleHAiOjE1NjA0MjE0MDN9._WYPSorOfYzqZwmK8sNedxeQ0ARMWjTMI3wFg3X26RY"
}

## Graphql queries
```graphql endpoint

mutation {
  signup(email: "breitsmiley@gmail.com", password: "111"){
    token
  }
}

query {
  login(email: "breitsmiley@gmail.com", password: "111"){
    token
  }
}

query{
  colors {
    id,
    name,
    code
  }
}

query {
  projects {
    id,
    createdAt,
    status,
    name,
    color {
      id,
      name,
      code
    }
  }
}

query{
  users{
    id
  }
}

query {
  users {
    id,
    email,
    password
  },
  colors {
    id,
    name,
    code
  },
  tasks {
    id,
    createdAt,
    status,
    name,
    priority,
    color {
      id,
      name,
      code
    }
  },  
  projects {
    id,
    createdAt,
    status,
    name,
    color {
      id,
      name,
      code
    }
  }
  
}

```
