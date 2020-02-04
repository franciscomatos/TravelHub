package pt.ulisboa.tecnico.softeng.broker.services.local;

import pt.ist.fenixframework.Atomic;
import pt.ist.fenixframework.Atomic.TxMode;
import pt.ist.fenixframework.FenixFramework;
import pt.ulisboa.tecnico.softeng.broker.domain.Adventure;
import pt.ulisboa.tecnico.softeng.broker.domain.Broker;
import pt.ulisboa.tecnico.softeng.broker.domain.BulkRoomBooking;
import pt.ulisboa.tecnico.softeng.broker.domain.Client;
import pt.ulisboa.tecnico.softeng.broker.exception.BrokerException;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.*;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.BrokerData.CopyDepth;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.BulkData;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.ClientData;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.LoginData;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.ReferenceData;
import pt.ulisboa.tecnico.softeng.broker.services.remote.*;
import pt.ulisboa.tecnico.softeng.broker.services.remote.dataobjects.RestActivitiesNameData;
import pt.ulisboa.tecnico.softeng.broker.services.remote.dataobjects.RestHotelsNamesData;
import pt.ulisboa.tecnico.softeng.broker.services.remote.dataobjects.RestRoomBookingData;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class BrokerInterface {

    @Atomic(mode = TxMode.READ)
    public static List<BrokerData> getBrokers() {
        List<BrokerData> brokers = new ArrayList<>();
        for (Broker broker : FenixFramework.getDomainRoot().getBrokerSet()) {
            brokers.add(new BrokerData(broker, CopyDepth.SHALLOW));
        }
        return brokers;
    }

    @Atomic(mode = TxMode.WRITE)
    public static void createBroker(BrokerData brokerData) {
        new Broker(brokerData.getCode(), brokerData.getName(), brokerData.getNif(),
                brokerData.getIban(), new ActivityInterface(), new HotelInterface(), new CarInterface(), new BankInterface(), new TaxInterface());
    }

    @Atomic(mode = TxMode.READ)
    public static BrokerData getBrokerDataByCode(String brokerCode, CopyDepth depth) {
        Broker broker = getBrokerByCode(brokerCode);

        if (broker != null) {
            return new BrokerData(broker, depth);
        } else {
            return null;
        }
    }

    @Atomic(mode = TxMode.READ)
    public static ClientData getClientDataByBrokerCodeAndNif(String brokerCode, String clientNif) {
        Broker broker = getBrokerByCode(brokerCode);
        if (broker == null) {
            return null;
        }

        Client client = broker.getClientByNIF(clientNif);
        if (client == null) {
            return null;
        }

        return new ClientData(client);
    }

    @Atomic(mode = TxMode.READ)
    public static List<ReferenceData> getBulksBooksInformation(String brokerCode, String bulkId) {
        Broker broker = getBrokerByCode(brokerCode);
        if (broker == null) {
            return null;
        }

        List<ReferenceData> referencesData = new ArrayList<ReferenceData>();

        BulkRoomBooking bulk = broker.getBulkRoomBookingById(bulkId);

        Set<String> references = bulk.getReferences();


        /*
        if (bulk == null) {
            return null;
        }
        */     
        HotelInterface hotelInterface = broker.getHotelInterface();
        for(String reference : references){
            RestRoomBookingData bookingData = hotelInterface.getRoomBookingData(reference);
            ReferenceData referenceInfo = new ReferenceData(bookingData);
            referencesData.add(referenceInfo);
        }

        return referencesData;
    }


    @Atomic(mode = TxMode.WRITE)
    public static void createClient(String brokerCode, ClientData clientData) {
        new Client(getBrokerByCode(brokerCode), clientData.getIban(), clientData.getNif(),
                clientData.getDrivingLicense(), clientData.getAge() != null ? clientData.getAge() : 0, clientData.getEmail(), clientData.getPasswd(), true);
    }

    @Atomic(mode = TxMode.WRITE)
    public static void createAdventure(String brokerCode, String clientNif, AdventureData adventureData) {
        createAdventure(brokerCode, clientNif, adventureData, false);
    }

    @Atomic(mode = TxMode.WRITE)
    public static void createAdventure(String brokerCode, String clientNif, AdventureData adventureData, boolean rounding) {
        Broker broker = getBrokerByCode(brokerCode);
        Client client = broker.getClientByNIF(clientNif);
        // since decimal cases are lost in http messages, margin received is always multiplied by 1000 se it needs to be rounded
        if(rounding)
            new Adventure(broker, adventureData.getBegin(), adventureData.getEnd(), client,
                    adventureData.getMargin() == null ? -1 : adventureData.getMarginLongRounded(), adventureData.getBookRoom(), adventureData.getRentVehicle());
        else 
            new Adventure(broker, adventureData.getBegin(), adventureData.getEnd(), client,
                        adventureData.getMargin() == null ? -1 : adventureData.getMarginLong(), adventureData.getBookRoom(), adventureData.getRentVehicle());
    }


    @Atomic(mode = TxMode.WRITE)
    public static void createBulkRoomBooking(String brokerCode, BulkData bulkData) {
        new BulkRoomBooking(getBrokerByCode(brokerCode), bulkData.getNumber() != null ? bulkData.getNumber() : 0,
                bulkData.getArrival(), bulkData.getDeparture());

    }

    @Atomic(mode = TxMode.WRITE)
    public static void processAdventure(String brokerCode, String id) {
        Adventure adventure = FenixFramework.getDomainRoot().getBrokerSet().stream()
                .filter(b -> b.getCode().equals(brokerCode)).flatMap(b -> b.getAdventureSet().stream())
                .filter(a -> a.getID().equals(id)).findFirst().orElseThrow(BrokerException::new);

        adventure.process();
    }

    @Atomic(mode = TxMode.WRITE)
    public static void processBulk(String brokerCode, String bulkId) {
        BulkRoomBooking bulkRoomBooking = FenixFramework.getDomainRoot().getBrokerSet().stream()
                .filter(b -> b.getCode().equals(brokerCode)).flatMap(b -> b.getRoomBulkBookingSet().stream())
                .filter(r -> r.getId().equals(bulkId)).findFirst().orElseThrow(BrokerException::new);

        bulkRoomBooking.processBooking();
    }

    @Atomic(mode = TxMode.WRITE)
    public static String cancelBooking(String brokerCode,String reference) {

        Broker broker = getBrokerByCode(brokerCode);
        if (broker == null) {
            return null;
        }

        return broker.getHotelInterface().cancelBooking(reference);
    }

    @Atomic(mode = TxMode.READ)
    public static String authenticateUser(String code, LoginData loginData) {

        Broker broker = getBrokerByCode(code);

        if(broker == null) throw new BrokerException();

        Client client = broker.getClientByEmail(loginData.getEmail());

        if(client == null) throw new BrokerException();

        if(client.authenticate(loginData.getPasswd()))
            return client.getNif();

        throw new BrokerException();
    }

    @Atomic(mode = TxMode.READ)
    public static RestActivitiesNameData getActivities(String code) {

        Broker broker = getBrokerByCode(code);
        if(broker == null) throw new BrokerException();

        return broker.getActivities();
    }

    @Atomic(mode = TxMode.READ)
    public static RestHotelsNamesData getHotels(String code) {

        Broker broker = getBrokerByCode(code);
        if(broker == null) throw new BrokerException();

        return broker.getHotels();
    }

    @Atomic(mode = TxMode.WRITE)
    public static void deleteBrokers() {
        for (Broker broker : FenixFramework.getDomainRoot().getBrokerSet()) {
            broker.delete();
        }
    }

    private static Broker getBrokerByCode(String code) {
        for (Broker broker : FenixFramework.getDomainRoot().getBrokerSet()) {
            if (broker.getCode().equals(code)) {
                return broker;
            }
        }
        return null;
    }

}
