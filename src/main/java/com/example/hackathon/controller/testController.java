package com.example.hackathon.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

import com.example.hackathon.API.Account;
import com.example.hackathon.API.Balance;
import com.example.hackathon.API.Branches;
import com.example.hackathon.API.Offers;
import com.example.hackathon.API.Transaction;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

import org.springframework.web.bind.annotation.RestController;



@RestController
public class testController {

    @GetMapping("/testAPI")
    public String getTestAPI() {
        try {
            HttpResponse<String> response = Unirest.get("http://jpcjofsdev.apigw-az-eu.webmethods.io/gateway/Transactions/v0.4.3/accounts/1007/transactions?skip=0&limit=10&sort=desc")
                .header("Authorization", "Basic YWRuYW46YWxrYW1hZG5hbjA=")
                .header("x-idempotency-key", "1")
                .header("x-jws-signature", "1")
                .header("x-interactions-id", "1")
                .asString();

            return response.getBody();
            
        }catch (Exception e) {
            e.printStackTrace();
            return "Error occurred while fetching data";
        }
    }

    @GetMapping("/test")
    public String getTestAccount() {
        Balance balance = Balance.getBalance("1010"); 
        List<Account> account = Account.getAccountsById("IND_CUST_009");
        List<Offers> offers = Offers.getOffer("1010");
        List<Transaction> transactions = Transaction.getTransaction("1010");
        
        String ans = "balacnes: \n";
        ans += balance.getAccountId() + " ------ " + balance.getAvailableBalance() + " ------ " + balance.getCurrentBalance() + " ------ " + balance.getCreditLimit();
        ans += "\n\nAccounts: \n";
        for (Account acc : account) {
            ans += "\n" + acc.getAccountId() + " ------ " + acc.getIbanAddress() + " ------ " + acc.getInstitutionEnName() + " ------ " + acc.getInstitutionArName() + " ------ " + acc.getInstitutionEnTradename() + " ------ " + acc.getInstitutionArTradename() + " ------ " + acc.getBalance().getAvailableBalance() + " ------ " + acc.getBalance().getCurrentBalance() + " ------ " + acc.getBalance().getCreditLimit();
        }

        ans += "\n\nOffers: \n";
        for (Offers offer : offers) {
            ans += "\n" + offer.getOfferId() + " ------ " + offer.getProductId() + " ------ " + offer.getDescription() + " ------ " + offer.getRate() + " ------ " + offer.getOfferAmount() + " ------ " + offer.getFee() + " ------ " + offer.getTerms();
        }


        ans += "\n\nTransactions: \n";
        for (Transaction transaction : transactions) {
            ans += "\n" + transaction.getTransactionId() + " ------ " + transaction.getAmount() + " ------ " + transaction.getTransactionType() + " ------ " + transaction.getDebtorName() + " ------ " + transaction.getDebtorAccountId() + " ------ " + transaction.getCreditorName() + " ------ " + transaction.getCreditorAccountId() + " ------ " + transaction.getDate();
        }

        
        

        return ans;
    }

    @GetMapping("/hello")
    public String getHello() {
        return "Hello";
    }
    
    
}
