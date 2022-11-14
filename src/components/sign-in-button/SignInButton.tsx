// import React, { View, Text } from "react-native";
// import { useMsal } from "@azure/msal-react";
// import { loginRequest } from "../../../authConfig";

// import { Button } from 'react-native-paper';


// /**
//  * Renders a button which, when selected, will redirect the page to the login prompt
//  */
// export const SignInButton = () => {
//     const { instance } = useMsal();

//     const handleLogin = (loginType) => {
//         if (loginType === "redirect") {
//             instance.loginRedirect(loginRequest).catch(e => {
//                 console.log(e);
//             });
//         }
//     }
//     return (
//         <Button mode="outlined" onPress= {() => handleLogin("redirect")}>Login</Button>
//     );
// }

