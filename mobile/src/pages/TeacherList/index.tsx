import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import DateTimePicker from "react-native-modal-datetime-picker";

import api from "../../services/api";

import styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  const [showPicker, setShowPicker] = useState(false);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  useFocusEffect(() => {
    loadFavorites();
  });

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
    setSubject("");
    setWeekDay("");
    setTime("");
  }

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const handleConfirm = (date: Date) => {
    const hours =
      date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    setTime(`${hours}:${minutes}`);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="Senseis disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Matéria</Text>
              <SelectDropdown
                data={[
                  { value: "Artes", label: "Artes" },
                  { value: "Biologia", label: "Biologia" },
                  { value: "Ciências", label: "Ciências" },
                  { value: "Educação física", label: "Educação física" },
                  { value: "Física", label: "Física" },
                  { value: "Geografia", label: "Geografia" },
                  { value: "História", label: "História" },
                  { value: "Matemática", label: "Matemática" },
                  { value: "Português", label: "Português" },
                  { value: "Química", label: "Química" },
                ]}
                defaultButtonText={"Escolha a matéria"}
                onSelect={(selectedItem) => setSubject(selectedItem.value)}
                buttonTextAfterSelection={(selectedItem) => selectedItem.label}
                rowTextForSelection={(item) => item.label}
                renderDropdownIcon={(isOpened) => (
                  <Feather
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#c1bccc"}
                    size={18}
                  />
                )}
                buttonStyle={styles.select}
                buttonTextStyle={{
                  color: subject ? "#000" : "#c1bccc",
                  ...styles.selectPlaceholder,
                }}
                dropdownStyle={styles.selectDropdown}
                rowTextStyle={styles.selectDropdownRow}
              />

              <Text style={styles.label}>Dia da semana</Text>
              <SelectDropdown
                data={[
                  { value: "0", label: "Domingo" },
                  { value: "1", label: "Segunda-feira" },
                  { value: "2", label: "Terça-feira" },
                  { value: "3", label: "Quarta-feira" },
                  { value: "4", label: "Quinta-feira" },
                  { value: "5", label: "Sexta-feira" },
                  { value: "6", label: "Sábado" },
                ]}
                defaultButtonText={"Escolha a matéria"}
                onSelect={(selectedItem) => setWeekDay(selectedItem.value)}
                buttonTextAfterSelection={(selectedItem) => selectedItem.label}
                rowTextForSelection={(item) => item.label}
                renderDropdownIcon={(isOpened) => (
                  <Feather
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#c1bccc"}
                    size={18}
                  />
                )}
                buttonStyle={styles.select}
                buttonTextStyle={{
                  color: week_day ? "#000" : "#c1bccc",
                  ...styles.selectPlaceholder,
                }}
                dropdownStyle={styles.selectDropdown}
                rowTextStyle={styles.selectDropdownRow}
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Horário</Text>
              <RectButton style={styles.input} onPress={showDatePicker}>
                <Text
                  style={{
                    color: time ? "#000" : "#c1bccc",
                    ...styles.selectPlaceholder,
                  }}
                >
                  {time || "Escolha o horário"}
                </Text>
              </RectButton>
            </View>
            <DateTimePicker
              isVisible={showPicker}
              mode="time"
              is24Hour
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              display="spinner"
            />

            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
