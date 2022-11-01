// import React, { useState, useEffect } from 'react';
// import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
// import { Button } from 'react-native-paper';
// import { setStatusBarBackgroundColor } from 'expo-status-bar';

// export default function UploadImage() {
//     const [image, setImage] = useState(null);
//     const addImage = () => { };
//     const [colour, setColour] = useState("");
//     const [points, setPoints] = useState(5);

//     const MoodLogic = () => {


//         console.log('BAHH')

//         if (points < 4) {
//             //imageUploaderStyles.container.backgroundColor = '#FF0000'

//             setColour("#FF0000")
//             console.log(colour)
//         }
//         if (points > 4 && points < 8) {

//             setColour("#FFA500")
//             console.log(colour)
//         }
//         if (points > 8 && points <= 10) {

//             setColour("#008000")
//             console.log(colour)
//         }
//         else {
//             console.warn
//         }


//     };


//     return (
//         <View style={{ backgroundColor: colour }}>
//         <View style={imageUploaderStyles.container}>

//                 {
//                     image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
//                 }
//                 <View style={imageUploaderStyles.uploadBtnContainer}>
//                     <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
//                         {/* <Text>{image ? 'Edit' : 'Upload'} Image</Text> */}
//                         <AntDesign name="camera" size={20} color="black" />
//                     </TouchableOpacity>
//                 </View>

//                 <Button icon="camera" mode="contained" onPress={MoodLogic}>
//                     Press me
//                 </Button>
//                 {/* <View >

//                     </View> */}
//             </View>
//         // </View>
//     );
// }
// const imageUploaderStyles = StyleSheet.create({
//     container: {
//         elevation: 2,
//         height: 200,
//         width: 200,
//         position: 'relative',
//         borderRadius: 999,
//         overflow: 'hidden',
//         border: 25,
//         display: 'flex',
//         top: -200,



//     },
//     uploadBtnContainer: {
//         opacity: 0.7,
//         position: 'absolute',
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'lightgrey',
//         width: '100%',
//         height: '25%',
//     },
//     uploadBtn: {
//         display: 'flex',
//         alignItems: "center",
//         justifyContent: 'center'
//     }
// })