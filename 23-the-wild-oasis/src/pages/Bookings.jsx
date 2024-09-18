import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "./../features/bookings/BookingTable";

function Bookings() {
  return (
    <Row>
      <Heading as="h1">All bookings</Heading>
      <BookingTable />
    </Row>
  );
}

export default Bookings;
