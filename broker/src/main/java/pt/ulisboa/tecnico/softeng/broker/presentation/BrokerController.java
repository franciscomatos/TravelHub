package pt.ulisboa.tecnico.softeng.broker.presentation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import pt.ulisboa.tecnico.softeng.broker.services.local.BrokerInterface;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.BrokerData;
import pt.ulisboa.tecnico.softeng.broker.services.remote.dataobjects.RestActivitiesNameData;
import pt.ulisboa.tecnico.softeng.broker.services.remote.dataobjects.RestHotelsNamesData;

import java.util.List;

@RestController
@RequestMapping(value = "/brokers")
public class BrokerController {
    private static final Logger logger = LoggerFactory.getLogger(BrokerController.class);

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.GET)
    public List<BrokerData> getBrokers() {
        logger.info("getBrokers");
        return BrokerInterface.getBrokers();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/{code}", method = RequestMethod.GET)
    public BrokerData getBroker(@PathVariable String code) {
        //CopyDepth.SHALLOW ?
        return BrokerInterface.getBrokerDataByCode(code, BrokerData.CopyDepth.SHALLOW);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.POST)
    public void addBroker(@RequestBody BrokerData broker) {
        logger.info("brokerSubmit name:{}, code:{}, nif:{}, iban:{}", broker.getName(), broker.getCode(), broker.getNif(), broker.getIban());
        BrokerInterface.createBroker(broker);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/{code}", method = RequestMethod.DELETE)
    public List<BrokerData> deleteBrokers(@PathVariable String code) {
        //not sure yet if we will be allowing this operation
        return BrokerInterface.getBrokers();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/{code}/activities", method = RequestMethod.GET)
    public RestActivitiesNameData getActivities(@PathVariable String code) {
        logger.info("getActivities");
        //not sure yet if we will be allowing this operation
        return BrokerInterface.getActivities(code);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/{code}/hotels", method = RequestMethod.GET)
    public RestHotelsNamesData getHotels(@PathVariable String code) {
        logger.info("getHotels");
        //not sure yet if we will be allowing this operation
        return BrokerInterface.getHotels(code);
    }

}
