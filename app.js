const express = require(`express`);
const app = express();
const path = require(`path`);
const mariadb = require('mariadb');
const jwt = require('jsonwebtoken');
const port = 3000;
const cors = require('cors');
app.use(cors());

const dataFolderPath = path.join(__dirname);

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "entrega8",
    connectionLimit: 5
});

app.post('/verifylogin', express.json(), async (req, res) => {
    const { username, password } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const user = await conn.query(`SELECT * FROM users WHERE username="${username}" AND password="${password}"`);
        if (user.length === 0) {

            res.status(404).json({ message: 'No se encontró el usuario' });

        } else {

            const token = jwt.sign({ userId: user.Id }, 'secretKey', { expiresIn: '1h' });
            res.json({ token });

        }
    } catch (error) {

        res.status(500).json({ message: "No se pudo conectar al servidor" });

    } finally {

        if (conn) conn.release();

    }
});

const verificacion = (req, res, next) => {
    const token = req.header('Autorización');
    if (token === undefined) {
        return res.status(400).json({ message: 'Error, los datos deben ser correctos para ingresar. Verifique sus datos.' })
    }

    try {
        const verificationUser = jwt.verify(token, 'secretKey');
        req.usuario = verificationUser;
        next();
    }

    catch (error) {
        res.status(400).json({ message: 'Verificación incorrecta' });
    }
};

app.post("/registrar", express.json(), async (req, res) => {
    const { username, password } = req.body;

    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(`INSERT INTO users (username, password) VALUES ("${username}", "${password}")`);

        res.status(201).json({ message: 'Se creó el usuario con el id: ' + parseInt(response.insertId) });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Se rompió el servidor" });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

app.get('/cats/', (req, res) => {
    const filePath = path.join(dataFolderPath, `cats`, `cat.json`);
    res.sendFile(filePath);
});


app.post('/insertproduct', express.json(), async (req, res) => {
    const { id, pname, punitCost, pcurrency, pimage, username } = req.body;

    let conn;
    try {
        conn = await pool.getConnection();
        const product = await conn.query(`SELECT * FROM carrito WHERE name="${pname}" AND username="${username}"`);
        if (product.length === 0) {
            const response = await conn.query(`
            INSERT INTO carrito (id, name, count, unitCost, currency, image, username) 
            VALUES ("${id}", "${pname}", "${1}", "${punitCost}", "${pcurrency}", "${pimage}", "${username}")
            `);
            res.status(201).json({ message: 'Se agregó un producto al carrito' });
        } else {
            const response = await conn.query(`
            UPDATE carrito (count) 
            VALUE ("${(product[0].count + 1)}")`);

            res.status(201).json({ message: 'Se modificó la cantidad de productos en el carrito' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Se rompió el servidor" });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

app.put('/modifycart', express.json(), async (req, res) => {
    const { username, pname, pconut } = req.body;

    let conn;
    try {
        conn = await pool.getConnection();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Se rompió el servidor" });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

app.get('/cart', verificacion, express.json(), async (req, res) => {

    res.json();
});


app.get('/cats_products/:id', (req, res) => {
    const cats_productsId = req.params.id;
    const filePath = path.join(dataFolderPath, `cats_products`, `${cats_productsId}.json`);
    res.sendFile(filePath);
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const filePath = path.join(dataFolderPath, `products`, `${productId}.json`);
    res.sendFile(filePath);
});

app.get('/products_comments/:id', (req, res) => {
    const products_commentsId = req.params.id;
    const filePath = path.join(dataFolderPath, `products_comments`, `${products_commentsId}.json`);
    res.sendFile(filePath);
});

app.get('/sell/:id', (req, res) => {
    const sellId = req.params.id;
    const filePath = path.join(dataFolderPath, `sell`, `${sellId}.json`);
    res.sendFile(filePath);
});


app.get('/user_cart/:id', (req, res) => {
    const userID = req.params.id;
    const filePath = path.join(dataFolderPath, `user`, `${userID}.json`);
    res.sendFile(filePath);
});

app.listen(port, () => {
    console.log(`servidor corriendo en http://localhost:${port}`);
})
