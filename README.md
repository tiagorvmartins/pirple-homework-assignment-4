# pirple-homework-assignment-3
This is my public repo for the Pirple Homework Assignment #3

## API Definition

### /users

#### [POST]  http://localhost:3000/users


Example payload request:

```json
{
    "name": "Your Name",
    "emailAddress": "your_address@your_domain.com",
    "streetAddress": "your street address",
    "password": "yourpassword"
}
```


#### [GET]  http://localhost:3000/users?id=a688f4dbc11ead7d9902ef10347e2eebec1c9eae38521cfb3e6bc19aa0c1df98

Requires authentication in header, the token key like this:

token : 3vwqxudaw6fmf9sowjdu

The required id in querystring is the hashed emailAddress, such that the system allows unique users with their unique emailAddress.


#### [PUT]  http://localhost:3000/users

Requires authentication in header, the token key like this:

token : 3vwqxudaw6fmf9sowjdu

```json
{
	"id": "a688f4dbc11ead7d9902ef10347e2eebec1c9eae38521cfb3e6bc19aa0c1df98",    //required field
	"name":"New Name",
	"streetAddress":"New Street",
	"password":"NewPassword"
}
```

#### [DELETE] http://localhost:3000/users?id=a688f4dbc11ead7d9902ef10347e2eebec1c9eae38521cfb3e6bc19aa0c1df98

Requires authentication in header, the token key like this:

token : 3vwqxudaw6fmf9sowjdu

Note: it removes the token associated with the user.


______________________________________________________________________________________________________________



### /login

#### [POST]  http://localhost:3000/login

```json
{
	"emailAddress": "your_address@your_domain.com",
	"password": "NewPassword"

}
```

Note: it doesn't create more tokens if there is already a valid (not expired) token for the user.


______________________________________________________________________________________________________________



### /logout

#### [POST]  http://localhost:3000/logout

Requires authentication in header, the token key like this:

token : 3vwqxudaw6fmf9sowjdu

Note: it removes the token from the system itself.


______________________________________________________________________________________________________________



### /menu

#### [GET] http://localhost:3000/menu

Requires authentication in header, the token key like this:

token : 3vwqxudaw6fmf9sowjdu

Returns the list of possible pizza's to select, not hardcoded, but each pizza exist on a separate file called 'menuitems' in the data folder.


______________________________________________________________________________________________________________



### /cart

#### [GET] http://localhost:3000/cart

Requires authentication in header, the token key like this:

token : 3vwqxudaw6fmf9sowjdu

Returns the current list of items in user's cart.


______________________________________________________________________________________________________________



### /cart

#### [PUT] http://localhost:3000/cart


Requires authentication and userid in header, like this:

token : 3vwqxudaw6fmf9sowjdu
userid: a688f4dbc11ead7d9902ef10347e2eebec1c9eae38521cfb3e6bc19aa0c1df98

```json
{
	"item":"cheese_bacon"
}
```

Note: item should be a valid pizza name from the list of available pizzas. It allows multiple to add multiple pizzas with same name to the cart. After adding the shoppingcart array of the user object is updated.


#### [DELETE] http://localhost:3000/cart

Requires authentication and userid in header, like this:

token : 3vwqxudaw6fmf9sowjdu
userid: a688f4dbc11ead7d9902ef10347e2eebec1c9eae38521cfb3e6bc19aa0c1df98

```json
{
	"item":"cheese_bacon"
}
```

Note: it removes the first single pizza on the shoppingcart array of the user with the same pizza name requested. It doesn't remove nor update if pizza name wasn't found or shopping cart is empty.


______________________________________________________________________________________________________________



### /order

#### [GET] http://localhost:3000/order

Requires authentication and userid in header, like this:

token : 3vwqxudaw6fmf9sowjdu
userid: a688f4dbc11ead7d9902ef10347e2eebec1c9eae38521cfb3e6bc19aa0c1df98


Note: Using the id on query string, lookup and fetch the order object from the orders data folder.

Example:
```json
{
    "id": "wr5pwe84uqbayywbytqe",
    "userId": "a688f4dbc11ead7d9902ef10347e2eebec1c9eae38521cfb3e6bc19aa0c1df98",
    "payed": false,
    "mail_sent": false,
    "totalPrice": 24.98,
    "items": [
        "ardente",
        "cheese_bacon"
    ]
}
```


#### [POST] http://localhost:3000/order

Requires authentication and userid in header, like this:

token : 3vwqxudaw6fmf9sowjdu
userid: a688f4dbc11ead7d9902ef10347e2eebec1c9eae38521cfb3e6bc19aa0c1df98


Note: it creates a new order with all the items on user's shopping cart and save it on the system, using the data folder called 'orders', the total price of the order is also calculated based on each price of each pizza on the order.
After placing the order the shopping cart gets empty and a new order id goes to the orders array of user object as the following example shows.

Example:
```json
{
    "id": "a688f4dbc11ead7d9902ef10347e2eebec1c9eae38521cfb3e6bc19aa0c1df98",
    "name": "Name",
    "emailAddress": "Email Example",
    "streetAddress": "Street Example",
    "orders": [
        "wr5pwe84uqbayywbytqe"
    ],
    "shoppingcart": []
}
```

______________________________________________________________________________________________________________



### /checkout

#### [POST] http://localhost:3000/checkout

Requires authentication and userid in header, like this:

token : 3vwqxudaw6fmf9sowjdu
userid: a688f4dbc11ead7d9902ef10347e2eebec1c9eae38521cfb3e6bc19aa0c1df98

Also requires the following data on body (json), the id of the order to checkout and the stripe token to apply the charge (in this case it's a test token)
```json
{
	"orderId":"wr5pwe84uqbayywbytqe",
	"stripeToken":"tok_mastercard_debit"
}
```

After charging an email is sent to the user, and the variables regarding 'payment' and 'email sent' of the order are updated depending on the success of both operations.
Example of a order in which both payment and email were sent with success:

```json
{
    "id": "wr5pwe84uqbayywbytqe",
    "userId": "a688f4dbc11ead7d9902ef10347e2eebec1c9eae38521cfb3e6bc19aa0c1df98",
    "payed": true,
    "mail_sent": true,
    "totalPrice": 24.98,
    "items": [
        "ardente",
        "cheese_bacon"
    ]
}
```




###### *Note: Public and Private key generated using a third-party library (at https://wiki.openssl.org/index.php/Binaries) of OpenSSL.*
###### *Note: All the credits for favicon icon's usage goes to prettycons (https://www.flaticon.com/authors/prettycons).*
###### *Note: All the credits for shopping cart icon's usage goes to Gregor Cresnar at prettycons (https://www.flaticon.com/authors/gregor-cresnar).*


#### *Pizza images credits:*

##### *Photo by Alan Hardman on Unsplash*
##### *Photo by Thomas Tucker on Unsplash*
##### *Photo by ivan Torres on Unsplash*
##### *Photo by ivan Kristina Bratko on Unsplash*
##### *Photo by ivan Matteo Vistocco*
