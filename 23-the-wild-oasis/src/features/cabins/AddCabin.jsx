import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  const [isOpenModal, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
