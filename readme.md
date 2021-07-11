# Contact API

**_Get in contact_**

## Overview

This API will hepl you with:

- getting list of contacts
- getting certain contact by Id
- adding contact
- changing contact
- deleting contact
- additional field 'favorite' can hepl you to sort the contacts

## Getting started

Please use `http://yourhostname/api/contacts`

## Commom routes

`get '/'`

Returns list of all contacts

`get '/:contactId'`

Returns specific contact with Id

`post '/'`

Adds new contact

By default field 'favorite' is `false`

Returns `status:success`

`delete '/:contactId`

Deletes specefic contact with Id

Returns `status:success`

`put '/:contactId'`

Changes contact

Returns `status:success`

`patch '/:contactId/favorite'`

Changes the field 'favorite' to sent value

Retuns updatedContact and `status:success`

## Authorization

`post '/signup'`

Creates new user: email and password are needed

`post '/login'`

Authorisizes the user

Returns back Token

Token is needed to access the contacts

`post '/logout'`

Logouts the user

Token is set as `null`

`get '/current'`

Token is needen in request headers
Returns user`s email and state of subscription

## Validation

The fields 'name', 'email' and 'phone' are required in `post` and `put`

Name`s length has to be more than 3 and less than 30 letters, consists only of a-z, A-Z, and 0-9

Emails segments number has to be 2, 'com' and 'net' domains are allowed
