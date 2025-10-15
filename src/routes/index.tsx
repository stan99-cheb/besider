import React from "react";
import PathConstants from "./path-constants";

const Business = React.lazy(() => import("../pages/Business/business"));
const Foreign = React.lazy(() => import("../pages/Foreign/foreign"));
const General = React.lazy(() => import("../pages/General/general"));
const Health = React.lazy(() => import("../pages/Health/health"));
const Science = React.lazy(() => import("../pages/Science/science"));
const Sports = React.lazy(() => import("../pages/Sports/sports"));
const Technology = React.lazy(() => import("../pages/Technology/technology"));

const routes = [
  { path: PathConstants.BUSINESS, element: <Business /> },
  { path: PathConstants.FOREIGN, element: <Foreign /> },
  { path: PathConstants.GENERAL, element: <General /> },
  { path: PathConstants.HEALTH, element: <Health /> },
  { path: PathConstants.SCIENCE, element: <Science /> },
  { path: PathConstants.SPORTS, element: <Sports /> },
  { path: PathConstants.TECHNOLOGY, element: <Technology /> },
];

export default routes;