package pt.ulisboa.tecnico.softeng.broker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import pt.ist.fenixframework.Atomic;
import pt.ulisboa.tecnico.softeng.broker.domain.Broker;
import pt.ulisboa.tecnico.softeng.broker.services.local.BrokerInterface;
import pt.ulisboa.tecnico.softeng.broker.services.remote.*;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class Application {

	private static List<String> NAMES = new ArrayList<String>();

	public static void setupNames() {
		NAMES.add("WeExplore");
		NAMES.add("Paradise Travel");
		NAMES.add("TravelRight");
		NAMES.add("Travelcations");
		NAMES.add("Jet Set Travel Services");
		NAMES.add("Business Class Travel Inc.");
		NAMES.add("Royalty Travel Systems");
		NAMES.add("Wilderness Explorers");
		NAMES.add("Smart Family Vacations");
		NAMES.add("New Realm Travel");
		NAMES.add("Fantasy Travel");
	}

	@Atomic(mode = Atomic.TxMode.WRITE)
	public static void createBroker(String code, String name, String nif, String iban) {
		new Broker(code, name, nif, iban, new ActivityInterface(), new HotelInterface(), new CarInterface(),
				new BankInterface(), new TaxInterface());
	}

	public static void main(String[] args) {
		if(BrokerInterface.getBrokers().isEmpty()) {
			setupNames();

			for (int i = 0; i < 10; i++)
				createBroker("BR0" + i, NAMES.get(i), "selle" + i + "NIF", "BROKE" + i + "_IBAN");
		}

		SpringApplication.run(Application.class, args);
	}
}
