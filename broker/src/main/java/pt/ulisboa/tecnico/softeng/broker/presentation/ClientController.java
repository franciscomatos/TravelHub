package pt.ulisboa.tecnico.softeng.broker.presentation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import pt.ulisboa.tecnico.softeng.broker.services.local.BrokerInterface;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.BrokerData;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.BrokerData.CopyDepth;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.ClientData;

import java.util.List;


@RestController
@RequestMapping(value = "/brokers/{code}/clients")
public class ClientController {
	private static Logger logger = LoggerFactory.getLogger(ClientController.class);


	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(method = RequestMethod.GET)
	public List<ClientData> showClients(@PathVariable String code) {
		logger.info("showClients code:{}", code);

		BrokerData brokerData = BrokerInterface.getBrokerDataByCode(code, CopyDepth.CLIENTS);
		return brokerData.getClients();
	}

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.POST)
	public void addClient(@RequestBody ClientData client, @PathVariable String code) {
		logger.info("addClient: brokerCode:{}, clientNif:{}, clientIban:{}, clientAge:{}, clientDrivingLicense:{} clientEmail:{}, clientPasswd:{}", code, client.getNif(), client.getIban(), client.getAge(), client.getDrivingLicense(), client.getEmail(), client.getPasswd());

		BrokerInterface.createClient(code, client);
	}

}
