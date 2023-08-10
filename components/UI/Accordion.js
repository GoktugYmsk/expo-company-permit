import { useState } from 'react';
import { View, Text, TouchableOpacity , StyleSheet } from 'react-native';

const Accordion = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </TouchableOpacity>
      {expanded && (
        <View>
          <Text>{content}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:8 , 
    width:'92%'
  },
  titleContainer : {
    paddingVertical:10,
    alignItems:'center',
    backgroundColor:'#ff6131',
    borderRadius:6
  } ,
  titleText : {
    color:'#FFFFFF',
    fontWeight:'bold'
  }
})

export default Accordion;
