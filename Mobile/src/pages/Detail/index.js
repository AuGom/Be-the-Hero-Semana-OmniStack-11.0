import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const message = `Hello, ${incident.name}. I'd like to help in the case ${
    incident.title
  } with the amount of ${Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(incident.value)}`;
  const incident = route.params.incident;

  function navigateBack() {
    navigation.goBack();
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Hero of the case: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${incident.phone}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="e82041" />
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>NGO:</Text>
        <Text style={styles.incidentValue}>{incident.name}</Text>

        <Text style={styles.incidentProperty}>Case:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>Value:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero for this case.</Text>
        <Text style={styles.heroDescripyion}>Contact them:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
