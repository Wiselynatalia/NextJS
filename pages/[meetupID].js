import { Fragment } from "react/cjs/react.production.min";
import MeetupDetail from "../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

//required when we use getStaticProps
//returns an obj of the described dynamic segment values
//tells nextJS which page needs to be pre-generated
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:helloworld@cluster0.b6ump.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  //.find({*filter item*}, {*filter properties*:1 to set to true})
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: "blocking", // false Return 404 error if request doesnt meet paths defined
    // blocking makes the user wait without any response while the page is being built
    paths: meetups.map((meetup) => ({
      params: {
        meetupID: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for the meetup
  //.meetupID can be replaced with dynamic page name ['xxx']
  const meetupID = context.params.meetupID;

  const client = await MongoClient.connect(
    "mongodb+srv://admin:helloworld@cluster0.b6ump.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  //.find({*filter item*}, {*filter properties*:1 to set to true})
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupID),
  });
  client.close();
  //exposing meetupData to the component
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
