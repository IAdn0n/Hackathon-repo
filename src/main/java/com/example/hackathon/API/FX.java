package com.example.hackathon.API;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class FX {
    private String sourceCurrency;
    private String targetCurrency;
    private Double conversionValue;
    private Double inverseConversionValue;

    public FX() { }

    public FX(String sourceCurrency, String targetCurrency, Double inverseConversionValue, Double conversionValue) {
        this.sourceCurrency = sourceCurrency;
        this.targetCurrency = targetCurrency;
        this.conversionValue = conversionValue;
        this.inverseConversionValue = inverseConversionValue;
    }

    public String getSourceCurrency() { return sourceCurrency; }
    public void setSourceCurrency(String sourceCurrency) { this.sourceCurrency = sourceCurrency; }

    public String getTargetCurrency() { return targetCurrency; }
    public void setTargetCurrency(String targetCurrency) { this.targetCurrency = targetCurrency; }

    public Double getInverseConversionValue() { return inverseConversionValue; }
    public void setInverseConversionValue(Double inverseConversionValue) { this.inverseConversionValue = inverseConversionValue; }
    public Double getConversionValue() { return conversionValue; }
    public void setConversionValue(Double conversionValue) { this.conversionValue = conversionValue; }
    public static List<FX> getFXRates() {
        try {
            HttpResponse<String> resp = Unirest.get(
                    "http://jpcjofsdev.apigw-az-eu.webmethods.io/"
                  + "gateway/Foreign%20Exchange%20%28FX%29/v0.4.3/institution/FXs")
                .header("x-interactions-id", "1")
                .header("Authorization", "Basic YWRuYW46YWxrYW1hZG5hbjA=")
                .header("x-jws-signature", "1")
                .header("x-idempotency-key", "1")
                .asString();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root    = mapper.readTree(resp.getBody());
            JsonNode dataArr = root.path("data");

            List<FX> fxList = new ArrayList<>();
            for (JsonNode node : dataArr) {
                FX fx = new FX();
                fx.setSourceCurrency(node.path("sourceCurrency").asText());
                fx.setTargetCurrency(node.path("targetCurrency").asText());
                fx.setConversionValue(node.path("conversionValue").asDouble());
                fx.setInverseConversionValue(node.path("inverseConversionValue").asDouble());
                fxList.add(fx);
            }
            return fxList;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }
}
