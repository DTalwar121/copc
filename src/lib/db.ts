import sql from 'mssql'

const config: sql.config = {
    server: process.env.DB_SERVER || 'copc-database.database.windows.net',
    database: process.env.DB_DATABASE || 'copc-database',
    authentication: {
        type: 'azure-active-directory-default',
        options: {}
    },
    options: {
        encrypt: true,
        trustServerCertificate: false,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};

let pool: sql.ConnectionPool | null = null;

export async function getConnection() {
    try {
        if (pool) {
            return pool;
        }
        const result = await sql.connect(config);
        pool = result as sql.ConnectionPool;
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
}

export { sql };
