import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";
import Accordion from "../../UI/Accordion";
import { Button } from "@react-native-material/core";
import CustomHamburger from "../../customHamburger";

function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [permitsOnCalendar, setPermitsOnCalendar] = useState([]);

  const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);
  const formattedSelectedDate = selectedDate.toISOString().split("T")[0];

  const updatePermitsOnCalendar = (selectedDay) => {
    const newSelectedDate = new Date(selectedDay.dateString);

    if (newSelectedDate.getTime() !== selectedDate.getTime()) {
      setSelectedDate(newSelectedDate);

      if (workerPerReq) {
        const permitsOnSelectedDate = workerPerReq.filter((user) => {
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
      {/* <CustomHamburger /> */}
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
                {
                  user.endDay &&
                  <Text style={styles.contentText}>Bitiş Tarihi : {user.endDay || "Belirtilmemiş"}</Text>
                }
                <Text style={styles.contentText}>Yönetici : {user.manager}</Text>
              </View>
            }
          />
        ))
      ) : (
        <Button
          title="SeçİLİ tarİhte İzİnlİ çalışan bulunamadı."
          variant="outlined"
          disabled
          color="#8754ce"
          tintColor="white"
          style={{ marginTop: 20, }}
        />
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
    backgroundColor: 'white',
  },
  calendar: {
    width: 350,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#cecece",
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
