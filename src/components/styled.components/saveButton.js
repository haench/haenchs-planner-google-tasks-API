import styled from "styled-components";
import { Save as SaveIcon } from "styled-icons/feather/Save";

const SaveButton = styled(SaveIcon)`
  color: ${props => props.color || "#eee"};
  display: ${props => (props.hidden ? "none" : "inherent")};
`;
export default SaveButton;
