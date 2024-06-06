---
layout: ../../layouts/LayoutBlogPost.astro
title: "Beyond Basic Validation: Elevating Your Form Data Handling Strategy"
description: ""
pubDate: 2023-03-10
category: "DEV"
---

## Intro

Welcome back, everyone. In this blog, we will be talking about what is validation, how it is done at the front end, what tools are used and why should we validate at the front end.

## What is validation?

Data validation is the process of checking the structure of the data before it is used anywhere in the project. In validation, we already have the structure of the data ready with us and we just check whether the data we have received from the user is matching our structure or not.

## Why should we do data validation?

Whether it be front end or back end the data validation is one of the most important point part. With the help of data validation one can make sure that the data we are sending from frontend to the backend is in our desired format or not and if it is not in our desired format it won't be able to make it to the backend and it will throw some kind of error. At the same time in the back end when we receive any kind of data first we check the structure means we validate the data which we have received from the front end and if it matches our desired structure only then we proceed further.

## How validation is done on the front-end side?

To do data validation on the front-end side there are various libraries available like yup, zod, etc.
In this blog, we are gonna use Yup for code examples but you can use the library of your own choice.

---


We can install yup in our react or any other front-end project by running the following command in the terminal

```npm install yup```

after installing the Yup library we can get started by importing a few things from it as shown in the example below.


![Image of code sample demostrating the YUP validation](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jcwvpd4zhunmyjyjku1i.png)

in this example in line no. 4, we are creating a structure of how our data should look like. This structure will be used in the future to validate the input data.

Yup has a very easy-to-understand syntax that anyone can easily understand by the ` .object ` property we are telling yup that our data will be an object, and with ` .required() ` we are telling that it is a required string. In this schema example we are defining that we this will be the type of object that will have the name as required string, email with string type email and required, and so on. 

After defining our data with help of this Yup schema we can also validate the data with help of ` .validate() ` method, then if there will be any error with validation we can simply get that with help of a catch block.

This was a simple explanation how we can validate data on the front-end side. 
