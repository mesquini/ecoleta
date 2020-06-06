import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import './styles.css';

import api from '../../services/api';
import Dropzone from '../../components/Dropzone';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'

import logo from '../../assets/logo.svg'
import InputRegion from '../../components/InputRegion'

import { toast } from 'react-toastify'

interface Item {
  title: string;
  image_url: string;
  id: number;
}

interface IRegion {
  city: string;
  uf: string
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])

  const [objRegion, setObjRegion] = useState<IRegion>({city: '0', uf: '0' });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);

  const [selectedFile, setSelectFile] = useState<File>();

  const history = useHistory()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords

      setInitialPosition([latitude, longitude])
    })
  },[])

  useEffect(() => {
    api.get('/items').then(resp => {
      setItems(resp.data)
    })

  },[]);

  function handleMapClick(event: LeafletMouseEvent){
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng,
    ])
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target;

    setFormData({...formData, [name]: value})
  }

  function handleSelectItem(id: number){
    const alreadySelected = selectedItems.findIndex(item => item === id)

    if(alreadySelected >= 0){
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    }else{
      setSelectedItems([...selectedItems, id]);
    }

  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    if(selectedPosition[0] === 0 || selectedPosition[1] === 0)
      return toast.warn('Seleciona uma posição no mapa!')

    const {name, email, whatsapp} = formData
    const [latitude, longitude] = selectedPosition
    const items = selectedItems


    const data = new FormData();

    data.append('name', name)
    data.append('email', email)
    data.append('whatsapp', whatsapp)
    data.append('uf', objRegion.uf)
    data.append('city', objRegion.city)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('items', items.join(','))

    if(selectedFile) data.append('image', selectedFile);

    try {
      await api.post('/points', data);

      toast.success('Ponto cadastrado com sucesso!')

      history.push('/')
    } catch (error) {
      toast.error('Erro ao cadastrar, tente novamente!')
    }
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Cadastro do ponto de coleta</h1>

        <Dropzone onFileUploaded={setSelectFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
        </fieldset>

        <div className="field">
          <label htmlFor="name">Nome da entidade</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="field-group">
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="name">Whatsapp</label>
            <input
              type="text"
              name="whatsapp"
              id="whatsapp"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>
        </fieldset>

        <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/cpyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={selectedPosition} />
        </Map>

        <InputRegion onObjRegion={setObjRegion} />

        {/* <div className="field-group">
          <div className="field">
            <label htmlFor="uf">Estado (UF)</label>
            <select
              name="uf"
              id="uf"
              value={selectedUf}
              onChange={handleSeletedUf}
              required
            >
              <option value="0">Selecione um UF</option>
              {ufs.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="uf">Cidade</label>
            <select
              name="uf"
              id="uf"
              value={selectedCity}
              onChange={handleSeletedCity}
              required
            >
              <option value="0">Selecione uma cidade</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais itens a baixo</span>
          </legend>
        </fieldset>

        <ul className="items-grid">
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelectItem(item.id)}
              className={selectedItems.includes(item.id) ? "selected" : ""}
            >
              <img src={item.image_url} alt={item.title} />
              <span>{item.title}</span>
            </li>
          ))}
        </ul>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
}

export default CreatePoint;
