
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom";
import { history } from "./history";
import MessagePage from './pages/MessagePage';
import LoveStoryPage from './pages/LoveStoryPage';
import ThreeDHeartPage from './pages/ThreeDHeartPage';
import GalleryPage from './pages/GalleryPage';
import BirthdayCalligraphy from './components/Calligraphy';
import Home from './pages/Home';
import BirthdayCard from './components/BirthdayCard';
import AppLayout from './AppLayout';

const base = window.location.pathname.split("/")[1] || "";  
export default function App() {
  return (
     <HistoryRouter history={history} basename={`/${base}`}>
      <Routes>
        <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/love" element={<LoveStoryPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/3d" element={<ThreeDHeartPage />} />
        {/* <Route path="/boom" element={<BirthdayCalligraphy />} /> */}
        <Route path="/boom" element={<BirthdayCard />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}
