import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      ...
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
export default App;