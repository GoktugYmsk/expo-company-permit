import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import { Calendar, DotMarking } from "react-native-calendars";
import { useSelector } from "react-redux";
import Accordion from "../../UI/Accordion";

const users = [
  {
    name: "Ahmet",
    date: "2023-08-16",
  },
];

function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [requests, setRequests] = useState(users);

  const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);
  const workerPerReq = useSelector(
    // --> workerPerReq.filter(workerPerReq.map()) gibi bir mantıkla filtreleme olacak.
    (state) => state.workerInfoTotal.workerPerReq
  );

  const formattedSelectedDate = selectedDate.toISOString().split("T")[0];

  const filteredUsers = requests.filter(
    (item) => item.date === formattedSelectedDate
  );
    const permitsOnCalender = workerInfo.filter(permit => {
      const dateFrom = permit.startDay;
      const dateTo = permit.endDay;
      const dateCheck = formattedSelectedDate;
  
      const d1 = dateFrom.split("-");
      const d2 = dateTo.split("-");
      const c = dateCheck.split("-");
  
      const from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
      const to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
      const check = new Date(c[2], parseInt(c[1]) - 1, c[0]);
      if (from <= check && check <= to) {
        return permit;
      } 
    })

    console.log(permitsOnCalender)

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(new Date(day.dateString))}
        monthFormat={"yyyy MMMM"}
        markingType={"multi-dot"}
        hideExtraDays={true}
      />
      <Text style={styles.permitTitle}>{formattedSelectedDate} tarihinde izinli olan çalışanlar:</Text>
      {permitsOnCalender.length > 0 ? (
        permitsOnCalender.map((user, index) => {
          return (
            <Accordion
              key={index}
              title={user.name}
              content={
                <View>
                  <Text style={styles.contentText}>İzin Sebebi : {user.reason}</Text>
                  <Text style={styles.contentText}>Başlangıç Tarihi : {user.startDay}</Text>
                  <Text style={styles.contentText}>Bitiş Tarihi : {user.endDay}</Text>
                  <Text style={styles.contentText}>Yönetici : {user.manager}</Text>
                </View>
              }
            >
            </Accordion>
          )
        })
      ) : (
        <Text>İzinli çalışan bulunamadı.</Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flexStart",
    alignItems: "center",
    width: "100%",
  },
  calendar: {
    width: 410,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  permitTitle: {
    fontSize:18,
    fontWeight:'bold',
    marginTop:8 , 
    marginBottom:4
  },
  contentText : {
    fontSize:15 ,
  }
});

export default Home;
