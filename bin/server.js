const app = require('../app')
const { connectMongo } = require('../model/connection')

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) console.log('Error at server launch', err);
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start();
