package pt.ulisboa.tecnico.softeng.broker.presentation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import pt.ulisboa.tecnico.softeng.broker.exception.BrokerException;
import pt.ulisboa.tecnico.softeng.broker.services.local.BrokerInterface;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.BrokerData;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.BrokerData.CopyDepth;
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.BulkData;

import java.util.List;

@RestController
@RequestMapping(value = "/brokers/{brokerCode}/bulks")
public class BulkController {
	private static Logger logger = LoggerFactory.getLogger(AdventureController.class);

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(method = RequestMethod.GET)
	public List<BulkData> showBulks(@PathVariable String brokerCode) {
		logger.info("showBulks code:{}", brokerCode);

		BrokerData broker = BrokerInterface.getBrokerDataByCode(brokerCode, CopyDepth.BULKS);
		return broker.getBulks();
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(method = RequestMethod.POST)
	public void submitBulk(Model model, @PathVariable String brokerCode, @RequestBody BulkData bulkData) {
		logger.info("submitBulk brokerCode:{}, number:{}, arrival:{}, departure:{}", brokerCode,
				bulkData.getNumber(), bulkData.getArrival(), bulkData.getDeparture());

		BrokerInterface.createBulkRoomBooking(brokerCode, bulkData);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value = "/{bulkId}/process", method = RequestMethod.POST)
	public void processBulk(@PathVariable String brokerCode, @PathVariable String bulkId) {
		logger.info("processBulk brokerCode:{}, bulkId:{}, ", brokerCode, bulkId);

		BrokerInterface.processBulk(brokerCode, bulkId);
	}

}
