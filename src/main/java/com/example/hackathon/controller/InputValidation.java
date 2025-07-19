package com.example.hackathon.controller;

public class InputValidation {

	public InputValidation() {}

    /*
     Validates a username based on:
      1. Not null or empty
      2. Length between 3 and 20 characters
      3. Contains only letters (any script) and digit
    */
    public static String IsValidName(String name) {
        final int MIN_LENGTH = 3;
        final int MAX_LENGTH = 20;

        if (name == null || name.trim().isEmpty()) {
            return "Invalid name: name cannot be empty";
        }

        String trimmed = name.trim();
        if (trimmed.length() < MIN_LENGTH || trimmed.length() > MAX_LENGTH) {
            return "Invalid name: name must be between " + MIN_LENGTH + " and " + MAX_LENGTH + " characters";
        }

        if (!trimmed.matches("^[\\p{L}\\p{N}]+$")) {
            return "Invalid name: name must contain only letters and numbers";
        }
        return "";
    }

	/*
		Validates an email address based on the following criteria:
		1. Email must not be null or empty.
		2. Email must not contain any spaces.
		3. Email must match a standard pattern (example: user@example.com), allowing:
		- Alphanumeric characters, dots, underscores, and hyphens before the '@'
		- A domain name after the '@' with a 2 to 6 character top-level domain
	*/
	public static String IsValidEmail(String User_email) {

       if (User_email == null || User_email.isEmpty()) {
			return "Invalid Email: email cannot be empty";
		}
		if (User_email.contains(" ")) {
            return "Invalid Email: email must not contain spaces";
        }
		if (!User_email.matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,6}$")) {
			return "Invalid Email: email format is incorrect";
		}

       return "";
    }

	/*
		Validates a password based on the following criteria:
		1. Password mustn't be null or empty.
		2. Password length must be between 8 and 64 characters.
		3. Password mustn't contain any spaces.
		4. Password mustn't contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@#$%^&+=!).
	*/
    public static String IsValidPassword(String User_password) {
        final int Min_Length = 8;
		final int Max_Length = 64;
       
		if (User_password == null || User_password.isEmpty()) {
			return "Invalid Password: password cannot be empty";
		}
		if (User_password.length() < Min_Length ||User_password.length()>Max_Length) {
			return "Invalid Password: password must be between "+ Min_Length+" and " +Max_Length+" characters";
		}
		if (User_password.contains(" ")) {
			return "Invalid Password: password must not contain spaces";
		}

        return "" ;
    }

    public static String IsValidPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.isEmpty()) {
            return "Invalid Phone Number: phone number cannot be empty";
        }
        if (!phoneNumber.matches("^\\+?[0-9]{10,15}$")) {
            return "Invalid Phone Number: phone number must be between 10 and 15 digits, optionally starting your country code with a '+' sign";
        }
        return "";
    }
}