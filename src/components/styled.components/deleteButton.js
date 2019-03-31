import styled from "styled-components";
import { X as XIcon } from "styled-icons/feather/X";

const DeleteButton = styled(XIcon)`
  color: ${props => props.color || "#eee"};
  display: ${props => (props.hidden ? "none" : "inherent")};
`;
export default DeleteButton;
