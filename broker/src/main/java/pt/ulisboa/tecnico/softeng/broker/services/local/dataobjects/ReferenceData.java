package pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects;

import org.joda.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;
import pt.ulisboa.tecnico.softeng.broker.domain.BulkRoomBooking;
import pt.ulisboa.tecnico.softeng.broker.services.remote.dataobjects.RestRoomBookingData;

import java.util.List;
import java.util.stream.Collectors;

public class ReferenceData {
    private String id;
    private String  hotelName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate arrival;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate departure;
    private String bookRoom;
    private String cancellation;
    private LocalDate cancellationDate;
    private long price;


    public ReferenceData() {
    }

    public ReferenceData(RestRoomBookingData roomBookingData) {
        this.id = roomBookingData.getReference();
        this.hotelName = roomBookingData.getHotelName();
        this.arrival = roomBookingData.getArrival();
        this.departure = roomBookingData.getDeparture();
        this.bookRoom = roomBookingData.getBookRoom();
        this.cancellationDate = roomBookingData.getCancellationDate();
        this.price = roomBookingData.getPrice();
        this.cancellation = roomBookingData.getCancellation();

    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHotelName() {
        return this.hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public LocalDate getArrival() {
        return this.arrival;
    }

    public void setArrival(LocalDate arrival) {
        this.arrival = arrival;
    }

    public LocalDate getDeparture() {
        return this.departure;
    }

    public void setDeparture(LocalDate departure) {
        this.departure = departure;
    }

    public String getBookRoom() {
        return this.bookRoom;
    }

    public void setBookRoom(String bookRoom) {
        this.bookRoom = bookRoom;
    }

    public LocalDate getCancellationDate() {
        return this.cancellationDate;
    }

    public void setCancellationDate(LocalDate cancellationDate) {
        this.cancellationDate = cancellationDate;
    }

    public long getPrice() {
        return this.price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public String getCancellation() {
        return this.cancellation;
    }

    public void setCancellation(String cancellation) {
        this.cancellation = cancellation;
    }

}
