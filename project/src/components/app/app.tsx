import MainPage from "../../pages/main-page/main-page";

type AppPageProps = {
  filmCard: {
    title: string,
    genre: string,
    year: number
  }
};

function App({filmCard}: AppPageProps): JSX.Element {
  return (
    <MainPage 
      filmCard = {filmCard}
    />
  );
}

export default App;
