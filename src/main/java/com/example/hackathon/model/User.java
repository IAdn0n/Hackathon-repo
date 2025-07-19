package com.example.hackathon.model;
import org.springframework.security.crypto.bcrypt.BCrypt;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User { 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    @Column(name = "phone_number")
    private String phoneNumber;
    private String email;
    private String id_mock;

    private static final String FIXED_SALT = "$2a$10$7Q8z1Z5e3b6f4e5d6c7e8uO9pQwXyZ0a1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6";

    public User(){}
    
    public User(String username, String email, String password, String phoneNumber, String mock_id) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.id_mock = mock_id;
    }
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public String getId_mock() {
        return id_mock;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setId_mock(String id_mock) {
        this.id_mock = id_mock;
    }

    public static String getHashPassword(String password) {
        return BCrypt.hashpw(password, FIXED_SALT);
    }
}
