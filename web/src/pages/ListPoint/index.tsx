import React, {useState} from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

import { Container, Content, Point, PointGrid, Button } from './styles';
import { FiArrowLeft } from 'react-icons/fi';

import InputRegion from "../../components/InputRegion";
import InputItems from "../../components/InputItems";

interface IRegion {
  city: string;
  uf: string
}


const ListPoint = () => {
  const [objRegion, setObjRegion] = useState<IRegion>({ city: "0", uf: "0" });

  return (
    <Container>
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>
      <Content>
        <form onSubmit={() => {}}>
          <InputRegion onObjRegion={setObjRegion} />

          <InputItems />

          <Button type="submit">Pesquisar</Button>
        </form>

        <PointGrid>
          <Point>
            <img
              src="http://localhost:3333/uploads/20eb1dca4040-unnamed.jpg"
              alt="point"
              width={500}
            />
            <h2>Mercado do seu Zê</h2>
            <span>email</span>
            <span>wpp</span>
          </Point>
          <Point>
            <img
              src="http://localhost:3333/uploads/20eb1dca4040-unnamed.jpg"
              alt="point"
              width={500}
            />
            <h2>Mercado do seu Zê</h2>
            <span>email</span>
            <span>wpp</span>
          </Point>
        </PointGrid>
      </Content>
    </Container>
  );
}

export default ListPoint;
