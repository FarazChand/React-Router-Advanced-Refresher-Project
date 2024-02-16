import { useRouteLoaderData, json, redirect } from "react-router-dom";

import EventItem from "../components/EventItem";

console.log("before component");

const EventDetailPage = () => {
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
};

export default EventDetailPage;

console.log("after component");

export async function loader({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json({ message: "Event not found :(" }, { status: 500 });
  }

  // I used this to check what the response data was, however this ended up consuming the body stream - which in turn lead to the component not rendering
  // I learned that you cannot consume the body stream of a response more than once, which is what the loader was trying to do, however - I prevented it from working correctly by adding this line
  // response.json().then((res) => console.log(res));

  return response;
}

export async function action({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event" }, { status: 500 });
  }

  return redirect("/events");
}
