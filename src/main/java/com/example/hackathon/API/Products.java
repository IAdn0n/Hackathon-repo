package com.example.hackathon.API;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

public class Products {

    public static class ProductInfo {
        private final String productCommercialName;
        private final String productDescription;
        private final int    maxAmount;
        private final int    maxLoanPeriod;
        private final double startingInterestRate;    // ← new field

        public ProductInfo(String name,
                           String desc,
                           int amount,
                           int period,
                           double startingInterestRate) {
            this.productCommercialName = name;
            this.productDescription    = desc;
            this.maxAmount             = amount;
            this.maxLoanPeriod         = period;
            this.startingInterestRate  = startingInterestRate;
        }

        // getters
        public String getProductCommercialName() { return productCommercialName; }
        public String getProductDescription()   { return productDescription; }
        public int    getMaxAmount()            { return maxAmount; }
        public int    getMaxLoanPeriod()        { return maxLoanPeriod; }
        public double getStartingInterestRate(){ return startingInterestRate; }

        @Override
        public String toString() {
            return String.format(
                "%s — %s (maxAmount=%d, maxLoanPeriod=%d, startRate=%.2f%%)",
                productCommercialName,
                productDescription,
                maxAmount,
                maxLoanPeriod,
                startingInterestRate
            );
        }
    }

    public static List<ProductInfo> getProducts() {
        List<ProductInfo> list = new ArrayList<>();

        try {
            HttpResponse<String> resp = Unirest.get(
                    "http://jpcjofsdev.apigw-az-eu.webmethods.io/"
                  + "gateway/Products/v0.4.3/institution/products?"
                  + "limit=10&productType=loan&sort=desc&skip=0")
                .header("x-interactions-id", "1")
                .header("Authorization", "Basic YWRuYW46YWxrYW1hZG5hbjA=")
                .header("x-jws-signature", "1")
                .header("x-idempotency-key", "1")
                .asString();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root    = mapper.readTree(resp.getBody());
            JsonNode dataArr = root.path("data");

            for (JsonNode product : dataArr) {
                String name  = product.path("productCommercialName").asText();
                String desc  = product.path("productDescription").asText();
                int maxAmt   = product.path("productDetails")
                                      .path("maxAmount")
                                      .asInt();
                int maxPeriod= product.path("productDetails")
                                      .path("termDetails")
                                      .path("maxLoanPeriod")
                                      .asInt();
                double startRate = product.path("productDetails")
                                          .path("startingIntresetRate")  // note the typo in JSON
                                          .asDouble();

                list.add(new ProductInfo(name, desc, maxAmt, maxPeriod, startRate));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
}