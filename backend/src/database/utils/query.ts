import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export async function query (query: string, values?: Array<string | number | Date | boolean>): Promise<pg.QueryResult> {
  const client = new pg.Client(process.env.CONNECTION_STRING)
  await client.connect()
  const res = await client.query(query, values)
  client.on('error', (err) => {
    console.error('PostgreSQL client error:', err)
  })
  await client.end()
  return res
}
