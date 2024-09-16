# Contact API Spec
## Create Contact API
EndPoint : POST /api/contacts

Headers : Authorization = token

- Request Body :
```json
{
    "first_name" : "Shiin",
    "last_name" : "79",
    "email" : "shiin79@email.com",
    "phone" : "087363633727"
}
```

- Response Body Success:
```json
{
    "data" : {
     "id" : "1",
     "first_name" : "Shiin",
     "last_name" : "79",
     "email" : "shiin79@email.com",
     "phone" : "087363633727"
    }
}
```

- Response Body Error:
```json
{
   "error" : "Email is not valid format"
}
```

## Update Contact API
EndPoint : PUT /api/contacts/:id

Headers : Authorization = token

- Request Body :
```json
{
    "first_name" : "Shiin",
    "last_name" : "79",
    "email" : "shiin79@email.com",
    "phone" : "087363633727"
}
```

- Response Body Success:
```json
{
    "data" : {
     "id" : "1",
     "first_name" : "Shiin Edit",
     "last_name" : "79",
     "email" : "shiin79@email.com",
     "phone" : "087363633727"
    }
}
```

- Response Body Error:
```json
{
   "error" : "Email is not valid format"
}

```

## Get Contact API
EndPoint : GET api/contacts/:id

Headers : Authorization = token

- Response Body Success:
```json
{
    "data" : {
     "id" : "1",
     "first_name" : "Shiin Edit",
     "last_name" : "79",
     "email" : "shiin79@email.com",
     "phone" : "087363633727"
    }
}
```

- Response Body Error:
```json
{
   "error" : "contact is not found"
}
```

## Search Contact API
EndPoint : GET /api/contacts 

Headers : Authorization = token

Query params:

    - name : Search by first_name or last_name, using like //opsional
    - email : Search by email, using like //opsional
    - phone : Search by phone, using like //opsional
    - page : number of page, default 1
    - size : size per page, default 10

- Response Body Success:
```json
{
    "data" : [
     {
      "id" : "1",
      "first_name" : "Shiin Edit",
      "last_name" : "79",
      "email" : "shiin79@email.com",
      "phone" : "087363633727"
     },
     {
      "id" : "2",
      "first_name" : "Shiin",
      "last_name" : "79",
      "email" : "shiin79@email.com",
      "phone" : "087363633727"
     }
    ],
    "paging" : {
        "page" : "1",
        "total_page" : "3",
        "total_item" : "30"
    }
}
```

- Response Body Error:
```json
{
   "error" : "contact is not found"
}
```

## Remove Contact API
EndPoint : DELETE api/contacts/:id

Headers : Authorization = token

- Response Body Success:
```json
{
    "data" : "OK"
}
```

- Response Body Error:
```json
{
   "error" : "contact is not found"
}
    
```