package com.example.hackathon.API;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

public class Account {
    private String accountId;
    private String ibanAddress;
    private String institutionAddress;
    private String institutionEnName;
    private String institutionArName;
    private String institutionEnTradename;
    private String institutionArTradename;
    
    public String getAccountId() {
        return accountId;
    }
    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }
    public String getIbanAddress() {
        return ibanAddress;
    }
    public void setIbanAddress(String ibanAddress) {
        this.ibanAddress = ibanAddress;
    }
    public String getInstitutionAddress() {
        return institutionAddress;
    }
    public void setInstitutionAddress(String institutionAddress) {
        this.institutionAddress = institutionAddress;
    }
    public String getInstitutionEnName() {
        return institutionEnName;
    }
    public void setInstitutionEnName(String institutionEnName) {
        this.institutionEnName = institutionEnName;
    }
    public String getInstitutionArName() {
        return institutionArName;
    }
    public void setInstitutionArName(String institutionArName) {
        this.institutionArName = institutionArName;
    }
    public String getInstitutionEnTradename() {
        return institutionEnTradename;
    }
    public void setInstitutionEnTradename(String institutionEnTradename) {
        this.institutionEnTradename = institutionEnTradename;
    }
    public String getInstitutionArTradename() {
        return institutionArTradename;
    }
    public void setInstitutionArTradename(String institutionArTradename) {
        this.institutionArTradename = institutionArTradename;
    }


    public static List<Account> getAccountsById(String userId){

        try {
            List<Account> accounts = new ArrayList<>();

            HttpResponse<String> response = Unirest.get("https://jpcjofsdev.apigw-az-eu.webmethods.io/gateway/Accounts/v0.4.3/accounts")
            .queryString("skip", 0)
            .queryString("limit", 10)
            .queryString("sort", "desc")
            .header("x-jws-signature", "1")
            .header("x-idempotency-key", "1")
            .header("Authorization", "Basic YWRuYW46YWxrYW1hZG5hbjA=")
            .header("x-interactions-id", "1")
            .header("x-customer-id", userId)
            .asString();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode allAccounts = mapper.readTree(response.getBody()).path("data");

            System.out.println("Accounts: " + allAccounts.size());

            for (JsonNode accountJSON : allAccounts) {
                // Access fields inside each accountNode
                Account acc = new Account();
                acc.setAccountId(accountJSON.path("accountId").asText());
                acc.setIbanAddress(accountJSON.path("mainRoute").path("address").asText());

                JsonNode institutionNode = accountJSON.path("institutionBasicInfo");
                acc.setInstitutionAddress(institutionNode.path("institutionIdentification").path("address").asText());
                acc.setInstitutionEnName(institutionNode.path("name").path("enName").asText());
                acc.setInstitutionArName(institutionNode.path("name").path("arName").asText());
                acc.setInstitutionEnTradename(institutionNode.path("name").path("tradeName").path("enName").asText());
                acc.setInstitutionArTradename(institutionNode.path("name").path("tradeName").path("arName").asText());
            
                accounts.add(acc);
            }
            
            return accounts;
        }catch (Exception e) {
            e.printStackTrace();
        
        }

        return null;
    }
}
