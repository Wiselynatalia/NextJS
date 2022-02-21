import router, { useRouter } from "next/router";
import NewMeetUpForm from "../components/meetups/NewMeetupForm";
import Head from "next/head";
import { Fragment } from "react/cjs/react.production.min";

function NewMeetUp() {
  const router = useRouter();
  async function addHandler(enteredData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log(data);

    router.replace("/");
  }
  return (
    <Fragment>
      {" "}
      <Head>
        <title> Add a new Meetup </title>
        <meta name="description" content="Add new meetup" />
      </Head>
      <NewMeetUpForm onAddMeetup={addHandler} />{" "}
    </Fragment>
  );
}

export default NewMeetUp;
