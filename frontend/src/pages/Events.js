import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";

import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();
  console.log(events);

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => {
          console.log(loadedEvents);
          return <EventsList events={loadedEvents.events} />;
        }}
      </Await>
    </Suspense>
  );
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(
    //   JSON.stringify({ message: "Could not fetch events.", status: 500 })
    // );

    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

export default EventsPage;

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
