import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppBottomTab from "../bottomTab/appBottomTab";

export default function MainStack() {
  return (
    <NavigationContainer>
      <AppBottomTab /> 
    </NavigationContainer>
  );
}
