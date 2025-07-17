package com.example.hackathon.controller;
import kong.unirest.HttpResponse;
import org.springframework.web.bind.annotation.GetMapping;

import kong.unirest.Unirest;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class testController {
    @GetMapping("/testAccount")
    public String getTestAccount() {
        HttpResponse<String> response = Unirest.get("https://jpcjofsdev.apigw-az-eu.webmethods.io/gateway/Accounts/v0.4.3/accounts")
        .queryString("skip", 0)
        .queryString("limit", 10)
        .queryString("sort", "desc")
        .header("x-jws-signature", "1")
        .header("x-auth-date", "1")
        .header("x-idempotency-key", "1")
        .header("Authorization", "Basic YWRuYW46YWxrYW1hZG5hbjA=")
        .header("x-customer-user-agent", "1")
        .header("x-financial-id", "1")
        .header("x-customer-ip-address", "1")
        .header("x-interactions-id", "1")
        .header("x-customer-id", "IND_CUST_001")
        .asString();

        return response.getBody();
    }

    @GetMapping("/hello")
    public String getHello() {
        return "Hello";
    }
    
    
}
