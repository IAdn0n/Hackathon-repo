package com.example.hackathon.model;

import java.util.ArrayList;
import java.util.List;

import com.example.hackathon.API.Account;

public class LoggedUser {
    String userName;
    String userId;
    List<String> accountsIds;

    public String getUserName() {
        return userName;
    }
    public String getUserId() {
        return userId;
    }


    public void setUserName(String userName) {
        this.userName = userName;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LoggedUser() {
        userId = null;
        userName = null;
        accountsIds = new ArrayList<>();
    }

    public LoggedUser(String userName, String userId) {
        this.userName = userName;
        this.userId = userId;
        List<Account> accounts = Account.getAccountsById(userId);

        accountsIds = new ArrayList<>();
        for (Account account : accounts) {
            accountsIds.add(account.getAccountId());
        }
    }
}
