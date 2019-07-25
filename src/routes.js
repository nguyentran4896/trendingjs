// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import HomePage from "./views/HomePage";
import Errors from "./views/Errors";
import BlogPosts from "./views/BlogPosts";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: HomePage
    // component: () => <Redirect to="/blog-overview" />
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  }
];
