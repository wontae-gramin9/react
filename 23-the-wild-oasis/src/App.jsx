import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

function App() {
  return (
    <>
      <GlobalStyles />
      <Row>
        <Heading>H1</Heading>
        <Heading as="h2">H2</Heading>
        <Button
          variation="secondary"
          size="small"
          onClick={() => alert("Check out")}
        />
      </Row>
      <Row type="horizontal">
        <Heading as="h3">H3</Heading>
        <Heading as="p">H3</Heading>
        <Button
          variation="danger"
          size="medium"
          onClick={() => alert("Check out")}
        />
      </Row>
    </>
  );
}

export default App;
