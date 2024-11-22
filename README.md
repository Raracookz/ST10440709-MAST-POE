
# Culinary Brigade App

## **Version 1.1.0**

**Date:** 22 November 2024

### **Description**
Culinary Brigade is an app designed for chefs to manage menu items dynamically. This update includes several key features such as menu item management, average price calculations, and filtering options for guests.

---

## **Features**

### **1. Average Price Display on Home Screen**
- The home screen now displays the average price of menu items, broken down by courses such as starters, mains, and desserts.

### **2. Menu Management (New Screen)**
- Added a new screen for managing menu items:
  - Chefs can add new menu items.
  - Chefs can remove items from the menu.
  - The home page no longer includes the option to add items.
  - Menu items are saved in an array for consistent access across screens.

### **3. Home Page Menu Display**
- The home page now shows the complete list of menu items, including those that the chef has added and removed.

### **4. Filtering by Course for Guests**
- Guests can now filter the menu to show only items from a specific course (e.g., starters, mains, or desserts).

---

## **Bug Fixes**

### **Picker Function Issue**
- Fixed the picker function by installing the proper dependencies.

---

## **Code Changes Overview**

### **Home Screen**
- Displayed the average price of menu items by course.
- Removed the feature for adding menu items directly from the home screen.

### **Menu Management Screen**
- Created a separate screen for menu management where chefs can:
  - Add new menu items to an array.
  - Remove menu items from the list.
- Menu updates are reflected on the home page.

### **Guest Filtering**
- Introduced a new page where guests can filter menu items by course (e.g., starters, mains, desserts).

### **Array Management**
- All menu items are now stored in a centralized array, ensuring consistent data across screens.

---

## **Installation**

To install the necessary dependencies and run the project locally:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Navigate into the project directory:
   ```bash
   cd <project_directory>
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Run the app:
   ```bash
   npm start
   ```

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
