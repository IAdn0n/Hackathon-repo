package com.example.hackathon.API;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Branches {
    private String branchId;
    private String branchType;
    private BranchInfo branchInfo;
    private InstitutionBasicInfo institutionBasicInfo;
    private boolean isAvailable;
    private WorkingHours workingHours;
    private List<RelatedSST> relatedSSTs;

    // ===== Constructors =====
    public Branches() { }

    // ===== Getters & Setters =====
    public String getBranchId() { return branchId; }
    public void setBranchId(String branchId) { this.branchId = branchId; }

    public String getBranchType() { return branchType; }
    public void setBranchType(String branchType) { this.branchType = branchType; }

    public BranchInfo getBranchInfo() { return branchInfo; }
    public void setBranchInfo(BranchInfo branchInfo) { this.branchInfo = branchInfo; }

    public InstitutionBasicInfo getInstitutionBasicInfo() { return institutionBasicInfo; }
    public void setInstitutionBasicInfo(InstitutionBasicInfo ibi) { this.institutionBasicInfo = ibi; }

    public boolean isAvailable() { return isAvailable; }
    public void setAvailable(boolean available) { isAvailable = available; }

    public WorkingHours getWorkingHours() { return workingHours; }
    public void setWorkingHours(WorkingHours workingHours) { this.workingHours = workingHours; }

    public List<RelatedSST> getRelatedSSTs() { return relatedSSTs; }
    public void setRelatedSSTs(List<RelatedSST> relatedSSTs) { this.relatedSSTs = relatedSSTs; }

    // ===== Nested Types =====

    public static class BranchInfo {
        private Name name;
        private Address address;
        // getters/setters
        public Name getName() { return name; }
        public void setName(Name name) { this.name = name; }
        public Address getAddress() { return address; }
        public void setAddress(Address address) { this.address = address; }

        public static class Name {
            private String enName;
            private String arName;
            // getters/setters
            public String getEnName() { return enName; }
            public void setEnName(String enName) { this.enName = enName; }
            public String getArName() { return arName; }
            public void setArName(String arName) { this.arName = arName; }
        }

        public static class Address {
            private List<String> addresslines;
            private String city, state, postcode;
            private CountryInfo countryInfo;
            private Location location;
            private String phoneNumber, website, moreInfo;
            // getters/setters
            public List<String> getAddresslines() { return addresslines; }
            public void setAddresslines(List<String> addresslines) { this.addresslines = addresslines; }
            public String getCity() { return city; }
            public void setCity(String city) { this.city = city; }
            public String getState() { return state; }
            public void setState(String state) { this.state = state; }
            public String getPostcode() { return postcode; }
            public void setPostcode(String postcode) { this.postcode = postcode; }
            public CountryInfo getCountryInfo() { return countryInfo; }
            public void setCountryInfo(CountryInfo countryInfo) { this.countryInfo = countryInfo; }
            public Location getLocation() { return location; }
            public void setLocation(Location location) { this.location = location; }
            public String getPhoneNumber() { return phoneNumber; }
            public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
            public String getWebsite() { return website; }
            public void setWebsite(String website) { this.website = website; }
            public String getMoreInfo() { return moreInfo; }
            public void setMoreInfo(String moreInfo) { this.moreInfo = moreInfo; }

            public static class CountryInfo {
                private String countryCode, countryName;
                // getters/setters
                public String getCountryCode() { return countryCode; }
                public void setCountryCode(String countryCode) { this.countryCode = countryCode; }
                public String getCountryName() { return countryName; }
                public void setCountryName(String countryName) { this.countryName = countryName; }
            }

            public static class Location {
                private double latitude, longitude;
                // getters/setters
                public double getLatitude() { return latitude; }
                public void setLatitude(double latitude) { this.latitude = latitude; }
                public double getLongitude() { return longitude; }
                public void setLongitude(double longitude) { this.longitude = longitude; }
            }
        }
    }

    public static class InstitutionBasicInfo {
        private String institutionType;
        private InstitutionIdentification institutionIdentification;
        private BranchInfo.Name name;
        private String institutionPhoneNumber;
        // getters/setters
        public String getInstitutionType() { return institutionType; }
        public void setInstitutionType(String institutionType) { this.institutionType = institutionType; }
        public InstitutionIdentification getInstitutionIdentification() { return institutionIdentification; }
        public void setInstitutionIdentification(InstitutionIdentification ii) { this.institutionIdentification = ii; }
        public BranchInfo.Name getName() { return name; }
        public void setName(BranchInfo.Name name) { this.name = name; }
        public String getInstitutionPhoneNumber() { return institutionPhoneNumber; }
        public void setInstitutionPhoneNumber(String phone) { this.institutionPhoneNumber = phone; }

        public static class InstitutionIdentification {
            private String schema, address;
            // getters/setters
            public String getSchema() { return schema; }
            public void setSchema(String schema) { this.schema = schema; }
            public String getAddress() { return address; }
            public void setAddress(String address) { this.address = address; }
        }
    }

    public static class WorkingHours {
        public static class Day {
            private boolean isWorkingDay;
            private String openingTime, closingTime;
            private String secondOpeningTime, secondClosingTime;
            // getters/setters
            public boolean isWorkingDay() { return isWorkingDay; }
            public void setWorkingDay(boolean w) { this.isWorkingDay = w; }
            public String getOpeningTime() { return openingTime; }
            public void setOpeningTime(String t) { this.openingTime = t; }
            public String getClosingTime() { return closingTime; }
            public void setClosingTime(String t) { this.closingTime = t; }
            public String getSecondOpeningTime() { return secondOpeningTime; }
            public void setSecondOpeningTime(String t) { this.secondOpeningTime = t; }
            public String getSecondClosingTime() { return secondClosingTime; }
            public void setSecondClosingTime(String t) { this.secondClosingTime = t; }
        }
        private Day sunday, monday, tuesday, wednesday, thursday, friday, saturday;
        // getters/setters for each day…
        public Day getSunday() { return sunday; }
        public void setSunday(Day d) { this.sunday = d; }
        public Day getMonday() { return monday; }
        public void setMonday(Day d) { this.monday = d; }
        public Day getTuesday() { return tuesday; }
        public void setTuesday(Day d) { this.tuesday = d; }
        public Day getWednesday() { return wednesday; }
        public void setWednesday(Day d) { this.wednesday = d; }
        public Day getThursday() { return thursday; }
        public void setThursday(Day d) { this.thursday = d; }
        public Day getFriday() { return friday; }
        public void setFriday(Day d) { this.friday = d; }
        public Day getSaturday() { return saturday; }
        public void setSaturday(Day d) { this.saturday = d; }
    }

    public static class RelatedSST {
        private String sstId, type;
        private boolean isAvailable, access24HoursIndicator, hasDepositCapability;
        // getters/setters
        public String getSstId() { return sstId; }
        public void setSstId(String sstId) { this.sstId = sstId; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public boolean isAvailable() { return isAvailable; }
        public void setAvailable(boolean a) { this.isAvailable = a; }
        public boolean isAccess24HoursIndicator() { return access24HoursIndicator; }
        public void setAccess24HoursIndicator(boolean a) { this.access24HoursIndicator = a; }
        public boolean isHasDepositCapability() { return hasDepositCapability; }
        public void setHasDepositCapability(boolean d) { this.hasDepositCapability = d; }
    }

    // ===== JSON fetch & parse =====
    public static List<Branches> getBranches() {
        try {
            HttpResponse<String> resp = Unirest.get(
              "https://jpcjofsdev.apigw-az-eu.webmethods.io/" +
              "gateway/Branches/v0.4.3/institution/branches?limit=10&sort=desc&skip=0")
                .header("x-interactions-id", "1")
                .header("Authorization", "Basic YWRuYW46YWxrYW1hZG5hbjA=")
                .header("x-jws-signature", "1")
                .header("x-idempotency-key", "1")
                .header("Accept-Language", "ar")
                .asString();

            JsonNode dataArr = new ObjectMapper()
                    .readTree(resp.getBody())
                    .path("data");

            List<Branches> list = new ArrayList<>();
            for (JsonNode n : dataArr) {
                Branches b = new Branches();
                b.setBranchId(n.path("branchId").asText());
                b.setBranchType(n.path("branchType").asText());
                b.setAvailable(n.path("isAvailable").asBoolean());

                // branchInfo → name
                BranchInfo bi = new BranchInfo();
                BranchInfo.Name bn = new BranchInfo.Name();
                bn.setEnName(n.path("branchInfo").path("name").path("enName").asText());
                bn.setArName(n.path("branchInfo").path("name").path("arName").asText());
                bi.setName(bn);

                // branchInfo → address
                BranchInfo.Address addr = new BranchInfo.Address();
                // lines
                List<String> lines = new ArrayList<>();
                n.path("branchInfo")
                 .path("address")
                 .path("addresslines")
                 .forEach(l -> lines.add(l.asText()));
                addr.setAddresslines(lines);
                addr.setCity(n.path("branchInfo").path("address").path("city").asText());
                addr.setState(n.path("branchInfo").path("address").path("state").asText());
                addr.setPostcode(n.path("branchInfo").path("address").path("postcode").asText());
                // countryInfo
                BranchInfo.Address.CountryInfo ci = new BranchInfo.Address.CountryInfo();
                ci.setCountryCode(n.path("branchInfo")
                                   .path("address")
                                   .path("countryInfo")
                                   .path("countryCode")
                                   .asText());
                ci.setCountryName(n.path("branchInfo")
                                   .path("address")
                                   .path("countryInfo")
                                   .path("countryName")
                                   .asText());
                addr.setCountryInfo(ci);
                // location
                BranchInfo.Address.Location loc = new BranchInfo.Address.Location();
                loc.setLatitude(n.path("branchInfo")
                                 .path("address")
                                 .path("location")
                                 .path("latitude")
                                 .asDouble());
                loc.setLongitude(n.path("branchInfo")
                                  .path("address")
                                  .path("location")
                                  .path("longitude")
                                  .asDouble());
                addr.setLocation(loc);

                addr.setPhoneNumber(n.path("branchInfo")
                                     .path("address")
                                     .path("phoneNumber")
                                     .asText());
                addr.setWebsite(n.path("branchInfo")
                                 .path("address")
                                 .path("website")
                                 .asText());
                addr.setMoreInfo(n.path("branchInfo")
                                  .path("address")
                                  .path("moreInfo")
                                  .asText());
                bi.setAddress(addr);
                b.setBranchInfo(bi);

                // institutionBasicInfo
                InstitutionBasicInfo ibi = new InstitutionBasicInfo();
                ibi.setInstitutionType(n.path("institutionBasicInfo")
                                        .path("institutionType")
                                        .asText());
                InstitutionBasicInfo.InstitutionIdentification ii =
                  new InstitutionBasicInfo.InstitutionIdentification();
                ii.setSchema(n.path("institutionBasicInfo")
                              .path("institutionIdentification")
                              .path("schema")
                              .asText());
                ii.setAddress(n.path("institutionBasicInfo")
                               .path("institutionIdentification")
                               .path("address")
                               .asText());
                ibi.setInstitutionIdentification(ii);

                // name inside institutionBasicInfo
                BranchInfo.Name in = new BranchInfo.Name();
                in.setEnName(n.path("institutionBasicInfo")
                              .path("name")
                              .path("enName")
                              .asText());
                in.setArName(n.path("institutionBasicInfo")
                              .path("name")
                              .path("arName")
                              .asText());
                ibi.setName(in);

                ibi.setInstitutionPhoneNumber(n.path("institutionBasicInfo")
                                              .path("institutionPhoneNumber")
                                              .asText());
                b.setInstitutionBasicInfo(ibi);

                // workingHours
                WorkingHours wh = new WorkingHours();
                n.path("workingHours").fields().forEachRemaining(e -> {
                    WorkingHours.Day d = new WorkingHours.Day();
                    JsonNode dn = e.getValue();
                    d.setWorkingDay(dn.path("isWorkingDay").asBoolean());
                    d.setOpeningTime(dn.path("openingTime").asText());
                    d.setClosingTime(dn.path("closingTime").asText());
                    d.setSecondOpeningTime(dn.path("secondOpeningTime").asText());
                    d.setSecondClosingTime(dn.path("secondClosingTime").asText());
                    switch (e.getKey().toLowerCase()) {
                        case "sunday":   wh.setSunday(d); break;
                        case "monday":   wh.setMonday(d); break;
                        case "tuesday":  wh.setTuesday(d); break;
                        case "wednesday":wh.setWednesday(d); break;
                        case "thursday": wh.setThursday(d); break;
                        case "friday":   wh.setFriday(d); break;
                        case "saturday": wh.setSaturday(d); break;
                    }
                });
                b.setWorkingHours(wh);

                // relatedSSTs
                List<RelatedSST> ssts = new ArrayList<>();
                n.path("relatedSSTs").forEach(ss -> {
                    RelatedSST r = new RelatedSST();
                    r.setSstId(ss.path("sstId").asText());
                    r.setType(ss.path("type").asText());
                    r.setAvailable(ss.path("isAvailable").asBoolean());
                    r.setAccess24HoursIndicator(ss.path("access24HoursIndicator").asBoolean());
                    r.setHasDepositCapability(ss.path("hasDepositCapability").asBoolean());
                    ssts.add(r);
                });
                b.setRelatedSSTs(ssts);

                list.add(b);
            }

            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }
}