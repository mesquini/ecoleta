import React from 'react';

// import { Container } from './styles';

interface IHeaderProps {
  title?: string;
}

const Header: React.FC<IHeaderProps> = ({}) => {
  return <header>
    <h1>Ecoleta</h1>
  </header>;
}

export default Header;