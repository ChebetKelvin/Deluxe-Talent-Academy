import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("programs", "routes/programs.jsx"),
  route("programs/:id", "routes/programDetails.jsx"),
  route("about", "routes/about.jsx"),
  route("contact", "routes/contact.jsx"),
];
