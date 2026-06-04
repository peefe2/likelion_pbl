import lions from "./data/lions";
import Header from "./components/Header";
import ControlArea from "./components/ControlArea";
import OptionsSection from "./components/OptionsSection";
import FormSection from "./components/FormSection";
import SummaryGrid from "./components/SummaryGrid";
import DetailList from "./components/DetailList";
import Footer from "./components/Footer";
import "./styles/style.css";

function App() {
  return (
    <>
      <Header />
      <ControlArea totalCount={lions.length} />
      <OptionsSection />
      <FormSection />
      <main>
        <SummaryGrid lions={lions} />
        <DetailList lions={lions} />
      </main>
      <Footer />
    </>
  );
}

export default App;
