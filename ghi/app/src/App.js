import Nav from "./Nav";
import MainPage from "./MainPage";
import AttendeesList from "./AttendeesList";
import AttendConferenceForm from "./AttendConferenceForm";
import ConferenceForm from "./ConferenceForm";
import LocationForm from "./LocationForm";
import PresentationForm from "./PresentationForm";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        {/* <AttendConferenceForm /> */}
        {/* <ConferenceForm /> */}
        {/* <LocationForm /> */}
        {/* {<AttendeesList attendees={props.attendees} />} */}
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="attendees" element={<AttendeesList attendees={props.attendees} />} />
          <Route path="attendees/new" element={<AttendConferenceForm />} />
          <Route path="conferences/new" element={<ConferenceForm />} />
          <Route path="locations/new" element={<LocationForm />} />
          <Route path="presentations/new" element={<PresentationForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
