package pt.ulisboa.tecnico.softeng.hotel.services.remote.dataobjects;

import java.util.List;

public class RestHotelsNamesData {
    private List<String> names;

    public RestHotelsNamesData() {

    }

    public RestHotelsNamesData(List<String> names) {
        this.names = names;
    }

    public void setNames(List<String> names) {
        this.names = names;
    }

    public List<String> getNames() {
        return names;
    }
}
