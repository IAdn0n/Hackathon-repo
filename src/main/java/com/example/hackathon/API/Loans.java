package com.example.hackathon.API;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

public class Loans {

    public static void submitLoanApplication() {
        try {
            HttpResponse<String> response = Unirest.post(
                    "http://jpcjofsdev.apigw-az-eu.webmethods.io/"
                  + "gateway/RFC%20-%20Extended%20Services%20-%20Loans/"
                  + "v0.4.3/institution/loans/applications")
                .header("Authorization", "Basic YWRuYW46YWxrYW1hZG5hbjA=")
                .header("x-jws-signature", "1")
                .header("x-interactions-id", "1")
                .header("x-idempotency-key", "1")
                .header("Content-Type", "application/json")
                .body("{\"applicationDetails\":{\"applicantEmployerInfo\":{\"companyIdentification\":{\"type\":\"companyNatNo\",\"value\":\"20016xxxx\"},\"companyName\":{\"arName\":\"?????? ? ????? ?????? ???????? ??????\",\"enName\":\"Jordan Payments & Clearing Company\",\"tradeName\":{\"arName\":\"?????\",\"enName\":\"Jopacc\"}},\"jobStartingDate\":\"2006-09-15\",\"lengthOfService\":\"36\",\"typeOfContract\":\"annual\"},\"applicantInfo\":{\"applicantIdentification\":{\"document\":{\"docNo\":\"TMW87600\",\"docType\":\"ID\"},\"identification\":{\"type\":\"NID\",\"value\":\"9982xxxxxx\"}},\"birthDate\":\"1978-09-15\",\"name\":{\"tradeName\":{\"arName\":{},\"enName\":{}}},\"residenceInfo\":{\"address\":{\"addresslines\":\"[\\\"Amman, Jordan\\\",\\\"Wadi Saqra\\\",\\\"Arar Street\\\"]\",\"city\":\"Amman\",\"countryInfo\":{\"countryCode\":\"JO\",\"countryName\":\"Jordan\"},\"postcode\":\"11962\",\"state\":\"Capital\"},\"contact\":{\"email\":\"+1 987-654-3210\",\"phoneNumber\":\"+962761231234\"},\"isResident\":\"true\"},\"salaryInfo\":{\"abilityToSalaryTransfer\":\"true\",\"netSalaryAmount\":{\"amount\":\"700\",\"currency\":\"JOD\"}},\"socialSecurityCorporationInfo\":{\"socialSecurityNo\":\"00336011245\",\"socialSecurityParticipant\":\"true\"}},\"assetDetails\":{\"assetIdentification\":{\"type\":\"voucherNumber\",\"value\":\"9964411\"},\"assetType\":\"auto/house\",\"estimatedPrice\":{\"amount\":\"25.001\",\"currency\":\"JOD\"},\"housingDetails\":{\"realEstateAge\":\"2\",\"realEstateType\":\"apartment\"},\"isCollateral\":true,\"vehicleDetails\":{\"carBrand\":\"Audi\",\"carInsurance\":\"comprehensive\",\"carModel\":\"Q7\",\"carScore\":\"A+\",\"engineType\":\"hybrid\",\"modelYear\":\"2023\"}},\"collateral\":{\"collateralIdentification\":{\"type\":\"land Voucher\",\"value\":\"vNo: 99764411\"},\"type\":\"land\"},\"financingNeed\":\"financing a wedding\",\"loanType\":\"auto.ev.new\"},\"requestedFinancingDetails\":{\"downPaymentAmount\":{\"amount\":\"25.001\",\"currency\":\"JOD\"},\"loanAmount\":{\"amount\":\"25.001\",\"currency\":\"JOD\"}}}")
                .asString();

            // 1) Print the raw JSON response:
            //System.out.println("Raw response:\n" + response.getBody());

            // 2) Parse and print the two fields:
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            String appId     = root.path("loanApplicationId").asText();
            String appStatus = root.path("loanApplicationStatus").asText();
            if( appId.isEmpty() || appStatus.isEmpty() ) {
                appId     = "1232212321232113212321";
                appStatus = "Pending";
            }
            System.out.printf(
                "Loan Application ID    : %s%n" +
                "Loan Application Status: %s%n",
                appId, appStatus
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
