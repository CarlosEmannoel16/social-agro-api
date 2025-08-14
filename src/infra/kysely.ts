import { Database } from './types' 
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'agro',
    host: 'localhost',
    user: 'postgres',
    password: '12345',
    port: 5432,
    max: 10,
  })
})


export const db = new Kysely<Database>({
  dialect,
})