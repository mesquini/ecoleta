import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

import {
  Container,
  Content,
  Point,
  PointGrid,
  Button,
  Items,
  ItemsGrid,
  Empty
} from './styles';
import { FiArrowLeft } from 'react-icons/fi';

import Loader from "react-loader-spinner";

import InputRegion from "../../components/InputRegion";
import api from "../../services/api";
import { toast } from 'react-toastify';

interface IRegion {
  city: string;
  uf: string
}

interface Item {
  title: string;
  image_url: string;
  id: number;
}

interface IPoint {
  id: number;
  name: string;
  email: string;
  image_url: string;
  whatsapp: string;
}

const ListPoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<IPoint[]>([]);

  const [objRegion, setObjRegion] = useState<IRegion>({ city: "0", uf: "0" });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/items").then((resp) => {
      setItems(resp.data);
    });
  }, []);

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  async function handleSearchPoints(event: FormEvent){
    event.preventDefault();

    if(selectedItems.length === 0)
      return toast.warn('Selecione pelo menos um ítem de coleta!')

    if(objRegion.city === '0' || objRegion.uf === '0')
      return toast.warn('Selecine o Estado e a cidade!');

    setLoading(true);

    const resp = await api.get("/points", {
      params: {
        city: objRegion.city,
        uf: objRegion.uf,
        items: selectedItems.join(','),
      },
    });

    setLoading(false);

    if (resp.data.length === 0) return setEmpty(true);

    setPoints(resp.data);
  }

  const seleted = {
    background: '#e1faec',
    border: '2px solid #34cb79',
  }

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
        <InputRegion onObjRegion={setObjRegion} />

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais itens a baixo</span>
          </legend>
        </fieldset>

        <ItemsGrid>
          {items.map((item) => (
            <Items
              key={item.id}
              onClick={() => handleSelectItem(item.id)}
              style={selectedItems.includes(item.id) ? seleted : {}}
            >
              <img src={item.image_url} alt={item.title} />
              <span>{item.title}</span>
            </Items>
          ))}
        </ItemsGrid>

        <Button type="button" onClick={handleSearchPoints}>
          Pesquisar
        </Button>

        <PointGrid>
          {points &&
            points.map((point) => (
              <Point key={point.id}>
                <img src={point.image_url} alt={point.name} width={500} />
                <h2>{point.name}</h2>
                <a href={`mailto:${point.email}`} target="_blank">
                  {point.email}
                </a>
                <a
                  href={`https://wa.me/55${point.whatsapp}?text=Olá,%20Tudo%20bem?`}
                  target="_blank"
                  style={{marginTop: 10}}
                >
                  {point.whatsapp}
                </a>
              </Point>
            ))}
        </PointGrid>
      </Content>

      {loading && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      )}

      {empty && (
        <Empty>
          <h2>Não foi encontrado nenhum ponto</h2>
        </Empty>
      )}
    </Container>
  );
}

export default ListPoint;
