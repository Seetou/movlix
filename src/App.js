import Home from "./components/Home";
import SingleShow from "./components/SingleShow";
import SearchedSingleShow from "./components/SearchedSingleShow";
import ResultPage from "./components/ResultPage";
import Page404 from "./components/Page404";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="movie/:id" element={<SingleShow />} />
      <Route path="search/:name" element={<ResultPage />}>
        <Route path=":id" element={<SearchedSingleShow />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
