const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Додаємо для обробки form-data
const db = require("./db"); // Імпорт pool з db.js

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Для сумісності з формами

// Ендпоінт для продуктів (використовуємо db.pool)
app.get("/products", async (req, res) => {
  try {
    const result = await db.pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Помилка при запиті до бази");
  }
});

// Новий ендпоінт для створення замовлення
app.post("/orders", async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    city,
    phone,
    comments,
    items,
    total = 0,
  } = req.body;

  try {
    await db.pool.query(
      `INSERT INTO orders (first_name, last_name, address, city, phone, comments, items, total)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        firstName,
        lastName,
        address,
        city,
        phone,
        comments,
        JSON.stringify(items),
        total,
      ]
    );
    res.send("✅ Замовлення прийнято та збережено в базі!");
  } catch (err) {
    console.error("Детальна помилка вставки:", err.message, err.stack);
    res.status(500).send("Помилка при збереженні замовлення");
  }
});

// Запуск сервера
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});

module.exports = app;
