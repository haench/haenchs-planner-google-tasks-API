import styled from "styled-components";
import { Edit as EditIcon } from "styled-icons/feather/Edit";

const EditButton = styled(EditIcon)`
  color: ${props => props.color || "#eee"};
  display: ${props => (props.hidden ? "none" : "inherent")};
`;
export default EditButton;
