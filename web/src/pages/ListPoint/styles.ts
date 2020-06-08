import styled from 'styled-components'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
  height: 45vh;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: #fff;
  margin-top: 50px;
  border-radius: 18px;


    display: grid;
    grid-template-columns: repeat(1, 1fr);
    margin-top: 20px;
    width: 100%;

    fieldset {
      margin-top: 14px;
      min-inline-size: auto;
      border: 0;
    }

    legend {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      h2 {
        font-size: 24px;
      }

      span {
        font-size: 14px;
        font-weight: normal;
        color: var(--text-color);
      }
  }
`;

export const ItemsGrid = styled.ul`
  display: flex;
  list-style: none;
`;

export const Items = styled.li`
  background: #f5f5f5;
  border: 2px solid #f5f5f5;
  width: 100px;
  border-radius: 8px;
  padding: 10px 10px;
  margin-right: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  text-align: center;

  cursor: pointer;

  img {
    max-width: 45px;
  }

  span {
    flex: 1;
    margin-top: 12px;

    display: flex;
    align-items: center;
    color: var(--title-color);
  }

  #selected {
    background: #e1faec;
    border: 2px solid #34cb79;
  }
`;

export const PointGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  list-style: none;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 30px;
`;

export const Point = styled.li`
  background: #3fca1c2e;
  border: 2px solid #f5f5f5;
  margin-top: 50px;
  border-radius: 8px;
  padding: 32px 24px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  text-align: center;

  img {
    width: 250px;
  }

  h2 {
    margin-top: 10px;
  }
`;

export const Button = styled.button`
    width: 100%;
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
    margin-top: 15px;
`;

export const Empty = styled.div`
  margin-top: 30px;
  text-align: center;
`
