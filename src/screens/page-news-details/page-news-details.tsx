import { View, Text } from "react-native";

const PageNewsDetails = ({route}) => {
  const {item} = route.params;

  return (
    <View>
      <Text>Title : {item.title}</Text>
      <Text>Description : {item.description}</Text>
      <Text>Date: {item.date}</Text>
    </View>
  );
};

export default PageNewsDetails;