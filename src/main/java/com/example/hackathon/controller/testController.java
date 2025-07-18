package com.example.hackathon.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

import com.example.hackathon.API.Account;
import com.example.hackathon.API.Balance;
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
            return "";
            
        }catch (Exception e) {
            e.printStackTrace();
            return "Error occurred while fetching data";
        }
    }

    @GetMapping("/test")
    public String getTestAccount() {
        Balance balance = Balance.getBalance("1007"); 
        List<Account> account = Account.getAccountsById("IND_CUST_009");
        
        String ans = "balacnes: \n";
        ans += balance.getAccountId() + " ------ " + balance.getAvailableBalance() + " ------ " + balance.getCurrentBalance() + " ------ " + balance.getCreditLimit();
        ans += "\n\nAccounts: \n";
        for (Account acc : account) {
            ans += "\n" + acc.getAccountId() + " ------ " + acc.getIbanAddress() + " ------ " + acc.getInstitutionEnName() + " ------ " + acc.getInstitutionArName() + " ------ " + acc.getInstitutionEnTradename() + " ------ " + acc.getInstitutionArTradename();
        }

        return ans;
    }

    @GetMapping("/hello")
    public String getHello() {
        return "Hello";
    }
    
    
}
