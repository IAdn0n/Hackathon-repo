package com.example.hackathon.API;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

public class Balance {
        private String accountId;
        private Double availableBalance;
        private Double currentBalance;
        private Double creditLimit;

        public String getAccountId() {
            return accountId;
        }

        public void setAccountId(String accountId) {
            this.accountId = accountId;
        }

        public Double getAvailableBalance() {
            return availableBalance;
        }

        public void setAvailableBalance(Double availableBalance) {
            this.availableBalance = availableBalance;
        }

        public Double getCurrentBalance() {
            return currentBalance;
        }

        public void setCurrentBalance(Double currentBalance) {
            this.currentBalance = currentBalance;
        }

        public Double getCreditLimit() {
            return creditLimit;
        }

        public void setCreditLimit(Double creditLimit) {
            this.creditLimit = creditLimit;
        }


    public static Balance getBalance(String accountId) {
        try {
            HttpResponse<String> response = Unirest.get("https://jpcjofsdev.apigw-az-eu.webmethods.io/gateway/Balances/v0.4.3/accounts/" + accountId + "/balances")
            .header("x-idempotency-key", "1")
            .header("Authorization", "Basic YWRuYW46YWxrYW1hZG5hbjA=")
            .header("x-interactions-id", "1")
            .asString();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            Balance balance = new Balance();
            balance.setAccountId(accountId);
            balance.setAvailableBalance(root.path("availableBalance").path("balanceAmount").asDouble());
            balance.setCurrentBalance(root.path("currentBalance").path("balanceAmount").asDouble());
            balance.setCreditLimit(root.path("creditlimit").asDouble());

            return balance;
        }catch (Exception e) {
            e.printStackTrace();
            
        }
        return null;
    }
}

