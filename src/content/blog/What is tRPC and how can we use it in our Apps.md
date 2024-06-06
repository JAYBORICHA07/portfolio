---
layout: ../../layouts/LayoutBlogPost.astro
title: "What is tRPC and how can we use it in our Apps"
description: "In this article, we will explore the tRPC library and its features, which allow us to build efficient and scalable APIs for our applications."
pubDate: 2023-03-06
category: "DEV"
---

## Introduction

There are various ways available out there to make APIs like REST APIs, GraphQL, tRPC, and many more but today in this blog we are gonna have a look at what is tRPC how it works, why one should use tRPC, and a lot more. 

Building our application fully typesafe is a thing that every developer wants to do nowadays so that they would never run into runtime errors like the Reading property of undefined. tRPC allows us to build and use fully typesafe APIs without any schema or code generation like GraphQL.

## Why tRPC over REST or GraphQL ?

GraphQL and REST are the dominant way to implement typesafe APIs. If your front-end and back-end both are in Typescript then with the help of tRPC we can share types directly between our client and server, without relying on any extra code generation like we do in GraphQL.

tRPC is for full-stack Typescript developers. It makes it easy to write endpoints that you can safely use in both the front and backend of your app. Type errors with your API contracts will be caught at build time, reducing the surface for bugs in your application at runtime.

### Features of tRPC

tRPC comes with a lot of features including 
  - well-tested.
  - full static type-safety & autocompletion on the client for input, output, and errors.
  - No code extra generation.
  - tRPC has zero deps and a tiny clint side footprint
  - Easy to start with or add to your existing brownfield project.
  - The tRPC community has built adapters for all of the most popular frameworks.
  - Add typesafe observability to your application.
  - Requests made at the same time can be automatically combined into one

## How to setup/use tRPC

### 1. Define backend router


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o4ur2h6recic9mh10i5v.jpeg)

Here in this image we are creating three end point to get all the users, a particular user with I'd and to create a new user.


### 2. Creating router instance


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ckffq9bl2pqltaeig7nn.jpeg)

In this step we are initializing the tRPC backend. It's a good practise to do this in a separate file and export the helper function instead of whole tRPC.

next we will initialize our main router, commonly referred to as `appRouter` and we will also export the type of the router which we'll later use on the client.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dw338pmwv0s15gmh8rgl.jpeg)



### 3. Add a query procedure

use `publicProcedure.query()` to add a query procedure to the router.

In the following image, we are creating a procedure called `userList` that returns the list of users from our DB.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n07irg9efi5vuiewwn9m.jpeg)


### 4. Using input parser to validate procedure inputs

To implement the userById procedure, we need to accept input from the client. tRPC lets you define input parsers to validate and parse the input. You can define your own input parser or use a validation library of your choice, like zod, yup, or superstruct.

You define your input parser on publicProcedure.input(), which can then be accessed on the resolver function as shown below:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r5bggnrh9amyyc8pl5en.jpeg)

here  at line number 8 we will have type of input as :  `string`
and at line number 10 we will have type of user as : `User | undefined`

### 5. Adding a mutation procedure

Similar to GraphQL, tRPC makes a distinction between query and mutation procedures.

The way a procedure works on the server doesn't change much between a query and a mutation. The method name is different, and the way that the client will use this procedure changes - but everything else is the same!

Let's add a `userCreate` mutation by adding it as a new property on our router object:


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cg5obmtpjp1vyhlz115s.jpeg)


- Now we have defined our router, we can serve it. tRPC has many adapter (tRPC is not a server on its own, and must therefore be served using other hosts, such as a simple Node.js HTTP Server, Express, or even Next.js. Most tRPC features are the same no matter which backend you choose. Adapters act as the glue between the host system and your tRPC API.) so you can use any backend framework of your choice. To keep it simple, we'll use the standalone adapter.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0jetuq7ueuqeqskz97fp.jpeg)

## now we can use your backend on the client.


### 1. setup the tRPC Client

Links in tRPC are similar to links in GraphQL, they let us control the data flow before being sent to the server. In the example above, we use the httpBatchLink, which automatically batches up multiple calls into a single HTTP request


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bcbqozg56pkth0zc5zze.jpeg)


### 2. Querying & mutating

You now have access to your API procedures on the trpc object. Try it out!


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ryjcyxdbabrjmwlb862a.jpeg)

now in this image at line no 2 we will automatically have user with type 
```
const user : {
            name : string;
            id : string;
     } | undefined
```
and createUser with type 
```
const createUser : {
            name : string;
            id : string;
}
```
