const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middleware
app.use(cors());
// to get data from client side
app.use(express.json()); // req.body

// ROUTES
// create a fruit - async to await before continue
app.post('/fruits', async (req, res) => {
  try {
    for (fruit in req.body) {
      const country = req.body[fruit].COUNTRY;
      const commodity = req.body[fruit].COMMODITY;
      const fixed_overhead = parseFloat(req.body[fruit].FIXED_OVERHEAD);
      const variable_cost = parseFloat(req.body[fruit].VARIABLE_COST);

      const newFruit = await pool.query(
        'INSERT INTO fruit (country, commodity, fixed_overhead, variable_cost) VALUES($1,$2,$3,$4) RETURNING *',
        [country, commodity, fixed_overhead, variable_cost]
      );

      res.json(newFruit);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// get all fruits
app.get('/fruits', async (req, res) => {
  try {
    const allFruits = await pool.query('SELECT * FROM fruit');
    res.json(allFruits.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a fruit
app.get('/fruits/:id', async (req, res) => {
  try {
    //console.log(req.params);
    const { id } = req.params;
    const fruit = await pool.query('SELECT * FROM fruit WHERE fruit_id = $1', [
      id,
    ]);
    res.json(fruit.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a fruit
app.put('/fruits/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const country = req.body.COUNTRY;
    const commodity = req.body.COMMODITY;
    const fixed_overhead = req.body.FIXED_OVERHEAD;
    const variable_cost = req.body.VARIABLE_COST;

    const updateFruit = await pool.query(
      'UPDATE fruit SET country = $1, commodity = $2, fixed_overhead = $3, variable_cost = $4 WHERE fruit_id = $5',
      [country, commodity, fixed_overhead, variable_cost, id]
    );

    res.json('Fruit was updated');
  } catch (err) {
    console.error(err.message);
  }
});

// delete a fruit
app.delete('/fruits/:id', async (req, res) => {
  try {
    //console.log(req.params);
    const { id } = req.params;
    const deleteFruit = await pool.query(
      'DELETE FROM fruit WHERE fruit_id = $1',
      [id]
    );
    res.json('Fruit was deleted');
  } catch (err) {
    console.error(err.message);
  }
});

// trade calculation
app.post('/trades', async (req, res) => {
  try {
    const commodity = req.body.COMMODITY;
    const priceperton = req.body.PRICE;
    const tradevolume = req.body.TONS;

    const allCommodities = await pool.query(
      'SELECT country as "COUNTRY", ROUND(CAST((($1+variable_cost)*$2 + fixed_overhead) as NUMERIC), 2) ' +
        ' AS "TOTAL_COST", fixed_overhead as "FIXED_OVERHEAD", ($3 + variable_cost) AS "VARIABLE_COST" FROM fruit where ' +
        'commodity=$4 ORDER BY "TOTAL_COST" desc',
      [priceperton, tradevolume, priceperton, commodity]
    );

    res.json(allCommodities.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log('server has started on port 5000');
});
