CREATE DATABASE fruitpal;

CREATE TABLE fruit(
    fruit_id SERIAL PRIMARY KEY,
    country VARCHAR(255),
    commodity VARCHAR(255),
    fixed_overhead FLOAT,
    variable_cost FLOAT
);