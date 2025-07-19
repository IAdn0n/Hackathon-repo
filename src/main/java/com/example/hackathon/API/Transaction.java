package com.example.hackathon.API;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

import java.util.ArrayList;
import java.util.List;

public class Transaction {
    private String transactionId;
    private double amount;
    private String transactionType;
    private String debtorName;
    private String debtorAccountId;
    private String creditorName; 
    private String creditorAccountId;
    private String date;
    //getters and setters
    public String getTransactionId() {
        return transactionId;
    }
    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public String getTransactionType() {
        return transactionType;
    }
    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }
    public String getDebtorName() {
        return debtorName;
    }
    public void setDebtorName(String debtorName) {
        this.debtorName = debtorName;
    }
    public String getDebtorAccountId() {
        return debtorAccountId;
    }
    public void setDebtorAccountId(String debtorAccountId) {
        this.debtorAccountId = debtorAccountId;
    }
    public String getCreditorName() {
        return creditorName;
    }
    public void setCreditorName(String creditorName) {
        this.creditorName = creditorName;
    }
    public String getCreditorAccountId() {
        return creditorAccountId;
    }
    public void setCreditorAccountId(String creditorAccountId) {
        this.creditorAccountId = creditorAccountId;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }


    public static List<Transaction> getTransaction(String accountId) {
        try {
            List<Transaction> transactions = new ArrayList<>();
            HttpResponse<String> response = Unirest.get("http://jpcjofsdev.apigw-az-eu.webmethods.io/gateway/Transactions/v0.4.3/accounts/"+accountId+"/transactions?skip=0&limit=10&sort=desc")
                .header("Authorization", "Basic YWRuYW46YWxrYW1hZG5hbjA=")
                .header("x-idempotency-key", "1")
                .header("x-jws-signature", "1")
                .header("x-interactions-id", "1")
                .asString();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode allTrans = mapper.readTree(response.getBody()).path("data");
            for (JsonNode root : allTrans) {
                Transaction trans = new Transaction();
                trans.setTransactionId(root.path("transactionId").asText());
                trans.setAmount(root.path("transactionAmount").path("amount").asDouble());
                trans.setTransactionType(root.path("transactionType").asText());
                trans.setDebtorName(root.path("debtor").path("debtorPersonal").path("name").asText());
                trans.setDebtorAccountId(root.path("debtor").path("debtorAccount").path("accountId").asText());
                trans.setCreditorName(root.path("creditor").path("creditorPersonal").path("name").asText());
                trans.setCreditorAccountId(root.path("creditor").path("creditorAccount").path("accountId").asText());
                trans.setDate(root.path("settlementDateTime").asText());
                transactions.add(trans);
            }

            return transactions;
        }catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
