import React from "react";
import PathConstants from "./path-constants";

const Business = React.lazy(() => import("../page/Business/business"));
const Entertainment = React.lazy(() => import("../page/Entertainment/entertainment"));
const Feed = React.lazy(() => import("../page/Feed/feed2"));
const General = React.lazy(() => import("../page/General/general"));
const Health = React.lazy(() => import("../page/Health/health"));
const Science = React.lazy(() => import("../page/Science/science"));
const Sports = React.lazy(() => import("../page/Sports/sports"));
const Technology = React.lazy(() => import("../page/Technology/technology"));

const routes = [
  { path: PathConstants.BUSINESS, element: <Business /> },
  { path: PathConstants.ENTERTAINMENT, element: <Entertainment /> },
  { path: PathConstants.FEED, element: <Feed /> },
  { path: PathConstants.GENERAL, element: <General /> },
  { path: PathConstants.HEALTH, element: <Health /> },
  { path: PathConstants.SCIENCE, element: <Science /> },
  { path: PathConstants.SPORTS, element: <Sports /> },
  { path: PathConstants.TECHNOLOGY, element: <Technology /> },
];

export default routes;