# SQL Basic Queries

Here you will find some exercises and his explanation. This documentation has the purpose of understand the basic syntax of SQL DataBases, using MySQL as model and explaining exercises found in the github what you will find down.

Goal: Understand the basic SQL Syntax and do queries

Github Gist: [Click Here](https://gist.github.com/andrescortesdev/af60b67b38e14a1adde6e58fdc45b8a7)

## Level 1, Fundamentals

![Image](/img/sql/basic-queries/level1.png)

In the first level, we will do basic queries using commands of SQL as SELECT, WHERE, logical operators and NULL datetype.

### Exercise 1

*List all users.*

```
SELECT * FROM users;
```

The SELECT command will select the dates what I write next to it. In this case, I want select all columns of the table users.

### Exercise 2

*Show only first_name, last_name, email.*

```
SELECT DISTINCT first_name, last_name, email FROM users;
```

Compared to the previous one, in this case we only want search the first name, the last name and the emails of the users. We use DISTINCT for evade repeated dates.

### Exercise 3

*Filter users whose role is 'admin'.*

```
SELECT * FROM users WHERE role = 'admin';
```

In this case I am doing the WHERE command for make a condiniotal search. I am talking to the system: Hey, please give me just the users WHERE the role column value is admin.

WHERE is used specially for make conditional searchs, where the query will only return the matches.

### Exercise 4

*Filter users with document_type = 'CC'.*

```
SELECT * FROM users WHERE document_type = 'CC';
```

This is equal to the last one, but using the document_type column value;

### Exercise 5

*Show users over 18 years old (calculate age from birth_date).*

```
SELECT * FROM users WHERE birth_date <= "2008/02/18";
```

Another example using dates comparation. If the birth_date of the user is minor to "2008/02/18", throw the user. This query was for search just the users that are 18 years old or older.

### Exercise 6

*Show users whose income is greater than 5,000,000.*

```
SELECT * FROM users WHERE monthly_income > 5000000;
```

Another example, also using logic operators.

### Exercise 7

*Show users whose name begins with "A".*

```
SELECT * FROM users WHERE first_name LIKE "A%";
```

In this exercise I am using the LIKE command. This command is helpful for search text patterns, used for filter results that need a text condition. The "A$" indicate that JUST the names starting by the letter A/a will be returned. 

It's important to say what MySQL is non-case-sensitive, so that query will return the names starting by A and a.

### Exercise 8

*Show users who do not have a company.*

```
SELECT * FROM users WHERE company IS NULL;
```

Here, I am using the IS command. When you have a date and you want check is it's null, you can't use the equal logic operator (=). In this cases, you must use the IS command, like is used in the exercise.

## Level 2, Conditions Combinations

![Image](/img/sql/basic-queries/level2.png)

In this sequence of exercises, we will use the past exercises but combinating with boolean logic and multiple conditions 

### Exercise 9

*Users over 25 years of age who are 'employed'.*

```
SELECT * FROM users WHERE birth_date <= "2001/02/18" AND role = 'employee';
```

The AND command is used for add a condition to the statement, where is also included OR. This commands are used with boolean logic.

### Exercise 10

*Active users with 'CC'.*

```
SELECT * FROM users WHERE document_type = 'CC' AND is_active = 1;
```

### Exercise 11

```
SELECT * FROM users WHERE birth_date <= "2008/02/18" AND monthly_income IS NULL;
```

### Exercise 12

```
SELECT * FROM users WHERE monthly_income > 3000000;
```

### Exercise 13

```
SELECT * FROM users WHERE marital_status = 'Casado' AND children_count >= 1;
```

### Exercise 14

```
SELECT * FROM users WHERE birth_date <= "1996/02/18 AND birth_date >= "1986/02/18";
```

### Exercise 15

```
SELECT * FROM users WHERE role = 'admin' AND birth_date <= '2001/02/18';
```

## Level 3, Analytics Introduction

![Image](/img/sql/basic-queries/level3.png)

In this section, we will introduct to read patterns and process the data.

### Exercise 16

```
SELECT role, COUNT(role) FROM users WHERE role = 'user';
SELECT role, COUNT(role) FROM users WHERE role = 'employee';
SELECT role, COUNT(role) FROM users WHERE role = 'admin';
```

The COUNT function in MySQL is used for count the total of columns found with that condition.

### Exercise 17

```
SELECT document_type, COUNT(document_type) FROM users WHERE document_type = 'CC';
SELECT document_type, COUNT(document_type) FROM users WHERE document_type = 'TI';
SELECT document_type, COUNT(document_type) FROM users WHERE document_type = 'RC';
SELECT document_type, COUNT(document_type) FROM users WHERE document_type = 'CE';
SELECT document_type, COUNT(document_type) FROM users WHERE document_type = 'PP';
```

This exercise is like the last one, but counting how much users are by each document type.

### Exercise 18

```
SELECT COUNT(first_name) FROM users WHERE monthly_income IS NULL;
```

### Exercise 19

```
SELECT AVG(monthly_income) FROM users;
```

The AVG function is used for calculate the average of a puntual quantity of numbers. In this case, we want know what is the promedium of the monthly income in base of the registered users.

### Exercise 20

```
SELECT AVG(monthly_income) FROM users WHERE role = 'user';
SELECT AVG(monthly_income) FROM users WHERE role = 'employee';
SELECT AVG(monthly_income) FROM users WHERE role = 'admin';
```

This exercise is like the last one, but searching it by role.

## Level 4, Analytic Thought

![Image](/img/sql/basic-queries/level4.png)

In this section we will understand and learn how is GROUP BY, ORDER BY, LIMIT and HAVING SQL commands. 

### Exercise 21

```
SELECT profession, COUNT(profession) FROM users GROUP BY profession HAVING COUNT(profession) >= 10;
```

The HAVING command is used for make conditions after the WHERE statement. The diffence with WHERE and HAVING is that WHERE filter the results before group the results, and HAVING is used for filter the results after the agrupation.

### Exercise 22

```
SELECT city, COUNT(city) FROM users GROUP BY city ORDER BY COUNT(city) ASC;
```

In this exercise we are using the GROUP BY command. GROUP BY is used for group the results by any column. In this exercise, we are using it with the city column. Understand it like this way: Please, SQL, group me the results by the city column values.

Also, we are using ORDER BY. This command is used for order the data that matched with all conditions. There are two possibles options in ORDER BY: DESC and ASC. DESC is used for show the data descending, or, in other words, since top to bottom values. ASC is used for show the data ascending, or since bottom to top.

### Exercise 23

```
SELECT COUNT(birth_date) FROM users WHERE birth_date <= "2008/02/18";
SELECT COUNT(birth_date) FROM users WHERE birth_date >= "2008/02/19";
```

### Exercise 24

```
SELECT city, AVG(monthly_income) FROM users GROUP BY city ORDER BY AVG(monthly_income) DESC;
```

### Exercise 25

```
SELECT first_name, monthly_income FROM users ORDER BY monthly_income DESC LIMIT 5;
```

In this case, I am using the LIMIT command. LIMIT is helpful for limit the results to the quantity that I am requesting. In this case, I just want see the top 5 results.

## Level 5, Ingeniery Level

![Image](/img/sql/basic-queries/level5.png)

In this level we start thinking in dates, not in commands.

### Exercise 26

```
SELECT first_name, birth_date,
    CASE
        WHEN birth_date > "2008/02/19" THEN "Menor de edad"
        WHEN birth_date <= "2008/02/19" AND birth_date > "1996/02/19" THEN 'Adulto'
        ELSE 'Adulto mayor';
    END AS clasification
FROM users;
```

In this case I am using the CASE statement. This is used for make longer conditionals in the SELECT command. WHEN means the conditions, THEN means the result of the condition. ELSE is the default value. END AS is the name what you will give to the column result.

### Exercise 27

```
SELECT first_name, birth_date,
    CASE
        WHEN birth_date > "2008/02/19" THEN "Menor de edad"
        WHEN birth_date <= "2008/02/19" AND birth_date > "1996/02/19" THEN 'Adulto'
        ELSE 'Adulto mayor';
    END AS clasification,
    COUNT(*) AS total
FROM users
GROUP BY clasification;
```

### Exercise 28

```
SELECT city, monthly_income
FROM users
WHERE monthly_income IS NOT NULL
ORDER BY monthly_income DESC
LIMIT 5;
```

### Exercise 29

```
SELECT profession, AVG(monthly_income)
FROM users
WHERE profession IS NOT NULL
GROUP BY profession
ORDER BY AVG(monthly_income) DESC
LIMIT 1;
```

### Exercise 30

```
SELECT * FROM users WHERE monthly_income > (
    SELECT AVG(monthly_income)
    FROM users
);
```

Here I'm doing a subquery inside the where statement. You can't use AVG or that type of functions in the WHERE statement, so, making a subquery you can select the information what you are searching.