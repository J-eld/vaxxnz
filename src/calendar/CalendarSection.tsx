import React, { FunctionComponent } from "react";
import { Coords } from "../location-picker/LocationPicker";
import { BookingCalendar, LoadingBookingCalendar } from "./Calendar";
import { useBookingData } from "./booking/BookingData";

interface CalendarSectionProps {
  coords: Coords;
  radiusKm: number;
  setLastUpdateTime: (time: Date | null) => void;
}

/** Loads booking data, display the calendar or load errors. */
export const CalendarSection: FunctionComponent<CalendarSectionProps> = ({
  coords,
  radiusKm,
  setLastUpdateTime,
}) => {
  const data = useBookingData(coords, radiusKm, setLastUpdateTime);
  return (
    <>
      {"ok" in data ? (
        <BookingCalendar data={data.ok} radiusKm={radiusKm} />
      ) : "loading" in data ? (
        <LoadingBookingCalendar />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          {/* <Spinner color="black" /> */}
          <div style={{ marginLeft: "1rem", fontSize: "1.5rem" }}>
            {data.error.message}
          </div>
        </div>
      )}
    </>
  );
};
