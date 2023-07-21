import React from "react";
import { View, ImageBackground, Text, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import giveClassesBgImage from "../../assets/images/give-classes-background.png";

import styles from "./styles";

function GiveClasses() {
  const { goBack } = useNavigation();

  function handleNavigateBack() {
    goBack();
  }

  function handleOpenWeb() {
    Linking.openURL("http://192.168.0.5:3000");
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={giveClassesBgImage}
        style={styles.content}
      >
        <Text style={styles.title}>Deseja ser um sensei ?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web.
        </Text>
      </ImageBackground>

      <RectButton onPress={handleOpenWeb} style={styles.okButton}>
        <Text style={styles.okButtonText}>Cadastra-se agora</Text>
      </RectButton>
      <Text onPress={handleNavigateBack} style={styles.notOkButton}>
        <Text style={styles.notOkButtonText}>Voltar</Text>
      </Text>
    </View>
  );
}

export default GiveClasses;
