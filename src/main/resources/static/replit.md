# Hasabak - Unified Jordanian Financial Platform

## Overview

Hasabak (حسابك) is a comprehensive front-end financial platform designed for Jordanian users to manage their bank accounts and digital wallets in a unified interface. The application is built as a single-page application (SPA) using vanilla JavaScript, HTML, and CSS without any backend dependencies. It features full Arabic language support with RTL layout, financial analytics, loan services, and mock integrations with Jordanian financial institutions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla JavaScript, HTML, and CSS without any backend dependencies
- **Language Support**: Arabic as primary language with full RTL (right-to-left) layout support
- **Responsive Design**: Mobile-first approach using CSS Grid, Flexbox, and custom responsive breakpoints
- **State Management**: Client-side state management using JavaScript objects and localStorage for session persistence
- **UI Framework**: Custom CSS framework with CSS variables for consistent theming and modern styling
- **Component-Based Structure**: Modular JavaScript functions managing different UI sections and user interactions

### Key Technologies
- **HTML5**: Semantic markup with accessibility considerations and Arabic language attributes
- **CSS3**: Custom styling system with CSS variables, animations, transitions, and responsive design patterns
- **JavaScript ES6+**: Modern JavaScript features for DOM manipulation, state management, and user interactions
- **Chart.js**: Financial data visualization library loaded via CDN for expense analytics and balance charts
- **Font Awesome 6.4.0**: Icon library for UI elements loaded via CDN
- **Google Fonts (Cairo)**: Arabic-optimized font family for proper text rendering and readability

## Key Components

### 1. Authentication System
- **Multi-Step Registration**: Comprehensive sign-up flow collecting user details (phone, email, password, username)
- **OTP Verification**: Mock OTP system supporting both phone and email verification with 2-minute countdown timer
- **Login System**: Username/password authentication with mock validation against predefined user database
- **Session Management**: Client-side session handling with localStorage persistence and automatic logout functionality

### 2. Dashboard Interface
- **Financial Overview**: Unified balance display aggregating all connected bank accounts and digital wallets
- **Transaction History**: Recent transactions display with categorization, filtering, and detailed transaction information
- **Analytics Module**: Interactive expense breakdown using Chart.js with pie charts, bar charts, and trend analysis
- **Budget Tracking**: Monthly budget progress visualization with category-based spending limits and smart alerts
- **Savings Goals**: Goal setting interface with progress tracking and achievement milestones

### 3. Bank and Wallet Integration
- **Account Management**: Add/remove functionality for bank accounts and digital wallets with credential simulation
- **Jordanian Financial Institutions**: Pre-configured support for 19+ local banks and 4 mobile wallet services
- **Balance Aggregation**: Real-time balance calculation across all connected accounts with proper currency formatting
- **Mock Authentication**: Simulated login flows for different financial institutions with realistic credential validation

### 4. Loan Services Platform
- **Loan Marketplace**: Display of loan offers from various Jordanian banks and financial institutions
- **Application System**: Multi-step loan application form collecting essential information (amount, type, income, identity)
- **Status Tracking**: Mock loan application status updates with approval/rejection notifications
- **Smart Recommendations**: Algorithm-based loan suggestions based on user's financial profile and spending patterns

### 5. Notification System
- **Smart Alerts**: Context-aware notifications based on spending patterns, account balances, and financial goals
- **Loan Updates**: Real-time notifications for loan application status changes
- **Budget Warnings**: Automated alerts when approaching spending limits or unusual expense patterns
- **Achievement Notifications**: Savings goal milestones and financial achievement celebrations

## Data Flow

### Client-Side Data Management
1. **User Authentication**: Credentials validated against mock user database stored in JavaScript objects
2. **Session Persistence**: User state maintained using localStorage for cross-session continuity
3. **Mock API Simulation**: JavaScript functions simulate backend responses for all financial operations
4. **Data Synchronization**: Real-time updates across all dashboard components when user data changes

### State Management Pattern
- **Global State**: Central state object managing user data, account information, and application settings
- **Component State**: Individual component states for UI interactions, form validation, and temporary data
- **Event-Driven Updates**: Custom event system for cross-component communication and data synchronization

## External Dependencies

### CDN-Based Libraries
- **Chart.js**: Data visualization for financial analytics and expense tracking
- **Font Awesome 6.4.0**: Icon library for consistent UI iconography
- **Google Fonts (Cairo)**: Arabic-optimized typography for proper text rendering

### Mock Integrations
- **Jordanian Banks**: Simulated connections to 19+ local banks including Arab Bank, Housing Bank, Jordan Commercial Bank
- **Mobile Wallets**: Mock integration with JoMoPay, eFAWATEERcom, Madfooatcom, and Umniah services
- **Payment Processors**: Simulated payment gateway integrations for loan applications and account funding

## Deployment Strategy

### Static Hosting Approach
- **Frontend-Only Deployment**: Application can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages)
- **No Server Requirements**: Zero backend dependencies enable simple deployment and hosting
- **Progressive Enhancement**: Application works offline with cached data and can be enhanced with PWA features

### Future Backend Integration Points
- **API Endpoints**: Code structure prepared for easy backend integration with clearly marked connection points
- **Authentication System**: Ready for replacement with actual user authentication and session management
- **Database Integration**: Mock data structures designed to match expected backend API responses
- **Real-time Updates**: WebSocket integration points prepared for live financial data synchronization

### Development Considerations
- **Code Organization**: Modular JavaScript structure allows easy maintenance and feature additions
- **Responsive Design**: Mobile-first approach ensures compatibility across all device types
- **Arabic Localization**: Full RTL support with proper Arabic text rendering and cultural considerations
- **Performance Optimization**: Lazy loading, efficient DOM manipulation, and optimized asset loading