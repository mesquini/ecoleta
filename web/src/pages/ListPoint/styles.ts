import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

  header {
    margin: 48px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: var(--title-color);
      font-weight: bold;
      text-decoration: none;

      display: flex;
      align-items: center;

      svg {
        margin-right: 16px;
        color: var(--primary-color);
      }
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: #fff;
  margin-top: 50px;
  border-radius: 18px;

  form {
    display: flex;

    margin-top: 20px;
  }
`;

export const PointGrid = styled.ul`
  list-style: none;
  align-self: center;
`;

export const Point = styled.li`
  background: #f5f5f5;
  border: 2px solid #f5f5f5;
  margin-top: 50px;
  border-radius: 8px;
  padding: 32px 24px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  text-align: center;
`
export const Button = styled.button`
    width: 150px;
    height: 56px;
    background: var(--primary-color);
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border: 0;
    align-self: flex-end;
    transition: background-color 0.2s;
    cursor: pointer;
`;
