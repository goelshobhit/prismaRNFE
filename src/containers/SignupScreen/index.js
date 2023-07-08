import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ThemeContext } from "../../components/AppProvider";
import { TextInput as PaperTextInput } from "react-native-paper";
import api from "../../utils/request";

const SignupForm = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/v1/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    api
      .request(config)
      .then((response) => {
        if (response.data) {
          navigation.navigate("Home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkTheme]}>
      <Controller
        control={control}
        rules={{
          required: "This field is required",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <PaperTextInput
            label="Name"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="name"
        defaultValue=""
      />

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
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      <Controller
        control={control}
        rules={{
          required: "This field is required",
          minLength: {
            value: 6,
            message: "Password must have at least 6 characters",
          },
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
      <Button title="Sign up" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  darkTheme: {
    backgroundColor: "#000000",
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default SignupForm;
