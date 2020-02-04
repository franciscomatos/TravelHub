package pt.ulisboa.tecnico.softeng.broker.presentation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import pt.ulisboa.tecnico.softeng.broker.exception.BrokerException;
import pt.ulisboa.tecnico.softeng.broker.services.local.BrokerInterface;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.AdventureData;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.BrokerData;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.ClientData;
import java.util.List;

 
@RestController
@RequestMapping(value = "/brokers/{brokerCode}/clients/{clientNif}/adventures")
public class AdventureController {
    private static final Logger logger = LoggerFactory.getLogger(AdventureController.class);

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.GET)
    public List<AdventureData> showAdventures(@PathVariable String brokerCode, @PathVariable String clientNif) {
        logger.info("showAdventures brokerCode:{}, clientNif:{}", brokerCode, clientNif);

        ClientData clientData = BrokerInterface.getClientDataByBrokerCodeAndNif(brokerCode, clientNif);

        /*
        need to check if clientData is null?
        probably not since errors are being handled in the broker service
         */
        return clientData.getAdventures();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.POST)
    public void submitAdventure(@PathVariable String brokerCode, @PathVariable String clientNif,
                                  @RequestBody AdventureData adventureData) {
        logger.info("adventureSubmit brokerCode:{}, clientNif:{}, begin:{}, end:{},margin:{}, room:{} vehicle:{}",
                brokerCode, clientNif, adventureData.getBegin(), adventureData.getEnd(), adventureData.getMargin(),
                adventureData.getBookRoom() != null ? adventureData.getBookRoom().name() : "null",
                adventureData.getRentVehicle() != null ? adventureData.getRentVehicle().name() : "null");

        BrokerInterface.createAdventure(brokerCode, clientNif, adventureData, true);
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/{id}/process", method = RequestMethod.POST)
    public void processAdventure(@PathVariable String brokerCode, @PathVariable String clientNif,
                                   @PathVariable String id) {
        logger.info("processAdventure brokerCode:{}, adventureId:{}", brokerCode, id);

        BrokerInterface.processAdventure(brokerCode, id);
    }


}
