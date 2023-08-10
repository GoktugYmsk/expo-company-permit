import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";

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
  const workerPerReq = useSelector(  // --> workerPerReq.filter(workerPerReq.map()) gibi bir mantıkla filtreleme olacak.
    (state) => state.workerInfoTotal.workerPerReq
  );

  const formattedSelectedDate = selectedDate.toISOString().split("T")[0];

  const filteredUsers = requests.filter(
    (item) => item.date === formattedSelectedDate
  );

  const dateFrom = "02/05/2013";
  const dateTo = "02/09/2013";
  const dateCheck = formattedSelectedDate;

  const d1 = dateFrom.split("-");
  const d2 = dateTo.split("-");
  const c = dateCheck.split("-");

  const from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
  const to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
  const check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(new Date(day.dateString))}
        monthFormat={"yyyy MMMM"}
        markingType={"period"}
        hideExtraDays={true}
      />
      <Text>{formattedSelectedDate} tarihinde izinli olan çalışanlar:</Text>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user, index) => <Text key={index}>{user.name}</Text>)
      ) : (
        <Text>İzinli çalışan bulunamadı.</Text>
      )}

      <View>
        {workerInfo && (
          <View>
            {workerInfo?.map((worker) => (
              <View key={worker.name}>
                <Text>Adı: {worker.name}</Text>
                <Text>Başlangıç Tarihi: {worker.startDay}</Text>
                <Text>Bitiş Tarihi: {worker.endDay}</Text>
                <Text>Sebep: {worker.reason}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flexStart",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Home;
