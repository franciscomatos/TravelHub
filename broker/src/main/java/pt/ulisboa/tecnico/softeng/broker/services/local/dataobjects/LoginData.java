package pt.ulisboa.tecnico.softeng.broker.services.local.dataobjects;

public class LoginData {
	String email;
	String passwd; 

	public LoginData() {
	}

	public LoginData(String email, String passwd) {
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPasswd() {
		return this.passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
}
