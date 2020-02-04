package pt.ulisboa.tecnico.softeng.broker.domain;

import java.util.regex.Pattern;

import pt.ulisboa.tecnico.softeng.broker.exception.BrokerException;

public class Client extends Client_Base {

	public Client(Broker broker, String iban, String nif, String drivingLicense, int age, String passwd, Boolean check) {
		this(broker, iban, nif, drivingLicense, age, null, null, false);
	}

	public Client(Broker broker, String iban, String nif, String drivingLicense, int age, String email, String passwd, Boolean check) {
		checkArguments(broker, iban, nif, drivingLicense, age);
		if(check) checkEmailPassword(email, passwd);
		setEmail(email);
		setPasswd(passwd);
		setIban(iban);
		setNif(nif);
		setDrivingLicense(drivingLicense);
		setAge(age);

		broker.addClient(this);
	}
	public Client(Broker broker, String iban, String nif, String drivingLicense, int age) {
		checkArguments(broker, iban, nif, drivingLicense, age);
		setIban(iban);
		setNif(nif);
		setDrivingLicense(drivingLicense);
		setAge(age);

		broker.addClient(this);
	}

	public void delete() {
		setBroker(null);

		for (Adventure adventure : getAdventureSet()) {
			adventure.delete();
		}

		deleteDomainObject();
	}

	public Boolean authenticate(String passwd) {
		return getPasswd().equals(passwd);
	}

	private void checkArguments(Broker broker, String IBAN, String NIF, String drivingLicense, int age) {
		if (broker == null || IBAN == null || NIF == null || IBAN.trim().isEmpty() || NIF.trim().isEmpty()) {
			throw new BrokerException();
		}

		if (drivingLicense != null && drivingLicense.trim().isEmpty()) {
			throw new BrokerException();
		}

		if (age < 0) {
			throw new BrokerException();
		}

		if (broker.getClientByNIF(NIF) != null) {
			throw new BrokerException();
		}

		if (broker.drivingLicenseIsRegistered(drivingLicense)) {
			throw new BrokerException();
		}

	}

	private void checkEmailPassword(String email, String password) {
		if(email == null || password == null)
			throw new BrokerException();

		if(!Pattern.matches("(\\w\\.?)*\\w+@\\w+(\\.?\\w)*", email)){
			throw new BrokerException();
		}
	}

}
