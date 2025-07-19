package com.example.hackathon.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Producer;
import org.springframework.boot.autoconfigure.task.TaskExecutionProperties.Mode;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.hackathon.API.Account;
import com.example.hackathon.API.Branches;
import com.example.hackathon.API.FX;
import com.example.hackathon.API.Loans;
import com.example.hackathon.API.Offers;
import com.example.hackathon.API.Products;
import com.example.hackathon.API.Transaction;
import com.example.hackathon.API.Products.ProductInfo;
import com.example.hackathon.model.LoggedUser;
import com.example.hackathon.model.User;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
public class AllControllers {
    
    @GetMapping("/accounts/{id}")
    public String getMethodName(@PathVariable String id, HttpSession session, Model model) {
        LoggedUser loggedUser = (LoggedUser) session.getAttribute("user");
        if (loggedUser == null) {
            return "redirect:/login";
        }
        if (!loggedUser.getUserId().equals(id)) {
            return "redirect:/unauthorized";
        }

        List<Account> accounts = Account.getAccountsById(loggedUser.getUserId());
        model.addAttribute("accounts", accounts);
        model.addAttribute("user", loggedUser);

        return "myaccount";
    }
    
    @GetMapping("/branches")
    public String getBranches(HttpSession session, Model model) {
        LoggedUser loggedUser = (LoggedUser) session.getAttribute("user");
        
        List<Branches> branches = Branches.getBranches();
        model.addAttribute("branches", branches);
        model.addAttribute("user", loggedUser);
        return "mybranches";
    }

    @GetMapping("/FX")
    public String getFx(HttpSession session, Model model) {
        LoggedUser loggedUser = (LoggedUser) session.getAttribute("user");
        List<FX> listFx = FX.getFXRates();
        model.addAttribute("fxList", listFx);
        model.addAttribute("user", loggedUser);
        return "fx";
    }

    @GetMapping("/products")
    public String getproduct(HttpSession session, Model model) {
        LoggedUser loggedUser = (LoggedUser) session.getAttribute("user");
        List<ProductInfo> products = Products.getProducts();

        model.addAttribute("products", products);
        model.addAttribute("user", loggedUser);
        return "myproducts";
    }
    
    @GetMapping("/offers/{id}")
    public String getOffers(@PathVariable String id, HttpSession session, Model model) {
        LoggedUser loggedUser = (LoggedUser) session.getAttribute("user");
        List<Account> accounts = Account.getAccountsById(id);
        
        List<Offers> offers = new ArrayList<>();
        for (Account account : accounts) {
            List<Offers> offer = Offers.getOffer(account.getAccountId());
           offers.addAll(offer);
                
        }
        model.addAttribute("offers", offers);
        model.addAttribute("user", loggedUser);
        return "myoffers";
    }    

    @GetMapping("/loans")
    public String getLoans(HttpSession session, Model model) {
        Loans.submitLoanApplication();

        return "submitLoan";
    }

    @GetMapping("/unauthorized")
    public String getUnauthorized(HttpSession session, Model model) {
        return "unauthorized";
    }

    @GetMapping("/logout")
    public String getLogout(HttpSession session, Model model) {
        session.invalidate(); // Invalidate the session to log out the user
        return "redirect:/login";
    }

    @GetMapping("/transactions/{id}")
    public String gettrans(@PathVariable String id, HttpSession session, Model model) {
        LoggedUser loggedUser = (LoggedUser) session.getAttribute("user");
        List<Account> accounts = Account.getAccountsById(id);
        List<Transaction> transactions = new ArrayList<>();
        for (Account account : accounts) {
            List<Transaction> transaction = Transaction.getTransaction(account.getAccountId());
            transactions.addAll(transaction);
        }

        model.addAttribute("transactions", transactions);
        model.addAttribute("user", loggedUser);
        return "transactions";
    }
    
    
    
}

