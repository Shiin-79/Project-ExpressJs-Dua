# User Api Spec
## Register User API

Endpoint : POST /api/users

- Request Body :

```Json
{
    "username" : "Aku",
    "password" : "pass123",
    "name"     : "Aku Ganteng"
}
```

- Response Body Success :

```Json
{
  "data" : {
    "ussername" : "Aku",
    "name"      : "Aku Ganteng"
  }
}
```

- Response Body Error :

```Json
{
    "error" : "Username already registered"
}

```
## Login User API

Endpoint : POST /api/users/login

- Request Body :

```Json
{
    "username" : "Aku",
    "password" : "pass123",
}
```

- Response Body Success :

```Json
{
  "data" : {
    "token" : "unique-token"
  }
}
```
- Response Body Error :

```Json
{
    "error" : "Username or password wrong"
}

```
## Update User APi
Endpoint : PATCH /api/users/current

Headers : Authorization = token

- Request Body :
```Json
{
    "username" : "Saya", //opsional
    "password" : "newpass123", //opsional
}
```

- Response Body Success :

```Json
{
  "data" : {
   "username" : "Saya",
    "password" : "newpass123",
  }
}
```
- Response Body Error :

```Json
{
    "error" : "Username length min 6"
}

```
## Get User API
Endpoint : GET /api/users/curent

Headers : Authorization = token

- Response Body Success :

```Json
{
  "data" : {
    "ussername" : "Aku",
    "name"      : "Aku Ganteng"
  }
}
```

- Response Body Error :

```Json
{
    "error" : "Unauthorized"
}

```
## Logout User API
Endpoint : DELETE /api/users/logout

Headers : Authorization = token

- Response Body Success :

```Json
{
  "data" : "Logout success"
}
```

- Response Body Error :

```Json
{
    "error" : "Unauthorized"
}

```