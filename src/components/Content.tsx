import React from "react";
import styled from "styled-components";

const StyledContent = styled.div`
  display: flex;
  max-height: 960px;
  justify-content: center;
`;

const Content: React.FC = ({ children }) => (
  <StyledContent>{children}</StyledContent>
);

export default Content;
