const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://postgres.tplfwnvrvobabuhqqviv:554646665Sv_@aws-0-eu-central-1.pooler.supabase.com:6543/postgres",
  ssl: { rejectUnauthorized: false },
});

module.exports = { pool };
