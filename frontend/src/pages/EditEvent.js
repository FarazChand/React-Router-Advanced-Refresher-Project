import { useRouteLoaderData } from "react-router-dom";

import EventsForm from "../components/EventForm";

const EditEventPage = () => {
  const data = useRouteLoaderData("event-detail");
  return <EventsForm event={data.event} />;
};

export default EditEventPage;
