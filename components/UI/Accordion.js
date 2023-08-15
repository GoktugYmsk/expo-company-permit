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
    width:'90%',
  },
  titleContainer : {
    paddingVertical:10,
    alignItems:'center',
    backgroundColor:'#8754ce',
    borderRadius:6 ,
    width: 350,
    marginBottom: 4,
    marginTop: 15,
  } ,
  titleText : {
    color:'#FFFFFF',
    fontWeight:'bold'
  }
})

export default Accordion;
