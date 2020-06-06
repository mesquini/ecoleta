import React, { useState, useEffect, ChangeEvent } from 'react';

import axios from 'axios'

import { Field, GroupField } from './styles'

interface IBGE_UF_Response {
  sigla: string;
  nome: string;
}

interface IBGE_City_Response {
  id: number;
  nome: string;
}

interface IRegion {
  city: string;
  uf: string
}

interface IPropos {
  onObjRegion: (region: IRegion) => void;
}

const InputRegion: React.FC<IPropos> = ({ onObjRegion }) => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

   useEffect(() => {
     axios
       .get<IBGE_UF_Response[]>(
         "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
       )
       .then((resp) => {
         const ufInitials = resp.data.map((uf) => uf.sigla);

         setUfs(ufInitials);
       });
   }, []);

   useEffect(() => {
     if (selectedUf === "0") return;

     axios
       .get<IBGE_City_Response[]>(
         `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
       )
       .then((resp) => {
         const cityName = resp.data.map((city) => city.nome);

         setCities(cityName);
       });
   }, [selectedUf]);

   function handleSeletedUf(event: ChangeEvent<HTMLSelectElement>) {
     const uf = event.target.value;

     setSelectedUf(uf);
   }

   function handleSeletedCity(event: ChangeEvent<HTMLSelectElement>) {
     const city = event.target.value;

     setSelectedCity(city);
     onObjRegion({ city, uf: selectedUf });
   }

  return (
    <>
      <GroupField className="field-group">
        <Field className="field">
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
        </Field>
        <Field className="field">
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
        </Field>
      </GroupField>
    </>
  );
}

export default InputRegion;
