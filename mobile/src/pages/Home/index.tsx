import React, { useState, useEffect, EventHandler } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { 
  View, 
  ImageBackground, 
  StyleSheet, 
  Image, 
  Text, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  Picker 
} from 'react-native'

import axios from 'axios';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import SearchableDropdown from "react-native-searchable-dropdown";

interface ISelected {
  id: string;
  name: string
}

interface IBGE_UF_Response {
  sigla: string;
  nome: string;
}

interface IBGE_City_Response {
  id: number;
  nome: string;
}

const Home = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const navigation = useNavigation();

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

        if(resp.data.length === 0) return;

        const cityName = resp.data.map((city) => city.nome);

        setCities(cityName);
      });
  }, [selectedUf]);

  function handleNavigateToPoints(){
    navigation.navigate("Points", { uf: selectedUf, city: selectedCity });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("../../assets/home-background.png")}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <SearchableDropdown
            onItemSelect={(item: ISelected) => {
              setSelectedUf(item.name);
            }}
            containerStyle={styles.select}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: "#ddd",
              borderColor: "#bbb",
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: "#222" }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={ufs.map((uf) => {
              return { id: uf, name: uf };
            })}
            defaultIndex={0}
            resetValue={false}
            textInputProps={{
              placeholder: "Selecione um UF",
              underlineColorAndroid: "transparent",
              style: {
                padding: 12,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
              },
              // onTextChange: (text: string) => alert(text),
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
          <SearchableDropdown
            onItemSelect={(item: ISelected) => {
              setSelectedCity(item.name);
            }}
            containerStyle={styles.select}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: "#ddd",
              borderColor: "#bbb",
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: "#222" }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={cities.map((city) => {
              return { id: city, name: city };
            })}
            // defaultIndex={2}
            resetValue={false}
            textInputProps={{
              placeholder: "Selecione uma cidade",
              underlineColorAndroid: "transparent",
              style: {
                padding: 12,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
              },
              // onTextChange: (text: string) => alert(text),
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />

          {/* <Picker
            selectedValue={selectedUf}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => setSelectedUf(itemValue)}
          >
            <Picker.Item label="Selecione um UF" value="0" />
            {ufs.map((uf) => (
              <Picker.Item key={String(uf)} label={uf} value={uf} />
            ))}
          </Picker>

          <Picker
            selectedValue={selectedCity}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
          >
            <Picker.Item label="Selecione uma cidade" value="0" />
            {cities.map((city) => (
              <Picker.Item key={String(city)} label={city} value={city} />
            ))}
          </Picker> */}

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#fff" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    // justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {
    marginTop: 300,
  },

  select: {
    padding: 5, 
    paddingHorizontal: 24,
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});