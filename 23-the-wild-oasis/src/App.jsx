import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";

function App() {
  return (
    <>
      <GlobalStyles />
      <Heading>H1</Heading>
      <Heading as="h2">H2</Heading>
      <Heading as="h3">H3</Heading>
      <Heading as="p">H3</Heading>
    </>
  );
}

export default App;
