# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Database Setup

This project uses Drizzle ORM with a PostgreSQL database provided by Neon.

To set up your local database and populate it with initial data:

1.  **Create your database** on [Neon](https://neon.tech).
2.  **Get your database connection string** and add it to a `.env` file in the root of the project:
    ```
    DATABASE_URL="your_neon_connection_string"
    ```
3.  **Push the schema**: Run the following command to apply the table structure to your database.
    ```bash
    npm run db:push
    ```
4.  **Seed the database**: You can use a SQL client to connect to your Neon database and run the commands found in `src/lib/db/seed.sql` to populate the `colaboradores` table with the initial user data.

    **Note on Passwords**: The default password for each user is their **username** followed by **2025**. For example, the user `admin` has the password `admin2025`. The system uses bcrypt to securely handle password verification.
