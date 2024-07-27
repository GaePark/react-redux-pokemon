import styled from "@emotion/styled";

export const Progress = styled.progress`
  width: 100%;
  height: 25px;
  appearance: none;
  overflow: hidden;
  border-radius: 999999px;
  border: 1px solid #ddd;

  ::-webkit-progress-bar {
    background-color: #ddd;
  }
  ::-webkit-progress-value {
    background-color: ${(props) => props.color};
  }
`;
