import React from 'react';

import { ItemsGrid, Item, Content } from './styles';

const InputItems: React.FC = () => {
  return (
    <Content>
      <fieldset>
        <legend>
          <h2>Ítens de coleta</h2>
          <span>Selecione um ou mais itens a baixo</span>
        </legend>
      </fieldset>

      <ItemsGrid className="items-grid">
        <Item>
          <img
            src="http://localhost:3333/uploads/oleo.svg"
            alt="{item.title}"
          />
          <span>item.title</span>
        </Item>
      </ItemsGrid>
    </Content>
  );
}

export default InputItems;
