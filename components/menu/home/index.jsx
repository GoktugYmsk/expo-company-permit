import React, { useState, useMemo, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";

import api from "../../../intercepter";
import Accordion from "../../UI/Accordion";
import { Calendar } from "react-native-calendars";
import { Button, ListItem } from "@react-native-material/core";
function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [permitsOnCalendar, setPermitsOnCalendar] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [regUserList, setRegUserList] = useState([])

  const formattedSelectedDate = selectedDate.toISOString().split("T")[0];

  useEffect(() => {
    api.get(`/time-off/getallaccept/${formattedSelectedDate} `)
      .then((response) => {
        setRegUserList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [formattedSelectedDate]);


  const updatePermitsOnCalendar = (selectedDay) => {
    const newSelectedDate = new Date(selectedDay.dateString);

    if (regUserList) {
      const permitsOnSelectedDate = regUserList.filter((user) => {
        const startDay = new Date(user.startDate);

        if (user.endDate) {
          const endDate = new Date(user.endDate);
          return startDay <= newSelectedDate && endDate >= newSelectedDate;
        }
        return startDay.getTime() === newSelectedDate.getTime();
      });
      setPermitsOnCalendar(permitsOnSelectedDate);

      const markedDates = {};
      permitsOnSelectedDate.forEach((user) => {
        const startDate = new Date(user.startDate);
        const endDate = new Date(user.endDate);
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
          markedDates={markedDates}
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
                      title={user.description}
                      secondaryText="İzin Sebebi : "
                    />
                    <ListItem
                      title={user.startDate}
                      secondaryText="Başlangıç Tarihi"
                    />
                    {
                      user.endDay &&
                      <ListItem
                        title={user.endDate || "Belirtilmemiş"}
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
    alignItems: "center",
    width: "100%",
    minHeight: 800,
    backgroundColor: "white",
    paddingLeft: Platform.OS === "web" ? 300 : 0,
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