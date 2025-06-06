# Demo-Sales-Dashboard

This project is a sales dashboard built using **Nuxt.js**, **Supabase**, **PowerSync**, and **ECharts**. It visualizes sales data, such as product sales comparisons, monthly sales trends, and category-based sales, using interactive charts.

## Features

- Real-time data fetching from **Supabase**.
- Interactive **pie**, **line**, and **bar** charts using **ECharts**.
- Integration with **PowerSync** for syncing data.
- A clean and responsive dashboard layout.

## Installation

Follow these steps to get the project up and running locally.

### Prerequisites

- **Node.js** (v14 or higher)
- **Nuxt.js**
- **Supabase account**
- **PowerSync account**

### Steps

1. Clone the repository:

   ```bash
         git clone https://github.com/GhazalaMac/Demo-Sales-Dashboard.git
2. Install dependencies:
   ```bash
         cd Demo-Sales-Dashboard
         npm install
3.Set up environment variables for Supabase and PowerSync:

Create a .env file in the root of the project and add your Supabase and PowerSync credentials: 

         SUPABASE_URL=<your-supabase-url>
         SUPABASE_ANON_KEY=<your-supabase-anon-key>
         POWERSYNC_API_KEY=<your-powersync-api-key>
     
 

4. Run the project:

        npm run dev

##Configuration
Ensure that the following settings are correctly configured:

Supabase: Ensure that RLS (Row-Level Security) is enabled and there are policies that allow select operations for the public role.

PowerSync: Ensure that the regions for both Supabase and PowerSync match (e.g., both should be in the EU region).

Troubleshooting
Issue: Unable to connect Supabase to PowerSync
Solution: Ensure that the region for both Supabase and PowerSync match. For example, if you choose EU in Supabase, make sure PowerSync is also set to EU. Mismatched regions will prevent the connection.

Issue: Array(0) or No Data Appearing
Solution: This might be due to Row-Level Security (RLS) in Supabase. To fix this, you can run the following SQL code in the Supabase SQL editor to allow public access for select queries:

      -- Allow SELECT on monthly_sales for public role
      create policy "Allow select on monthly_sales"
        on monthly_sales
        for select using (true);
      
      -- Allow SELECT on product_sales for public role
      create policy "Allow select on product_sales"
        on product_sales
        for select using (true);

License
This project is licensed under the MIT License - see the LICENSE file for details.

Connect with Me
[GitHub](https://github.com/GhazalaMac)
 Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


 Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
