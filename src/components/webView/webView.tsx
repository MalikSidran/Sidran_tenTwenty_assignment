import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { responsiveScreenFontSize } from "react-native-responsive-dimensions";
import WebView from "react-native-webview";

export default function WebViewer(props: any) {
  const [url, setUrl] = useState("");
  useLayoutEffect(() => {
    props.navigation.setOptions({});
  }, [props.navigation]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <SafeAreaView style={{ backgroundColor: "black" }} />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "black",
            flex: 0.15,
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props?.navigation?.goBack();
            }}
          >
            <Image
              style={{}}
              source={require("../../assets/images/arrowleft.png")}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: "white",
                fontSize: responsiveScreenFontSize(3.2),
                fontWeight: "600",
              }}
            >
              PAYMENT THIRD PARTY
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: responsiveScreenFontSize(3.2),
                fontWeight: "600",
              }}
            >
              SCREENS
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.85,
            padding: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
          onPress={()=>{
            props?.navigation?.navigate("activateAccount")
          }}
            style={{
              color: "black",
              fontSize: responsiveScreenFontSize(3),
              fontWeight: "600",
              textAlign:'center',
            }}
          >
            PAYMENT SCREEN BY THIRDPARTY
          </Text>
        </View>
        {/* <WebView
        startInLoadingState={true}
        source={{uri: props.route.params.uri}}
        onNavigationStateChange={state => {
          setUrl(state?.url);
          if (url?.includes('success') || url?.includes('cancel')) {
            props.navigation.reset({
              index: 0,
              routes: [{name: 'Templates'}],
            });
          }
        }}
        javaScriptEnabled={true}
        scalesPageToFit
        onLoadEnd={() => {
          if (url?.includes('success') || url?.includes('cancel')) {
            props.navigation.reset({
              index: 0,
              routes: [{name: 'Templates'}],
            });
          }
        }}
      /> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
