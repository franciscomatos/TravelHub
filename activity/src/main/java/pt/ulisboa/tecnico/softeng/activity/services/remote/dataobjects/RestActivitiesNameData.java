package pt.ulisboa.tecnico.softeng.activity.services.remote.dataobjects;

import java.util.List;

public class RestActivitiesNameData {
    private List<String> names;

    public RestActivitiesNameData() {

    }

    public RestActivitiesNameData(List<String> names) {
        this.names = names;
    }

    public void setNames(List<String> names) {
        this.names = names;
    }

    public List<String> getNames() {
        return names;
    }
}
