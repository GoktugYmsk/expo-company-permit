import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";
import Accordion from "../../UI/Accordion";

function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [permitsOnCalendar, setPermitsOnCalendar] = useState([]);

  const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);
  const formattedSelectedDate = selectedDate.toISOString().split("T")[0];

  const updatePermitsOnCalendar = (selectedDay) => {
    const newSelectedDate = new Date(selectedDay.dateString);

    if (newSelectedDate.getTime() !== selectedDate.getTime()) {
      setSelectedDate(newSelectedDate);

      if (workerInfo) {
        const permitsOnSelectedDate = workerInfo.filter((user) => {
          const startDate = new Date(user.startDay);

          if (user.endDay) {
            const endDate = new Date(user.endDay);
            return startDate <= newSelectedDate && endDate >= newSelectedDate;
          }

          return startDate.getTime() === newSelectedDate.getTime();
        });

        setPermitsOnCalendar(permitsOnSelectedDate);
      } else {
        console.log("Worker Info is empty");
        setPermitsOnCalendar([]);
      }
    }
  };


  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        current={selectedDate}
        onDayPress={updatePermitsOnCalendar}
        monthFormat={"yyyy MMMM"}
        markingType={"multi-dot"}
        hideExtraDays={true}
      />
      <Text style={styles.permitTitle}>
        {formattedSelectedDate} tarihinde izinli olan çalışanlar:
      </Text>
      {permitsOnCalendar.length > 0 ? (
        permitsOnCalendar.map((user, index) => (
          <Accordion
            key={index}
            title={user.name}
            content={
              <View>
                <Text style={styles.contentText}>İzin Sebebi : {user.reason}</Text>
                <Text style={styles.contentText}>Başlangıç Tarihi : {user.startDay}</Text>
                <Text style={styles.contentText}>Bitiş Tarihi : {user.endDay || "Belirtilmemiş"}</Text>
                <Text style={styles.contentText}>Yönetici : {user.manager}</Text>
              </View>
            }
          />
        ))
      ) : (
        <Text>Seçili tarihte izinli çalışan bulunamadı.</Text>
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
  permitTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  contentText: {
    fontSize: 15,
  },
});

export default Home;
