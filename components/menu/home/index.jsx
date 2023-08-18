import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Accordion from "../../UI/Accordion";
import { Calendar } from "react-native-calendars";
import { Button, ListItem } from "@react-native-material/core";

function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [permitsOnCalendar, setPermitsOnCalendar] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

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

        const markedDates = {};
        permitsOnSelectedDate.forEach((user) => {
          const startDate = new Date(user.startDay);
          const endDate = user.endDay ? new Date(user.endDay) : startDate;
          const currentDate = new Date(startDate);

          while (currentDate <= endDate) {
            const dateString = currentDate.toISOString().split("T")[0];
            markedDates[dateString] = { selected: true, selectedColor: "red" };
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });
        setMarkedDates(markedDates);
      } else {
        setPermitsOnCalendar([]);
        setMarkedDates({});
      }
    }
  }

  const marked = useMemo(() => ({
    [formattedSelectedDate]: {
      selected: true,
      selectedColor: '#8754ce',
      selectedTextColor: 'white',
    }
  }), [formattedSelectedDate]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          current={selectedDate}
          onDayPress={updatePermitsOnCalendar}
          monthFormat={"yyyy MMMM"}
          markingType={"multi-dot"}
          markedDates={marked}
          hideExtraDays={false}
        />
        <Text style={styles.permitTitle}>
          {formattedSelectedDate} tarihinde izinli olan çalışanlar:
        </Text>
        {permitsOnCalendar.length > 0 ? (
          permitsOnCalendar.map((user, index) => (
            <View style={styles.permitBox}>
              <Accordion
                key={index}
                title={user.name}
                content={
                  <View style={styles.permitBoxDown}>
                    <ListItem
                      title={user.reason}
                      secondaryText="İzin Sebebi : "
                    />
                    <ListItem
                      title={user.startDay}
                      secondaryText="Başlangıç Tarihi"
                    />
                    {
                      user.endDay &&
                      <ListItem
                        title={user.endDay || "Belirtilmemiş"}
                        secondaryText="Bitiş Tarihi "
                      />
                    }
                    <ListItem
                      title={user.manager}
                      secondaryText="Yönetici : "
                    />
                  </View>
                }
              />
            </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  permitBoxDown: {
    width: 350,
    borderWidth: 1,
    borderColor: "#cecece",
  },
  contentText: {
    fontSize: 15,
  },
});

export default Home;
