package pt.ulisboa.tecnico.softeng.broker.presentation;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import pt.ulisboa.tecnico.softeng.broker.exception.BrokerException;
import pt.ulisboa.tecnico.softeng.broker.services.local.BrokerInterface;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.LoginData;



@RestController
@RequestMapping(value = "/brokers/{code}/login")
public class LoginController {
	private static Logger logger = LoggerFactory.getLogger(ClientController.class);


	// @CrossOrigin(origins = "http://localhost:4200")
	// @RequestMapping(method = RequestMethod.GET)
	// public List<ClientData> showClients(@PathVariable String code) {
	// 	logger.info("showClients code:{}", code);

	// 	BrokerData brokerData = BrokerInterface.getBrokerDataByCode(code, CopyDepth.CLIENTS);
	// 	return brokerData.getClients();
	// }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Object> addClient(@RequestBody LoginData login, @PathVariable String code) {
		logger.info("addClient: email:{}, passwd:{}", login.getEmail(), login.getPasswd());

		try {
			String nif = BrokerInterface.authenticateUser(code, login);
			return new ResponseEntity(nif, HttpStatus.OK);
		} catch (BrokerException e) {
			return new ResponseEntity("invalid credentials", HttpStatus.FORBIDDEN);
		}
	}

}
