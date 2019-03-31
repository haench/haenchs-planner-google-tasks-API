import styled from "styled-components";
import { X as XIcon } from "styled-icons/feather/X";

const DeleteButton = styled(XIcon)`
  color: ${props => props.color || "#eee"};
  display: flex;
  visibility: ${props => (props.defaultHidden ? "hidden" : "visible")};
`;
export default DeleteButton;
