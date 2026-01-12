import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import Stripe from 'stripe'
import { HTTPException } from 'hono/http-exception'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-12-15.clover' })

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

//
app.post("/checkout", async (c) => {

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: "price_1SoUhfIIHhBRgarEwV6UQkWr",
        quantity: 1
      }

      ],
      mode: "subscription",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"

    })
    return c.json(session)

  } catch (error: any) {
    console.log(error)
    throw new HTTPException(500, { message: error?.message })

  }
})

//
app.get("/success", (c) => {
  return c.text('success!')
})
//
app.get("/cancel", (c) => {
  return c.text('cancel!')
})
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
