# Address APi Spec

## Create Address API
EndPoint : POST /api/contacts/:contactId/addresses

Headers : Authorization = token

- Request Body :
```json
{
    "street" : "Jl. Kebon Jeruk",
    "city" : "Jakarta",
    "province" : "DKI Jakarta",
    "country" : "Indonesia",
    "postal_code" : "12345"
}
```
- Response Body Success:
```json
{
    "data" : {
        "id" : 1,
        "street" : "Jl. Kebon Jeruk",
        "city" : "Jakarta",
        "province" : "DKI Jakarta",
        "country" : "Indonesia",
        "postal_code" : "12345"
    }
}
```

- Response Body Error:
```json
{
    "error" : "Country is required"
}
```

## Update Address API
EndPoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers : Authorization = token

- Request Body :
```json
{
    "street" : "Jl. Kebon Jeruk",
    "city" : "Jakarta",
    "province" : "DKI Jakarta",
    "country" : "Indonesia",
    "postal_code" : "12345"
}
```
- Response Body Success:
```json
{
    "data" : {
        "id" : 1,
        "street" : "Jl. Kebon Jeruk Edited",
        "city" : "Jakarta",
        "province" : "DKI Jakarta",
        "country" : "Indonesia",
        "postal_code" : "12345"
    }
}
```

- Response Body Error:
```json
{
    "error" : "Country is required"
}
```

## Get Address API
EndPoint : GET /api/contacts/:contactId/addresses/:addressId

Headers : Authorization = token

- Response Body Success:
```json
{
    "data" : {
        "id" : 1,
        "street" : "Jl. Kebon Jeruk Edited",
        "city" : "Jakarta",
        "province" : "DKI Jakarta",
        "country" : "Indonesia",
        "postal_code" : "12345"
    }
}
```

- Response Body Error:
```json
{
    "error" : "Contact is not found"
}
```

## List Address API
EndPoint : GET /api/contacts/:contactId/addresses

Headers : Authorization = token

- Response Body Success:
```json
{
    "data" : [
        {
            "id" : 1,
            "street" : "Jl. Kebon Jeruk Edited",
            "city" : "Jakarta",
            "province" : "DKI Jakarta",
            "country" : "Indonesia",
            "postal_code" : "12345"
        },
        {
            "id" : 2,
            "street" : "Jl. Kebon Jeruk",
            "city" : "Jakarta",
            "province" : "DKI Jakarta",
            "country" : "Indonesia",
            "postal_code" : "12345"
        }

    ]
}
```

- Response Body Error:
```json
{
    "error" : "Contact is not found"
}
```

## Delete Address API
EndPoint : DELETE /api/contacts/:contactId/addresses/:addressId

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
    "error" : "Contact is not found"
}
```