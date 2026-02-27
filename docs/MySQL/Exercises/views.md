# Creating Views

In this short documentation, I will explain how to create views and what are the views in SQL and DBeaver. This is a short documentation.

Here you will learn:
- What is a view
- How to create a view
- Examples

With nothing more to say, go ahead!

---

## Views, what are?

A view is a new table what you create in MySQL. This function let us to generate new fields what doesn't exists in the original tables. 

For example: Suppose that we have a table users, there are attributes like first_name, last_name, birth_date, etc...
You want a new table with the same data that already exist's in users table. For avoid creating a new table with mysql and re-inserting all data, you can create a view.

The views allows us to calculate new data fiels, according to our needs.

## How to create a view?

For create a view, you must be connected to any database and follow the next command lines:

```
CREATE VIEW name_of_your_view AS
**** --> A normal query
```

For example, I have the next users table:

| id | first_name | last_name | birth_date | monthly_income |
| :--- | :---: | :---: | :---: | ---:
| 1 | Jerónimo | Gallego | 11/02/2008 | 200000 |

And I want a new table with ```full_name, age``` attributes.

We can create that table like this:

```
CREATE VIEW user_info AS
SELECT
    id
    CONCAT(first_name, " ", last_name) AS full_name,
    TIMESTAMPDIFF(YEAR, birth_date, NOW()) AS age,
    monthly_income
FROM users;
```

This will create a new table with the new generated fields.

---

## Examples

Next to this, I will resolve some exercises of the Github Gist below this. 

Github Gist: [Click Here](https://gist.github.com/andrescortesdev/2ebd824b75f9504f24d283b474b1009a)

### Level 1

![Image](/img/sql/views/level1.png)

### Level 2

![Image](/img/sql/views/level2.png)

### Level 3

![Image](/img/sql/views/level3.png)

### Level 4

![Image](/img/sql/views/level4.png)

### Level 5

![Image](/img/sql/views/level5.png)