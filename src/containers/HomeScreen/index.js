import React, { useContext } from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput as PaperTextInput } from "react-native-paper";
import { ThemeContext } from "../../components/AppProvider";
import { useForm, Controller } from "react-hook-form";
import {
  Padding,
  Border,
  FontSize,
  FontFamily,
  Color,
} from "../../../globalStyle";
import api from "../../utils/request";

const LoginForm = () => {
  const navigation = useNavigation();
  const { isDarkTheme, saveUserData } = useContext(ThemeContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnPress = () => navigation.navigate("Signup");
  const handleNavigateToMovie = () => navigation.navigate("MovieList");

  const handleOnPressCreateProfile = (data) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/v1/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    api
      .request(config)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          saveUserData(response.data);
          handleNavigateToMovie()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } // Handle form submission

  return (
    <View style={[styles.home, isDarkTheme && styles.homeDark]}>
      <View
        style={[styles.talentNameParent, styles.talentNameParentSpaceBlock]}
      >
        <Text
          style={[
            styles.talentName,
            styles.label1FlexBox,
            isDarkTheme && styles.talentNameDark,
          ]}
        >
          Create Profile
        </Text>
      </View>
      <View
        style={[
          styles.createcontractdealDetails,
          styles.talentNameParentSpaceBlock,
        ]}
      >
        <Controller
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PaperTextInput
              label="Email"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PaperTextInput
              label="Password"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              secureTextEntry
            />
          )}
          name="password"
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
      </View>
      <Pressable
        style={[styles.buttonWrapper, styles.buttonWrapperBorder]}
        onPress={handleSubmit(handleOnPressCreateProfile)}
      >
        <View style={styles.button}>
          <Text style={[styles.button1, styles.label1FlexBox]}>
            Login
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={[
          styles.buttonWrapper,
          styles.buttonWrapperBorder,
          styles.signUp,
        ]}
        onPress={handleOnPress}
      >
        <View style={styles.button}>
          <Text style={[styles.button1, styles.label1FlexBox]}>Sign Up</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  // ...existing styles
  talentNameParentSpaceBlock: {
    paddingVertical: Padding.p_13xl,
    paddingHorizontal: Padding.p_5xl,
    width: "100%",
    left: 0,
    position: "absolute",
  },
  label1FlexBox: {
    textAlign: "left",
    letterSpacing: 0,
  },
  exampleBorder: {
    marginTop: 4,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_5xs,
    borderWidth: 1,
    borderColor: "#bdbdbd",
    borderRadius: Border.br_9xs,
    alignSelf: "stretch",
    flexDirection: "row",
    borderStyle: "solid",
  },
  lightinputSpaceBlock: {
    marginTop: 24,
    alignSelf: "stretch",
  },
  exampleTypo: {
    letterSpacing: 1,
    fontSize: FontSize.body1_size,
    textAlign: "left",
    fontFamily: FontFamily.body2,
    lineHeight: 24,
  },
  buttonWrapperBorder: {
    borderColor: "#e0e0e0",
    borderStyle: "solid",
    flexDirection: "row",
  },
  talentName: {
    fontSize: FontSize.h6_size,
    color: Color.grey900,
    fontFamily: FontFamily.body2,
    textAlign: "left",
    letterSpacing: 0,
    lineHeight: 24,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  navigationclose24px: {
    width: 32,
    height: 32,
  },
  talentNameParent: {
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#e0e0e0",
    borderStyle: "solid",
  },
  label1: {
    fontSize: FontSize.caption_size,
    lineHeight: 16,
    color: Color.grey800,
    fontFamily: FontFamily.body2,
    textAlign: "left",
    letterSpacing: 0,
  },
  label: {
    alignSelf: "stretch",
    flexDirection: "row",
  },
  exampleTextWrapper: {
    height: 40,
    alignItems: "center",
  },
  lightinput: {
    alignSelf: "stretch",
  },
  exampleText2: {
    color: Color.grey600,
  },
  exampleTextFrame: {
    flex: 1,
  },
  lightinput2: {
    height: 164,
  },
  createcontractdealDetails: {
    top: 147,
  },
  button1: {
    fontSize: FontSize.body2_size,
    lineHeight: 20,
    fontWeight: "700",
    fontFamily: FontFamily.body2Bold,
    color: Color.textPrimary,
    textAlign: "left",
    letterSpacing: 0,
  },
  button: {
    backgroundColor: Color.colourPrimary,
    shadowColor: "rgba(0, 0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    height: 44,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_5xs,
    justifyContent: "center",
    borderRadius: Border.br_9xs,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonWrapper: {
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    padding: Padding.p_5xl,
    justifyContent: "flex-end",
    flexDirection: "row",
    left: 0,
    position: "absolute",
    borderStyle: "solid",
  },
  home: {
    backgroundColor: Color.whiteWhite,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
  homeDark: {
    backgroundColor: Color.colourBackground,
  },
  talentNameDark: {
    color: Color.white,
  },
  signUp: {
    marginRight: "4rem",
  },
  input: {},
  error: {
    color: "red",
    marginTop: 4,
  },
});

export default LoginForm;
