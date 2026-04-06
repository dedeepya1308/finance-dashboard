# finance-dashboard
This project is a Finance Dashboard Web Application developed as part of a Frontend Intern screening assignment.

It demonstrates core frontend skills including state management, UI design, data visualization, and role-based rendering using React.

 ## Objective:

Build a responsive dashboard that allows users to:

1.Track income and expenses
2.Visualize financial data
3.Manage transactions
4.View insights

## Features Implemented:
 ### Summary cards:
   Total Balance,
   Total Income,
   Total Expenses.
 ### Charts:
   Line chart for time-based trends,
   Pie chart for category-wise expense breakdown.
 ### Transactions Management
   Display transactions with:
     Date,
     Amount,
     Category,
     Type (Income / Expense).

     
## Functionalities:

1. Search by category

2. Filter by type (Income / Expense)

3. Edit and delete transactions

4. Add / Edit Transactions

5. Input form for adding new transactions

6. Edit existing transactions

7. Form validation included

8. Conditional UI rendering for better UX

9. Role-Based UI (Simulated):

   * Viewer: Can only view data
   * Admin: Can add, edit, and delete transactions

10. Role switching is handled via a dropdown (frontend simulation)


## State & Persistence
State managed using:
  useState,
  useEffect,
  useMemo.
Data stored in localStorage-Ensures persistence across page reloads


## Insights:
 Highest spending category,
 Monthly income vs expense comparison.
 
## Dark Mode:
 Toggle between light and dark themes,
 Improved accessibility and user experience.

## Tech Stack:
 React (Functional Components),
 JavaScript (ES6),
 Recharts (for charts),
 CSS (custom styling).

 
## Setup Instructions:
  1. Clone the repository
    git clone <your-repo-link>
    cd finance-dashboard
  2. Install dependencies
    npm install
    npm install recharts
  3. Run the application
    npm start
  4. Open in browser
     http://localhost:3000

     
## Approach:
  Built using modular and reusable React components,
  Used React Hooks for efficient state management,
  Optimized performance using useMemo,
  Implemented conditional rendering for:
    1.Role-based UI
    2.Form visibility
    3.Dark mode.
  Focused on clean UI and usability.
  
## Note:
  Role-based access is simulated on the frontend (no backend authentication),
  Data is stored locally (no API integration).

## Possible Enhancements:
  Backend integration (Node.js + Database),
  Authentication system,
  Export data (CSV/PDF),
  Advanced analytics & charts,
  Mobile-first responsiveness improvements,

## Thank you for reviewing this submission!




