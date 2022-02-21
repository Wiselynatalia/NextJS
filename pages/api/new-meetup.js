//api routes only run in server
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //Establishing connection
    //If database havent exist, it will create it on the fly
    const client = await MongoClient.connect(
      "mongodb+srv://admin:helloworld@cluster0.b6ump.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    //201 req succeeded and has led to creation of resource
    res.status(201).json({ message: "Meetup Inserted!" });
  }
}

export default handler;
