import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { createPortal } from "react-dom";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
// REACT PORTAL
// 컴포넌트의 현재 트리의 위치(부모 컴포넌트의 아래)에 여전히 놓지만
// React devtools에서 보면 변하지 않는다.
// 어디서든 렌더될 수 있게 만드는 것(어느 html tag)
// Modal, Tooltip, Menu나 Overlay만들 때 자주 쓰인다
// 왜 쓰는가? css의 conflict를 막기 위해서
// 만약 쓰이는 곳의 컴포넌트가(부모 컴포넌트)가 overflow:hidden css를 가지고 있다면
// Modal이 안 나오는 경우가 생기기 때문이다
export default function Modal({ children, onClose }) {
  // React Dom의 native api
  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={onClose}>
          <HiXMark />
          {/* Modal component내부에서 모달을 닫으려면
          부모의 setIsModalopen에 접근해야한다 → state올리기 */}
        </Button>
        {children}
      </StyledModal>
      ;
    </Overlay>,
    document.body // 렌더하고 싶은 위치. body(최상단)의 1번째 child
  );
}
