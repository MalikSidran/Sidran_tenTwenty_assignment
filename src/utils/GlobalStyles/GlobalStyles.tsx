import React from 'react';
import {StyleSheet, Text} from 'react-native';

const globalStyles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  defaultText: {
    color: '#000000',
  },
});

// Create a custom Text component that applies the default text style
export const DefaultText = (props: any) => {
  return <Text style={[globalStyles.defaultText, props.style]} {...props} />;
};

export default globalStyles;
