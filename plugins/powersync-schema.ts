

import { column, Schema, Table } from '@powersync/web';

// Define tables and schema
const monthly_sales = new Table(
  {
    product: column.text,
    category: column.text,
    month: column.text,
    sales: column.integer,
  },
  { indexes: {} }
);

const product_sales = new Table(
  {
    product: column.text,
    category: column.text,
    sales: column.integer,
    revenue: column.integer,
    region: column.text,
  },
  { indexes: {} }
);

// Define schema for PowerSync
export const AppSchema = new Schema({
  monthly_sales,
  product_sales,
});

export type Database = (typeof AppSchema)['types'];
