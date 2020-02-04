package pt.ulisboa.tecnico.softeng.activity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import pt.ist.fenixframework.Atomic;
import pt.ulisboa.tecnico.softeng.activity.domain.Activity;
import pt.ulisboa.tecnico.softeng.activity.domain.ActivityProvider;
import pt.ulisboa.tecnico.softeng.activity.domain.Processor;
import pt.ulisboa.tecnico.softeng.activity.services.local.ActivityInterface;
import pt.ulisboa.tecnico.softeng.activity.services.remote.BankInterface;
import pt.ulisboa.tecnico.softeng.activity.services.remote.TaxInterface;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class Application {

	private static String PROVIDER_NAME = "XtremeAdventure";
	private static String PROVIDER_CODE = "XtremX";
	private static String PROVIDER_NIF = "NIF";
	private static String PROVIDER_IBAN = "IBAN";
	private static List<String> NAMES = new ArrayList<String>();

	public static void setUpNames() {
		NAMES.add("Bush Walking");
		NAMES.add("Surf");
		NAMES.add("Sky Diving");
		NAMES.add("Paintball");
		NAMES.add("Apple picking");
		NAMES.add("Hiking");
	}

	@Atomic(mode = Atomic.TxMode.WRITE)
	public static ActivityProvider createProvider() {
		return new ActivityProvider(PROVIDER_CODE, PROVIDER_NAME, PROVIDER_NIF, PROVIDER_IBAN,
				new Processor(new BankInterface(), new TaxInterface()));
	}

	@Atomic(mode = Atomic.TxMode.WRITE)
	public static void createActivity(ActivityProvider provider, String name, int min, int max, int cap) {
		new Activity(provider, name, min, max, cap);
	}

	public static void main(String[] args) {
		if(ActivityInterface.getProviders().isEmpty()) {
			setUpNames();
			ActivityProvider provider = createProvider();

			for(int i = 0; i < 6; i++)
				createActivity(provider, NAMES.get(i), 18, 99, 100);
		}

		SpringApplication.run(Application.class, args);

	}
}