import { useRouteError } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

import PageContent from "../components/PageContent";

const ErrorPage = () => {
  const error = useRouteError();

  // Use if in trouble :)
  console.log(error);

  let title = "An error occured";
  let message = "Something went wrong!";

  if (error.status === 500) {
    // message = JSON.parse(error.data).message;
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page";
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>{message}</PageContent>;
    </>
  );
};

export default ErrorPage;
