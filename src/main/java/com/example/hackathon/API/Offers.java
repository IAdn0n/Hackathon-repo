package com.example.hackathon.API;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;


public class Offers {
    String offerId;
    String productId;
    String description;
    double rate;
    double offerAmount;
    double fee;
    String terms;

    //getters and setters
    public String getOfferId() {
        return offerId;
    }
    public void setOfferId(String offerId) {
        this.offerId = offerId;
    }
    public String getProductId() {
        return productId;
    }
    public void setProductId(String productId) {
        this.productId = productId;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public double getRate() {
        return rate;
    }
    public void setRate(double rate) {
        this.rate = rate;
    }
    public double getOfferAmount() {
        return offerAmount;
    }
    public void setOfferAmount(double offerAmount) {
        this.offerAmount = offerAmount;
    }
    public double getFee() {
        return fee;
    }
    public void setFee(double fee) {
        this.fee = fee;
    }
    public String getTerms() {
        return terms;
    }
    public void setTerms(String terms) {
        this.terms = terms;
    }


    public static List<Offers> getOffer(String accountId) {
        try {
            List<Offers> offers = new ArrayList<>();
            HttpResponse<String> response = Unirest.get("https://jpcjofsdev.apigw-az-eu.webmethods.io/gateway/Offers/v0.4.3/accounts/"+ accountId+"/offers?skip=0&sort=desc&limit=10")
            .header("Authorization", "Basic YWRuYW46YWxrYW1hZG5hbjA=")
            .header("x-idempotency-key", "1")
            .header("x-jws-signature", "1")
            .header("x-interactions-id", "1")
            .asString();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode allOffers = mapper.readTree(response.getBody()).path("data");
            for (JsonNode root : allOffers) {
                Offers offer = new Offers();
                offer.setOfferId(root.path("offerId").asText());
                offer.setProductId(root.path("productId").asText());
                offer.setDescription(root.path("description").asText());
                offer.setRate(root.path("rate").asDouble());
                offer.setOfferAmount(root.path("offerAmount").path("amount").asDouble());
                offer.setFee(root.path("fee").path("amount").asDouble());
                offer.setTerms(root.path("terms").asText());

                offers.add(offer);
            }
            
            return offers;
        }catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }   

}
