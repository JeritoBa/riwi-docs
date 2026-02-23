# DB Normalization

In this section, I will make some exercises about DB good practices, following some popular rules knowed as DB normalization. This rules has the purpose of develop more clean databases, what can be scaled with facility.

But, before starting, what is normalization?

Normalization is the process of organize a database, with the purpose of avoid redundace and anomalies, like errors when you insert, update or delete dates.

---

Here are a list of the most popular normalization rules:

1. Atomicity: A table is 1FN (First normalization rule) is each camp has atomic values (not lists, not arrays). There isn't repetitive groups, and each row is unique (has primary key)

For example:

| id | name | phones |
| :--- | :---: | ---: |
| 1 | Jeremy | 31423, 21542 |

In this case, we have a column that includes multiples values. The normalization recommends to avoid this practice and, in this case, create a different table where you indicate the phones of a user, like this:

| id | name |
| :--- | ---: |
| 1 | Jeremy |

| user_id | phone |
| :--- | ---: |
| 1 | 31423 |
| 1 | 21542 |

2. Not parcial dependencies: There cannot exists parcial dependencies. All attributes must depend completely of the primary key. This applies when the primary key is composed.

For example:

| order_id | product_id | product_name | quantity |
| :--- | :---: | :---: | ---: |

```product_name``` depends only of ```product_id```, not of all the composed key.

In this case, you must separate the products attributes and the order details attributes, like this:

| order_id | product_id | quantity |
| :--- | :---: | ---: |

| product_id | product_name |
| :--- | ---: |

This two rules are the principal bases for a good database, the other rules are in very specific cases, and in the most quantity of cases, if you do well the first two rules, you don't will need the others.

---

Now, I will start with the exercises:

## Exercise 1

![Image](/img/sql/normalization-excel/level1.png)

And the table must remain like this: 

![Image](/img/sql/normalization-excel/level1_solved.png)

## Exercise 2

![Image](/img/sql/normalization-excel/level2.png)

And the table must remain like this: 

![Image](/img/sql/normalization-excel/level2_solved.png)

## Exercise 3

![Image](/img/sql/normalization-excel/level3.png)

And the table must remain like this: 

![Image](/img/sql/normalization-excel/level3_solved.png)

## Exercise 4

![Image](/img/sql/normalization-excel/level4.png)

And the table must remain like this: 

![Image](/img/sql/normalization-excel/level4_solved.png)