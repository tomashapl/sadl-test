import React from "react";
import styled from "styled-components";

const StyledContent = styled.div`
  display: flex;
  flex: 1 1 100%;
  max-height: 960px;
`;

const Content: React.FC = ({ children }) => (
  <StyledContent>{children}</StyledContent>
);

export default Content;
