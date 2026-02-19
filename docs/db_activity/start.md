# First steps in SQL

When you start with relationed databases, you must need understand some short concepts:

### Think with data, no with code

As a programmer, is very common to think first with the code. You start thinking how can I do any think
directly with code, and this is a very common error.

Before start the application, is very recommendable make a short UML for see what things must I need for
my application. 

This advice follows a very common saying: Make the thins good in the low concept,
and it will grow as a good way.

## Step-By-Step

Here's a very simple guide for start with SQL when you don't know anything

### Understand what I need

Read the problem what I have or the need what I must give solution. For example:
I have data of users, each user have:
- Name
- Email
- Role (in the system)
- Document Type
- Birth Date
- Company
- Incomes

Those all dates are needed to format as a independent way, this is recognized as
good practices into the SQL languaje, the atomicity.

Between more smallest and independent is a date, more easy will be hold it when
it scales.

### Create the tables

In SQL you can create a table very easy, just first connect into a database, and open a SQL Editor Script and follow the next steps:

```
1. CREATE TABLE username_db.name_of_table(
    name_of_date type_of_date conditions
);

Example:

CREATE TABLE jerogallegodb.users(
    first_name varchar(50) not null,
    email varchar(50) not null,
    birth_date varchar(10) not null
);
```

