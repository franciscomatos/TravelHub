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
import pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects.ReferenceData;

import java.util.List;
import org.joda.time.LocalDate;


@RestController
@RequestMapping(value = "/brokers/{brokerCode}/bulks/{bulkId}/references")
public class ReferenceController {
	private static Logger logger = LoggerFactory.getLogger(ReferenceController.class);

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(method = RequestMethod.GET)
	public List<ReferenceData> showReferences(@PathVariable String brokerCode, @PathVariable String bulkID) {
		logger.info("showReferences code:{}, bulkID: {}", brokerCode, bulkID);

		BrokerData brokerData = BrokerInterface.getBrokerDataByCode(brokerCode, CopyDepth.BULKS);
		return BrokerInterface.getBulksBooksInformation(brokerCode, bulkID);
	}


	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value = "{ref}/cancel", method = RequestMethod.POST)
	public void bookingCancel(@PathVariable String brokerCode, @PathVariable String ref, @PathVariable String bulkID ) {
		logger.info("bookingCancel hotelCode:{}, roomNumber:{}, ref:{}", brokerCode,
				ref);

				
			String cancellation = BrokerInterface.cancelBooking(brokerCode, ref);

			List<ReferenceData> referencesData = BrokerInterface.getBulksBooksInformation(brokerCode, bulkID);

			if(cancellation != null){
				for(ReferenceData reference : referencesData){
					if(reference.getId().equals(ref)){
						reference.setCancellationDate(new LocalDate());
						reference.setCancellation(reference.getId() + "CANCEL");
					}
				}

			}
	}




	/*

	@RequestMapping(method = RequestMethod.POST)
	public String submitBulk(Model model, @PathVariable String brokerCode, @ModelAttribute BulkData bulkData) {
		logger.info("submitBulk brokerCode:{}, number:{}, arrival:{}, departure:{}, nif:{}, iban:{}", brokerCode,
				bulkData.getNumber(), bulkData.getArrival(), bulkData.getDeparture());

		try {
			BrokerInterface.createBulkRoomBooking(brokerCode, bulkData);
		} catch (BrokerException be) {
			model.addAttribute("error", "Error: it was not possible to create the bulk room booking");
			model.addAttribute("bulk", bulkData);
			model.addAttribute("broker", BrokerInterface.getBrokerDataByCode(brokerCode, CopyDepth.BULKS));
			return "bulks";
		}

		return "redirect:/brokers/" + brokerCode + "/bulks";
	}

	@RequestMapping(value = "/{bulkId}/process", method = RequestMethod.POST)
	public String processBulk(Model model, @PathVariable String brokerCode, @PathVariable String bulkId) {
		logger.info("processBulk brokerCode:{}, bulkId:{}, ", brokerCode, bulkId);

		BrokerInterface.processBulk(brokerCode, bulkId);

		return "redirect:/brokers/" + brokerCode + "/bulks";
	}
	*/

}
