import type { Handler } from "@netlify/functions"
import { Client, fql, FaunaError } from "fauna"

const handler: Handler = async (event) => {
  if (
    process.env.NETLIFY_CONTEXT === "production" &&
    !event.headers?.referer?.startsWith("https://ld55-summoning.netlify.app/")
  ) {
    return {
      statusCode: 401,
    }
  }
  if (event.httpMethod === "POST") {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "No body provided" }),
      }
    }
    const client = new Client({
      secret: process.env.FAUNA_HIGHSCORE_SERVER_KEY,
    })
    const body = JSON.parse(event.body)
    const {
      name,
      score,
      seconds,
    }: { name: string; score: number; seconds: number } = body
    const highscore = { name, score, seconds }
    let id: string | undefined
    try {
      const documentQuery = fql`
        Score.create(${highscore}) {
          id,
          ts,
          name,
          score,
          seconds
        }
      `
      const response = await client.query<{ id: string }>(documentQuery)
      id = response?.data.id
    } catch (error) {
      if (error instanceof FaunaError) {
        console.log(error)
      }
    } finally {
      client.close()
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        added: { id, name, score, seconds },
        highscores: [],
      }),
    }
  } else {
    const client = new Client({
      secret: process.env.FAUNA_HIGHSCORE_SERVER_KEY,
    })
    let highscores: { name: string; score: number }[] = []
    try {
      // Build a query using the var
      const documentQuery = fql`Score.sortByScore().pageSize(10)`
      // Run the query
      const response = await client.query<{
        data: { name: string; score: number }[]
      }>(documentQuery)
      highscores = response?.data.data
    } catch (error) {
      if (error instanceof FaunaError) {
        console.log(error)
      }
    } finally {
      client.close()
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        highscores,
      }),
    }
  }
}

export { handler }
