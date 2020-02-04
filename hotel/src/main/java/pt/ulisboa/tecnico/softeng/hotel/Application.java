package pt.ulisboa.tecnico.softeng.hotel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import pt.ist.fenixframework.Atomic;
import pt.ulisboa.tecnico.softeng.hotel.domain.Hotel;
import pt.ulisboa.tecnico.softeng.hotel.domain.Processor;
import pt.ulisboa.tecnico.softeng.hotel.services.local.HotelInterface;
import pt.ulisboa.tecnico.softeng.hotel.services.remote.BankInterface;
import pt.ulisboa.tecnico.softeng.hotel.services.remote.TaxInterface;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class Application {

	private static List<String> NAMES = new ArrayList<String>();

	public static void setupNames() {
		NAMES.add("Eastern Angel Resort");
		NAMES.add("Queen's Blossom Hotel");
		NAMES.add("Exalted Market Hotel");
		NAMES.add("Enigma Resort");
		NAMES.add("Riverside Fjord Resort & Spa");
		NAMES.add("Onyx Nimbus Resort & Spa");
	}


	@Atomic(mode = Atomic.TxMode.WRITE)
	public static void createHotel(String code, String name, String nif, String iban, long singleP, long doubleP) {
		new Hotel(code, name, nif, iban, singleP, doubleP,new Processor(new BankInterface(), new TaxInterface()));
	}

	public static void main(String[] args) {
		if(HotelInterface.getHotels().isEmpty()) {
			setupNames();

			for (int i = 0; i < 6; i++)
				createHotel("XPTO12" + i, NAMES.get(i), "hotel" + i + "NIF", "hotel" + i + "_IBAN", 20, 30);
		}

		SpringApplication.run(Application.class, args);
	}
}