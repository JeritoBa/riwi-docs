# Connection with Express

In this documentation, we will learn how to make an app with express, connecting the database MySQL with our application.

For this app we will need the next modules, required for the development:

```
- express
- mysql2
- morgan (extra)
- nodemon (extra)
```

Express will be helpful as a framework of NodeJS, mysql2 will be required for the connection with MySQL Database. Morgan it's an extra for handle the HTTP requests to the server, and show them in the console. Nodemon is for save and reload the changes of the server files, without recharging with the terminal.

In this short documentation, I will focus on how handle mysql2 and the connection with the DB. Express knowledges will not been explained here.

---

## Connection with MySQL

For make queries in Javascript to MySQL, you must follow the next command lines:

```
const mysql = require("mysql2)

const pool = mysql.createPool({
    host: 'HOST_DIRECTION',
    user: 'DB_USER',
    password: 'DB_PASSWORD',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})
```

This command lines will create a pool of connections what we can do with MySQL. There are some parameters that it's helpful indicate.

```waitForConnections``` is for indicate to the pool that, if all connections are busy, start a wait as a queue.

```connectionLimit``` is for establish a limit of synchronous connections, in this case is 10.

```queueLimit``` is for establish a limit in the queue row. In this case, we're not putting any limit.

## Example of Queries

For make a request to the database, we use the next command lines:

```
pool.query(
    'SQL QUERY',
    SECRET_PARAMS,
    HANDLING FUNCTION
)
```

This function get's 3 parameters:

- The SQL Query: Is where you write the SQL command. This syntax must be the same of SQL, following all the same rules.

- Protected params for the query: In the SQL Query, you often need certain conditions in your query (the requeriments that are putted in the WHERE statement). For avoid SQL injections and protect the database, you must establish the params like this: ```'SELECT * FROM users WHERE id = ?', [1]```. Here I'm indicatinh that I only want the user in with the user id 1. 

- Function what handles the data: Here, you may put the code lines inside a callback function, where you can manage the dates sent by the database. It's important to handle any errors inside this function.

Here is a example of a express route with a protected query:
```
app.get('/level1/4', (req, res) => {
    pool.query(
        `
        SELECT users.name
        FROM users
        LEFT JOIN orders ON users.id = orders.user_id
        WHERE orders.id IS ?
        `,
        [null],
        (err, results) => showResults(err, results, res)
    )
})
```

---

## Exercises

Having said this, I will show all the exercises found in a Github Gist, for practice the express connections and the SQL queries.

Github Gist: [Click Here](https://gist.github.com/andrescortesdev/85d96f121b02813aabce686664459b63)

It's important to define this function, that will be the handler with all data responses for avoid repeating code.

```
function showResults(err, results, res) {
    if(err) {
        console.error("SQL QUERY Error:", err)

        res.status(500).json({error: "SQL Error"})
    }

    res.json(results)
}
```

### Level 1

There are the solutions of the exercises since 1 to 10:

![Image](/img/sql/express-mysql/level1_1-5.png)
![Image](/img/sql/express-mysql/level1_6-10.png)

### Level 2

There are the solutions of the exercises since 11 to 20:

![Image](/img/sql/express-mysql/level2_11-14.png)
![Image](/img/sql/express-mysql/level2_15-18.png)
![Image](/img/sql/express-mysql/level2_19-20.png)

### Level 3

There are the solutions of the exercises since 21 to 30:

![Image](/img/sql/express-mysql/level3_21-24.png)
![Image](/img/sql/express-mysql/level3_25-29.png)
![Image](/img/sql/express-mysql/level3_30.png)

### Level 4

There are the solutions of the exercises since 31 to 40: